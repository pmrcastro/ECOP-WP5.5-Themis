const Storage = {
  keys: {
    TCS: 'tcs',
    DTSRC: 'dtsrc'
  },
  clear: () => {
    localStorage.clear()
  },
  TCS: {
    isNew: false,
    setTCS: (newTCS) => {
      localStorage.setItem(Storage.keys.TCS, JSON.stringify(newTCS))
    },
    getTCS: () => {
      const savedTCS = localStorage.getItem(Storage.keys.TCS)
      Storage.TCS.isNew = !savedTCS

      return !savedTCS ? {} : Storage.TCS.instantiateFromString(savedTCS)
    },
    instantiateFromString: (json) => {
      json = JSON.parse(json)
      const _tcs = Object.keys(json).reduce((acc, cur) => {
        const eqi = json[cur]
        eqi.qis = Object.keys(eqi.qis).reduce((acc, cur) => {
          const qi = eqi.qis[cur]
          qi.eGroup = Storage.TCS.instantiateEQIV(qi.eGroup)
          acc[qi.code] = qi
          return acc
        }, {})
        acc[eqi.code] = eqi
        return acc
      }, {})
      return _tcs || {}
    },
    instantiateEQIV: (eqiv) => {
      if (eqiv.matchType || eqiv.instType === 'EGroup') { // Instantitate an EGroup
        const eGroup = new ecop.EGroup(eqiv.matchType)
        eqiv.values.forEach(cur => {
          eGroup.values.push(Storage.TCS.instantiateEQIV(cur))
        })
        return eGroup
      } else { // Instantiate an QIValue
        eqiv.reload = true
        return ecop.QIValue.prototype.factorQIValue(eqiv.instType, eqiv)
      }
    }
  },
  DTSRC: {
    setDTSRC: (newDTSRC) => {
      localStorage.setItem(Storage.keys.DTSRC, JSON.stringify(newDTSRC))
    },
    getDTSRC: () => {
      const savedDTSRC = localStorage.getItem(Storage.keys.DTSRC)
      return !savedDTSRC ? [] : JSON.parse(savedDTSRC)
    }
  },
  FILES: {
    splitter: '//--//--//--////--//--//--//',
    toFile: (data, callback) => {
      const result = data.map(cur => JSON.stringify(cur)).join(Storage.FILES.splitter)
      callback(result.split(Storage.FILES.splitter).length === data.length
        ? { success: true, data: result }
        : { success: false })
    },
    fromFile: (data, callback) => {
      const arr = data.split(Storage.FILES.splitter)
      callback({ success: true, TCS: Storage.TCS.instantiateFromString(arr[0]), DTSRC: JSON.parse(arr[1]) })
    }
  }
}

const failedDataset = []

const CSWPageLoaded = function (url, config) {
  this.url = url

  /**
  * Jsonix Configuration
  * */
  if (config == null) {
    throw 'Missing Configuration! It is a must to CSW to know the profile'
  } else if (config[2] !== undefined) {
    this.credentials = config[2]
  }
  this.jsonnixContext = new Jsonix.Context(config[0], config[1])
}
CSWPageLoaded.prototype.GetRecords = function (from, to, filter, outputSchema) {
  return new Promise((resolve, reject) => {
    const reqURL = `${this.url}?request=GetRecords&service=CSW&version=2.0.2&constraintLanguage=CQL_TEXT&constraint_language_version=1.1.0&typeNames=gmd:MD_Metadata&namespace=xmlns%28csw%3Dhttp%3A%2F%2Fwww.opengis.net%2Fcat%2Fcsw%2F2.0.2%29%2Cxmlns%28gmd%3Dhttp%3A%2F%2Fwww.isotc211.org%2F2005%2Fgmd%29&resultType=results&ElementSetName=full&outputSchema=${outputSchema}&startPosition=${from}&maxRecords=${to}`
    this.loadPage(reqURL).then(result => {
      resolve(this.unmarshalXML(result))
    }).catch(err => reject(err))
  })
}
CSWPageLoaded.prototype.GetRecordById = function (ids, outputSchema) {
  return new Promise((resolve, reject) => {
    const reqURL = `${this.url}?request=GetRecordById&typeNames=gmd:MD_Metadata&service=CSW&version=2.0.2&elementSetName=full&id=${ids[0]}&outputSchema=${outputSchema}`
    this.loadPage(reqURL).then(result => {
      resolve(result)
    }).catch(err => reject(err))
  })
}
CSWPageLoaded.prototype.unmarshalXML = function (xml) {
  return this.jsonnixContext.createUnmarshaller().unmarshalDocument(xml)
}
CSWPageLoaded.prototype.loadPage = function (url) {
  return new Promise((resolve, reject) => {
    $.get(url, content => {
      resolve(content)
    }, 'xml')
  })
}

const CSW = {
  outputSchema: 'http://www.isotc211.org/2005/gmd',
  cswConfig: [
    [
      OWS_1_0_0,
      DC_1_1,
      DCT,
      XLink_1_0,
      SMIL_2_0,
      SMIL_2_0_Language,
      GML_3_1_1,
      Filter_1_1_0,
      CSW_2_0_2,
      GML_3_2_0,
      ISO19139_GSS_20060504,
      ISO19139_GSR_20060504,
      ISO19139_GTS_20060504,
      ISO19139_GMD_20060504,
      ISO19139_GCO_20060504,
      ISO19139_SRV_20060504
    ],
    {
      namespacePrefixes: {
        'http://www.opengis.net/cat/csw/2.0.2': 'csw',
        'http://www.opengis.net/ogc': 'ogc',
        'http://www.opengis.net/gml': 'gml',
        'http://purl.org/dc/elements/1.1/': 'dc',
        'http://purl.org/dc/terms/': 'dct',
        'http://www.isotc211.org/2005/gmd': 'gmd',
        'http://www.isotc211.org/2005/gco': 'gco'
      },
      mappingStyle: 'simplified'
    }
  ],
  scanDTSRC: (params, callback) => {
    const csw = params.forceRequest ? new CSWPageLoaded(params.url, CSW.cswConfig) : new Ows4js.Csw(params.url, CSW.cswConfig)

    csw.GetRecords(1, 1, null, CSW.outputSchema).then((result) => {
      callback({ success: true, total: result['csw:GetRecordsResponse']['searchResults'].numberOfRecordsMatched })
    }).catch(err => {
      callback({ success: false })
    })
  },
  fetchDT: ({ url, totalFound, forceRequest }, filter, loadedParcel, didLoad) => {
    const csw = forceRequest ? new CSWPageLoaded(url, CSW.cswConfig) : new Ows4js.Csw(url, CSW.cswConfig)
    CSW.fetchDTFromTo(csw, filter, 1, totalFound, (result) => {
      if (result.success) {
        loadedParcel(result.data.any || result.data.abstractRecord)
        if (result.data.nextRecord === 0) {
          didLoad()
        } else {
          CSW.fetchDTFromTo(csw, filter, result.data.nextRecord, result.data.numberOfRecordsMatched, result.callback)
        }
      } else { didLoad() }
    })
  },
  fetchDTFromTo: (csw, filter, from, to, callback) => {
    csw.GetRecords(from, to, filter, CSW.outputSchema).then((result) => {
      callback({ success: true, callback, data: result['csw:GetRecordsResponse'].searchResults })
    }).catch(err => {
      callback({ success: false })
    })
  },
  fetchDTById: (id, src, forceRequest, callback) => {
    const csw = forceRequest ? new CSWPageLoaded(src, CSW.cswConfig) : new Ows4js.Csw(src, CSW.cswConfig)
    csw.GetRecordById([id], CSW.outputSchema).then((result) => {
      // result = result['csw:GetRecordByIdResponse']['abstractRecord']
      result = new X2JS().xml2json(result).GetRecordByIdResponse.MD_Metadata
      // if (result.length > 0) { callback(result[0]['csw:Record']) }
      if (result !== undefined) { callback(result) }
    }).catch(err => {
      console.log(`Error while fetching dataset: ${id}`)
    })
  }
}

const tcs = Storage.TCS.getTCS()
const dtSrc = Storage.DTSRC.getDTSRC()

window.onload = () => {
  loadInitialElements()
  setupQITable()
  reRenderTCSTable()

  const len = Object.keys(tcs).length
  if (len === 0 || len === 1 && Storage.TCS.isNew) { $('.float-add-btn').trigger('click') }
}

const cellClick = (e, cell) => {
  const colCode = cell.getColumn().getDefinition().options.code
  const rowCode = cell.getRow().getData().code

  const qis = tcs[colCode].qis
  if (qis[rowCode] !== undefined || !e.target.classList.contains('add-qi-area')) { return }

  requestEQI({ topic: colCode, qi: rowCode }, false, (result) => {
    if (!result.success) { return }
    changeCellStatus(colCode, rowCode)
  })
}

const formatter = {
  tcCell: (cell) => {
    const colCode = cell.getColumn().getDefinition().options.code
    const rowCode = cell.getRow().getData().code

    return cell.getRow().getData().description
      ? PortalG.colDescription({ col: colCode, val: tcs[colCode].description })
      : PortalG.initialCell({ col: colCode, row: rowCode })
  },
  qiFormatter: (cell) => { // Quality Indicator column
    return `<div class="qiLabel absolute-center"><strong>${cell.getValue()}</strong></div>`
  }
}

const setupQITable = () => {
  // { rowHandle: true, formatter: 'handle', headerSort: false, frozen: true, width: 30, minWidth: 30 },
  const columns = [{ title: 'Quality Indicator', field: 'qiLabel', headerSort: false, formatter: formatter.qiFormatter, frozen: true, width: 130 }]
  if (Object.keys(tcs).length === 0) {
    const nextTC = configJSON.TCs[0]
    tcs[nextTC.code] = { code: nextTC.code, rCode: nextTC.code, name: nextTC.name, count: 1, qis: {}, dataset: {} }
  }
  Object.keys(tcs).forEach(key => {
    const cur = tcs[key]
    columns.push({ title: PortalG.colChild({ name: wrapText(cur.name), title: cur.name }), formatter: formatter.tcCell, cellClick, headerSort: false, width: 130, options: { code: cur.code } })
  })
  const data = Object.keys(configJSON.QIList).map(cur => {
    return { qiLabel: configJSON.QIList[cur].name, code: configJSON.QIList[cur].code }
  })
  data.unshift({ qiLabel: 'Description', code: 'DESCRIPTION', description: true })
  $('#qi-table').tabulator({
    resizableColumns: false,
    fitColumns: true,
    height: '100%',
    selectable: false,
    movableColumns: false,
    movableRows: false,
    columnMinWidth: 130,
    columns,
    data
  })
  $('[data-toggle="tooltip"]').tooltip()
}

const loadInitialElements = () => {
  // Table
  $('body').append($('<div/>').attr('id', 'qi-table-container').append($('<div/>').attr('id', 'qi-table')))

  // Modals
  $('body').append(PortalG.modalAddTC())
  $('body').append(PortalG.modalCopyFrom())
  $('body').append(PortalG.modalSetupDTSRC())
  $('body').append(PortalG.modalShowEvalResult())
  $('#select-add-tc').chosen({ width: '100%' })
  $('#select-copy-from').chosen({ width: '100%' })

  // Floating buttons
  $('body').append(PortalG.floatingButtons())

  $('[data-toggle="tooltip"]').tooltip()
  $('.ui-draggable').draggable({ containment: 'window' })
}

const Evaluation = {
  dataset: {},
  list: {
    qi: ecop.QIList.prototype.factorQIListFromConfig(ecop.QIType.QI, configJSON.QIList),
    eqi: ecop.QIList.prototype.factorQIListFromConfig(ecop.QIType.EQI, configJSON.QIList),
  },
  clearPrevData: () => {
    Evaluation.dataset = {}
    Object.keys(tcs).forEach(cur => {
      delete tcs[cur].dataset
      tcs[cur].dataset = []
    })
  },
  fetchData: (data) => {
    return new Promise((resolve, reject) => {
      let totalRecordsToLoad = 0
      let totalLoadedUrls = 0
      let totalErrors = 0
      const verifyIfEnded = () => {
        console.log(`DidLoad`)
        if (totalLoadedUrls === data.dtSrc.length && totalRecordsToLoad === 0) {
          resolve({ totalLoadedUrls, totalErrors })
        }
      }

      // Object.keys(data.tcs).forEach(key => {
      // const filter = Evaluation.composeFilter(data.tcs[key].qis) || null
      const filter = null
      data.dtSrc.forEach(src => {
        console.log(`Starting to fetch: ${src.url}`)
        CSW.fetchDT(src, filter,
          (records) => { // loadedParcel
            totalRecordsToLoad += records.length

            records.forEach(record => {
              record = record['gmd:MD_Metadata']
              if (record.fileIdentifier === undefined) {
                totalErrors += 1
                totalRecordsToLoad -= 1
                failedDataset.push(record.identificationInfo[0].abstractMDIdentification['gmd:MD_DataIdentification'].citation.ciCitation.title.characterString['gco:CharacterString'])
                return
              }
              const id = record.fileIdentifier.characterString['gco:CharacterString']

              Object.keys(data.tcs).forEach(key => {
                const srcDT = data.tcs[key].dataset[src.url] || []
                srcDT.push(id)
                data.tcs[key].dataset[src.url] = srcDT
              })

              Evaluation.dataset[src.url] = Evaluation.dataset[src.url] || {}
              if (!Evaluation.dataset[src.url][id]) {
                CSW.fetchDTById(id, src.url, src.forceRequest, (json) => {
                  totalRecordsToLoad -= 1
                  const list = new ecop.QIList(Object.assign({}, Evaluation.list.qi).qis)
                  // list.loadFromJSON(json)
                  list.json = json
                  Evaluation.dataset[src.url][id] = list
                  verifyIfEnded()
                }, () => {
                  totalErrors += 1
                  totalRecordsToLoad -= 1
                  verifyIfEnded()
                })
              } else {
                totalRecordsToLoad -= 1
              }
            })
          },
          () => {
            totalLoadedUrls += 1
            verifyIfEnded()
          })
      })
      // })
    })
  },
  composeFilter: (qis) => {
    return Object.keys(qis)
      .filter(cur => qis[cur].tools.isFilter)
      .reduce((acc, cur) => {
        cur = qis[cur]
        const filter = configJSON.QIList[cur.code].config.cswFilter.reduce((accFields, field) => {
          const newFlt = cur.eGroup.composeFilter(field)
          return accFields ? accFields.or(newFlt) : newFlt
        }, undefined)
        return acc ? filter ? filter.and(acc) : acc : filter
      }, undefined)
  },
  validateMetaElements: ({ dt, tcs }) => {
    return new Promise((resolve, reject) => {
      const resMatrix = {}
      Object.keys(tcs).forEach(tc => {
        tc = tcs[tc]
        resMatrix[tc.code] = {}
        Object.keys(tc.dataset).forEach(src => {
          resMatrix[tc.code][src] = {}
          tc.dataset[src].forEach(recId => {
            const record = dt[src][recId]
            resMatrix[tc.code][src][recId] = { metaElemValid: {} }
            Object.keys(configJSON.STANDARDS).forEach(std => {
              resMatrix[tc.code][src][recId].metaElemValid[std] = []
              configJSON.STANDARDS[std].commonElements.forEach(elem => {
                resMatrix[tc.code][src][recId].metaElemValid[std].push({
                  label: elem.label,
                  result: Evaluation.metaElePresEval(record.json, elem)
                })
              })
              const tcQE = configJSON.STANDARDS[std].tc
              tcQE.paths[tc.rCode].forEach(elem => {
                const result = tcQE.fields.reduce((acc, cur) => acc || Evaluation.metaElePresEval(record.json, $.extend({}, elem, { needsAll: true, fields: cur })), false)
                resMatrix[tc.code][src][recId].metaElemValid[std].push({ label: elem.label, result })
              })
            })
          })
        })
      })
      resolve(resMatrix)
    })
  },
  metaElePresEval: (data, elem) => {
    const getElement = (dt, fields) => fields.reduce((acc, cur) => acc === undefined ? acc : acc[cur], dt || {})

    const dtElem = getElement(data, elem.path)
    return elem.fields.reduce((acc, cur) => {
      if (acc && !elem.needsAll) { return acc }
      cur = getElement(dtElem, cur) !== undefined
      return elem.needsAll
        ? (acc === undefined ? true : acc) && cur
        : cur
    }, undefined)
  },
  validateRequiredData: (prevResult, data) => {
    return new Promise((resolve, reject) => {
      Object.keys(data.tcs).forEach(tc => {
        tc = data.tcs[tc]
        const eqi = tc.qis
        Object.keys(tc.dataset).forEach(dt => {
          const dataset = tc.dataset[dt]
          dataset.forEach(id => {
            const qi = data.dt[dt][id]
            qi.loadFromJSON()
            qi.conformityTestWithEV(eqi)
              .then(result => {
                if (result.filter(cur => !cur.inConfor && tc.qis[cur.code].tools.isFilter).length === 0) {
                  prevResult[tc.code][dt][id].reqDataValid = result
                } else {
                  delete prevResult[tc.code][dt][id]
                }
                resolve(prevResult)
              })
              .catch(err => {
                delete prevResult[tc.code][dt][id]
                // resolve(prevResult)
              })
          })
        })
      })
    })
  },
  loadFromJSONDT: () => {
    return new Promise((resolve, reject) => {
      const dataset = Evaluation.dataset
      Object.keys(dataset).forEach(dt => {
        Object.keys(dataset[dt]).forEach(record => {
          dataset[dt][record].loadFromJSON()
        })
      })
      resolve()
    })
  },
  valDataBefEvaluation: ({ tcs, dtSrc }) => {
    let msg
    if (Object.keys(tcs).length === 0) {
      msg = 'In order to run the evaluation you need to add at least <strong>1 Tematic Category</strong>!'
    } else if (dtSrc.length === 0) {
      msg = 'In order to run the evaluation you need to add at least <strong>1 Dataset Source in the settings</strong>!'
    }

    return {
      success: msg === undefined,
      msg
    }
  },
  showResult: {
    load: (result, tcs) => {
      $('#showEvalResModal #result-elements-container').empty()
      $('#showEvalResModal .result-modal-radio').empty()

      Evaluation.showResult.loadSummaryOpt.load(result, tcs)
      Evaluation.showResult.loadStatsOpt(result, tcs)
      Evaluation.showResult.loadTreeOpt(result, tcs)

      $($('input[type=radio][name=result-radio-options]')[0]).prop('checked', true).trigger('change')
      $('#showEvalResModal').modal('toggle')
    },
    addElement: (optClass, label, id) => {
      const resElem = $('<div/>').addClass(optClass)
      if (id !== undefined) { resElem.attr('id', id) }
      resElem.appendTo('#showEvalResModal #result-elements-container')
      $(`<div class="radio"> <label> <input type="radio" name="result-radio-options" value="${optClass}" checked> ${label} </label> </div>`)
        .appendTo('#showEvalResModal .result-modal-radio')
      return resElem
    },
    loadSummaryOpt: {
      load: (result, tcs) => {
        const resElem = Evaluation.showResult.addElement('summary', 'Summary')
        const formatter = row => Evaluation.showResult.loadSummaryOpt.singleConforFormatter(row.getValue())

        Object.keys(result).forEach(tcRec => {
          const tc = tcs[tcRec]
          tcRec = result[tcRec]

          const dts = Object.keys(tcRec).reduce((acc, url) => {
            Object.keys(tcRec[url]).forEach(id => {
              const dt = tcRec[url][id]
              const row = dt.reqDataValid.reduce((row, qi) => {
                row[qi.code] = Evaluation.showResult.loadSummaryOpt.calcSingleConfor(qi)
                return row
              }, { id })
              row.fitPerc = Math.round((dt.reqDataValid.reduce((acc, cur) => acc + +(row[cur.code] === 1), 0) / dt.reqDataValid.length) * 100)
              row.fitType = Evaluation.showResult.loadSummaryOpt.calFitType(row, dt.reqDataValid)
              row.info = {
                title: getTitle(Evaluation.dataset[url][id].json, id),
                id,
                url
              }
              acc.push(row)
            })
            return acc
          }, [])
          .sort((a, b) => a.fitPerc - b.fitPerc)
          .sort((a, b) => a.fitType.localeCompare(b.fitType))
          const colmns = Object.keys(tc.qis).reduce((acc, cur) => {
            cur = configJSON.QIList[cur]
            acc.push({ title: cur.name, field: cur.code, align: 'center', width: 100, formatter })
            return acc
          }, [])
          Evaluation.showResult.loadSummaryOpt.addContentTable(resElem, { data: dts, columns: colmns, title: tc.name })
        })

        Evaluation.showResult.loadSummaryOpt.loadTooltips()
      },
      loadTooltips: () => {
        $(document).tooltip({
          items: '.result-table-info',
          content: () => {
            return $(PortalG.resultContentTableTooltip())
          }
        })
      },
      singleConforFormatter: (value) => {
        let eleClass = 'glyphicon '
        switch (value) {
          case -1:
            eleClass += 'glyphicon-remove btn-red gi-large'
            break
          case 0:
            eleClass += 'glyphicon-alert btn-orange gi-large'
            break
          case 1:
            eleClass += 'glyphicon-ok btn-green gi-large'
            break
        }
        return $('<span/>').addClass(eleClass)
      },
      calFitType: (row, qis) => {
        let type = ''
        if (qis.filter(qi => row[qi.code] < 0).length > 0) {
          type = 'Unfit datasets'
        } else if (row.fitPerc === 100) {
          type = 'Fit datasets'
        } else { type = 'Partially fit datasets' }
        return type
      },
      calcSingleConfor: (res) => {
        // 1 -> Conformant; 0 -> Non-conformant (non-critical factor); -1 -> Non-conformant (critical factor)/excluded
        return +res.inConfor || (+!res.isCritical - 1)
      },
      addContentTable: (parent, { data, columns, title }) => {
        const formatter = {
          fit: (row) => `${row.getValue()}` !== 'NaN' ? `${row.getValue()}%` : '--',
          title: (row) => {
            const dt = row.getValue()
            return `<span class="dataset-link-view" data-id="${dt.id}" data-catalog="${dt.url}">${dt.title}</span>`
          }
        }

        const container = $(PortalG.resultContentTable({ title }))
        parent.append(container)
        container.find('.content-table')
          .tabulator({
            // resizableColumns: true,
            fitColumns: true,
            groupBy: 'fitType',
            groupStartOpen: false,
            data,
            columns: [
              { title: 'Title', field: 'info', width: 350, frozen: true, headerSort: false, formatter: formatter.title },
              { title: 'Fitness Value', field: 'fitPerc', width: 100, align: 'center', formatter: formatter.fit },
              {
                title: 'Quality indicators status',
                columns
              }
            ]
          })
        container.find('.content-table').tabulator('setPage', 1)
      }
    },
    loadTreeOpt: (result, tcs) => {
      const data = Object.keys(result).reduce((acc, cur) => {
        const tc = tcs[cur]
        const tcNode = { text: tc.name, nodes: [] }
        Object.keys(result[cur]).forEach(url => {
          const recArr = Object.keys(result[cur][url])
          const urlNode = { text: `${url} <span class="tree-pop-data">${recArr.length} result${recArr.length !== 1 ? 's' : ''}</span>`, nodes: [] }
          recArr.forEach(recId => {
            const recNode = { nodes: [] }

            const reqNode = { nodes: [] } // recNode child
            result[cur][url][recId].reqDataValid.forEach(qi => {
              if (!configJSON.QIList[qi.code].isntQI) {
                const res = {
                  result: `<span style="color:${qi.inConfor ? 'green' : 'red'};">${qi.inConfor}</span>`,
                  isCrit: `<span style="color:${qi.isCritical ? 'green' : 'red'};">${qi.isCritical}</span>`
                }
                reqNode.nodes.push({ text: `<b>${qi.label}</b> - In conformity/Is critical: <i>${res.result}/${res.isCrit}</i>` })
              }
            })
            recNode.nodes.push(reqNode)
            const rAnal = result[cur][url][recId].reqDataValid.reduce((acc, cur) => {
              return acc < 0 ? acc : cur.isCritical && !cur.inConfor ? -1 : cur.inConfor && cur.isCritical !== undefined ? acc + 1 : acc
            }, 0)
            recNode.reqDataPerc = Math.round(((rAnal < 0 ? 0 : rAnal) / result[cur][url][recId].reqDataValid.length) * 100)

            const metaNode = { nodes: [] } // recNode child
            const metaElemPerc = []
            Object.keys(result[cur][url][recId].metaElemValid).forEach(std => {
              const stdNode = { text: std, nodes: [] }
              result[cur][url][recId].metaElemValid[std].forEach(elem => {
                const res = `<span style="color:${elem.result ? 'green' : 'red'};">${elem.result}</span>`
                stdNode.nodes.push({ text: `<strong>${elem.label}</strong> - In conformity: <i>${res}</i>` })
              })
              metaNode.nodes.push(stdNode)
              metaElemPerc.push(result[cur][url][recId].metaElemValid[std].filter(cur => cur.result).length / result[cur][url][recId].metaElemValid[std].length)
            })
            recNode.nodes.push(metaNode)
            recNode.metaElemPerc = Math.round((metaElemPerc.reduce((acc, cur) => acc + cur, 0) / metaElemPerc.length) * 100)

            // set texts
            const reqPercText = `${recNode.reqDataPerc}` !== 'NaN' ? `${recNode.reqDataPerc}%` : '--'
            metaNode.text = `Meta Elem Eval. <span class="tree-pop-data">${recNode.metaElemPerc}%</span>`
            reqNode.text = `Req Data Eval. <span class="tree-pop-data">${reqPercText}</span>`
            recNode.text = `<span class="dataset-link-view" data-id="${recId}" data-catalog="${url}">${getTitle(Evaluation.dataset[url][recId].json, recId)}</span><span class="tree-pop-data">${reqPercText} / ${recNode.metaElemPerc}%</span>`

            urlNode.nodes.push(recNode)
          })
          urlNode.nodes.sort((a, b) => b.reqDataPerc - a.reqDataPerc)

          tcNode.nodes.push(urlNode)
        })
        acc.push(tcNode)
        return acc
      }, [])

      const resElem = Evaluation.showResult.addElement('tree', 'Tree view')
      resElem.treeview({ data, highlightSelected: false })
      resElem.treeview('collapseAll', { silent: true })
    },
    loadStatsOpt: (result, tcs) => {
      const data = Object.keys(result).map(cur => {
        const tcName = tcs[cur].name
        const tc = result[cur]
        const qis = Object.keys(tc).reduce((acc, cur) => {
          Object.keys(tc[cur]).forEach(recId => {
            tc[cur][recId].reqDataValid.forEach(qi => {
              if (qi.isCritical !== undefined) {
                const accQI = acc[qi.code] || { name: qi.label, percAprov: 0, total: 0, confor: 0, excluded: 0 }
                accQI.total += 1
                accQI.confor += +qi.inConfor
                accQI.excluded += +(!qi.inConfor && qi.isCritical)
                acc[qi.code] = accQI
              }
            })
          })
          return acc
        }, {})
        return {
          tc: tcName,
          urls: Object.keys(tc).length,
          records: Object.keys(tc).reduce((acc, cur) => acc + Object.keys(tc[cur]).length, 0),
          qis
        }
      })
      const qiData = data.reduce((acc, cur) => {
        Object.keys(cur.qis).forEach(qi => {
          qi = cur.qis[qi]
          acc.push({
            tc: cur.tc,
            qiName: qi.name,
            percConfor: `${Math.round((qi.confor / qi.total) * 100)}%`,
            percExcluded: `${Math.round((qi.excluded / qi.total) * 100)}%`,
            totConfor: qi.confor,
            totExcluded: qi.excluded,
            total: qi.total
          })
        })
        return acc
      }, [])

      const resElem = Evaluation.showResult.addElement('stats', 'Statistics')
      resElem.tabulator({
        resizableColumns: true,
        fitColumns: true,
        groupBy: 'tc',
        columns: [
          { title: 'QI Name', field: 'qiName', width: 200, frozen: true },
          { title: 'Total', field: 'total', width: 100, align: 'center' },
          {
            title: 'Datasets in Conformity',
            columns: [
              { title: 'Percent.', field: 'percConfor', width: 100, align: 'center' },
              { title: 'Total', field: 'totConfor', width: 100, align: 'center' }
            ]
          },
          {
            title: 'Excluded Datasets',
            columns: [
              { title: 'Percent.', field: 'percExcluded', width: 100, align: 'center' },
              { title: 'Total', field: 'totExcluded', width: 100, align: 'center' }
            ]
          }
        ],
        data: qiData
      })
    }
  }
}

const runEvaluation = () => {
  showSpinner(true)
  const data = { tcs, dtSrc: dtSrc.filter(cur => cur.enabled) }
  const validation = Evaluation.valDataBefEvaluation(data)
  if (!validation.success) { return showSpinner(false) || notifyMeNow(validation.msg, 'danger', 'glyphicon glyphicon-remove', NotifyTemps.long) }

  Evaluation.clearPrevData()
  Evaluation.fetchData(data)
    // .then(result => {
    //   Evaluation.loadFromJSONDT()
    // })
    .then(result => {
      // Make first validation
      return Evaluation.validateMetaElements({ dt: Evaluation.dataset, tcs })
    })
    .then(result => {
      // Make third validation
      return Evaluation.validateRequiredData(result, { tcs, dt: Evaluation.dataset })
    })
    .then(result => {
      notifyMeNow('<strong>Evaluation running finished!</strong>', 'success', 'glyphicon glyphicon-ok', NotifyTemps.bottom)
      Evaluation.showResult.load(result, data.tcs)
      showSpinner(false)
      console.log(result)
    })
}

$(document).on('change', 'input[type=radio][name=result-radio-options]', ev => {
  $('#showEvalResModal #result-elements-container > div').hide()
  $(`.${ev.currentTarget.value}`).show()
})

$(document).on('click', '.conf-add-tc-btn', () => {
  if ($('#select-add-tc :selected').length === 0) { return }
  $('#select-add-tc :selected').map(function () {
    const e = $(this)
    addTC({ code: e.val(), name: e.html() })
  })
  if (Storage.TCS.isNew) {
    $('#qi-table').tabulator('getColumns')[1].delete()
    delete tcs[Object.keys(tcs)[0]]
    Storage.TCS.isNew = false
  }
  reRenderTCSTable()
  $('#new-tc-modal').modal('toggle')
})

$(document).on('change', '#uploadDataA', (evt) => {
  const files = evt.target.files
  if (files.length !== 1) { return }
  const file = files[0]

  const reader = new FileReader()
  reader.onload = (() => (e) => {
    const text = e.target.result
    Storage.FILES.fromFile(text, (result) => {
      if (result.success) {
        confirmAction((success) => {
          if (!success) { return }
          Storage.TCS.setTCS(result.TCS)
          Storage.DTSRC.setDTSRC(result.DTSRC)
          location.reload()
        }, { msg: 'You will erase all your data! Do you want to load the new data?', btnLabel: 'Load', btnClass: 'warning' })
      } else {
        notifyMeNow('An error occured on uploading the data', 'danger', 'glyphicon glyphicon-remove')
      }
    })
  })(file)
  reader.readAsText(file)
})

$(document).on('click', '.big-main-menu-options li', e => {
  switch (e.currentTarget.dataset.action) {
    case 'save':
      Storage.TCS.setTCS(tcs)
      Storage.DTSRC.setDTSRC(dtSrc)
      notifyMeNow('All the data was successfully <b>saved</b>', 'success', 'glyphicon glyphicon-floppy-disk')
      break
    case 'clear-localstorage':
      Storage.clear()
      notifyMeNow('All the table data was successfully <b>removed</b>', 'success', 'glyphicon glyphicon-trash')
      break
    case 'setup-datasets-sources':
      $('#setup-dt-sources-modal').modal('toggle')
      break
    case 'download-file':
      const downElem = $('#downloadDataA')
      Storage.FILES.toFile([tcs, dtSrc], result => {
        if (result.success) {
          downElem.prop('href', `data:attachment/csv,${encodeURI(result.data)}`)
          downElem[0].click()
          downElem.prop('href', ``)
          notifyMeNow('Data was successfully download', 'success', 'glyphicon glyphicon-save')
        } else {
          notifyMeNow('An error occured on downloading the data', 'danger', 'glyphicon glyphicon-remove')
        }
      })
      break
    case 'upload-file':
      $('#uploadDataA').click()
      break
    case 'run-evaluation':
      confirmAction((success) => {
        if (success) {
          runEvaluation()
        }
      }, { msg: 'Are you sure you want to run the evaluation?', btnLabel: 'Run', btnClass: 'success' })
      break
  }
})

$(document).on('shown.bs.modal', '#setup-dt-sources-modal', e => {
  loadDataSrcModal()
})

$(document).on('click', '.float-add-btn', e => {
  $('#select-add-tc').html(PortalG.addTCSelect(configJSON.TCs.sort((a, b) => a.name > b.name)))
  $('#select-add-tc').trigger('chosen:updated')
  if (Object.keys(tcs).length === 1 && Storage.TCS.isNew) {
    $('.tc-hidder-group').hide()
    // $('.modal-backdrop.fade.in').css('background-color', getComputedStyle(document.body).getPropertyValue('--first-color'))
    $('.modal-backdrop.fade.in').css('opacity', '0.7')
  } else {
    $('.tc-hidder-group').show()
  }
})

$(document).on('click', '.remove-column-btn', e => {
  const columns = $('#qi-table').tabulator('getColumns')
  if (columns.length === 2) { return }
  const id = e.target.id
  confirmAction((success) => {
    if (success) {
      for (const col of columns) {
        if (col.getElement().text() === id) {
          col.delete()
          delete tcs[col.getDefinition().options.code]
          notifyMeNow('Tematic category successfully <b>removed</b>', 'success', 'glyphicon glyphicon-remove')
          return false
        }
      }
    }
  }, {})
})

$(document).on('click', '.cell-tool-delete-tc', e => {
  const parent = e.target.closest('.mfb-component__list')
  const data = parent.dataset

  confirmAction((success) => {
    if (success) {
      delete tcs[data.col].qis[data.row]
      notifyMeNow('Expected value successfully <b>removed</b>', 'success', 'glyphicon glyphicon-remove')
      changeCellStatus(data.col, data.row)
    }
  }, {})
})

$(document).on('click', '.cell-tool-edit-tc', e => {
  const parent = e.target.closest('.mfb-component__list')
  const data = parent.dataset

  requestEQI({ topic: data.col, qi: data.row }, true, (result) => {
    if (!result.success) { return }
    changeCellStatus(data.col, data.row, true)
  })
})

$(document).on('click', '.cell-tool-copy-tc', e => {
  const parent = e.target.closest('.mfb-component__list')
  const data = parent.dataset

  $('#copy-from-modal').modal('toggle')
  $('#select-copy-from').html(PortalG.addTCSelect(Object.keys(tcs)
    .filter(cur => tcs[cur].qis[data.row] !== undefined && cur !== data.col)
    .map(cur => tcs[cur])))
  $('#select-copy-from').trigger('chosen:updated')

  $(document).off('click', '.conf-copy-from-btn').on('click', '.conf-copy-from-btn', e => {
    let select = $('#select-copy-from').val()
    if (select === null) { return }
    confirmAction((success) => {
      if (success) {
        tcs[data.col].qis[data.row] = tcs[select].qis[data.row]
        changeCellStatus(data.col, data.row, true)
        $('#copy-from-modal').modal('toggle')
        notifyMeNow('Expected value successfully <b>copied</b>', 'success', 'glyphicon glyphicon-duplicate')
      }
    }, { btnClass: 'success', btnLabel: 'Copy' })
  })
})

$(document).on('keyup', '.qi-description-input', e => {
  tcs[e.currentTarget.dataset.col].description = e.currentTarget.value
})

$(document).on('click', '.dataset-link-view', e => {
  const target = e.currentTarget.dataset
  let dt = Evaluation.dataset[target.catalog]
  if (dt === null || dt[target.id] === null) { return }
  dt = dt[target.id]

  DatasetView.openView(dt.json)
})

const loadDataSrcModal = () => {
  const table = $('#data-src-table')

  const dtSrcSorted = configJSON.DEFAULTVALUES.DTSRCs.sort((a, b) => a.replace(/^https*:\/\//, '') < b.replace(/^https*:\/\//, '') ? -1 : 1)
  const urlEditor = (cell, onRendered, success, cancel) => {
    const editor = $('<input/>').addClass('ui-widget url-input-dtsrc')
    editor.autocomplete({
      minLength: 0,
      source: dtSrcSorted.filter(url => !table.tabulator('getData').reduce((acc, cur) => acc || cur.url === url, false))
    }).focus(function () {
      $(this).autocomplete('search', $(this).val())
    })

    // Set the current value
    editor.val(cell.getValue())
    // When the user clicks
    onRendered(function () {
      editor.focus()
    })
    // Trigger cell to update
    editor.on('change blur', function (e) {
      success(editor.val())
    })

    return editor
  }

  if (!table.hasClass('tabulator')) {
    table.tabulator({
      resizableColumns: true,
      fitColumns: true,
      height: '300px',
      selectable: 1,
      addRowPos: 'bottom',
      movableRows: true,
      columns: [
        { rowHandle: true, formatter: 'handle', headerSort: false, frozen: true, width: 5 },
        { title: 'URL', field: 'url', editor: urlEditor, frozen: true },
        { title: 'Enabled', field: 'enabled', width: 100, align: 'center', editor: true, formatter: 'tickCross' },
        { title: 'HTML request', field: 'forceRequest', width: 100, align: 'center', editor: true, formatter: 'tickCross' },
        { title: 'Total datasets found', field: 'totalFound', width: 100, align: 'center', editor: false }
      ],
      data: dtSrc,
      cellEdited: e => {
        const data = e.getRow().getData()
        if (data.enabled && data.url !== undefined && data.url !== '') {
          showSpinner(true)
          CSW.scanDTSRC(data, (result) => {
            showSpinner(false)
            if (result.success) {
              // data.totalFound = result.total
              e.getRow().update({ 'totalFound': result.total })
            } else {
              notifyMeNow('An error occured while <b>fetching the dataset source</b>', 'danger', 'glyphicon glyphicon-remove', NotifyTemps.bottom)
              e.getRow().update({ 'totalFound': 'Error', 'enabled': false })
            }
          })
        } else if (data.enabled) { e.getRow().update({ 'totalFound': 'Error', 'enabled': false }) }
      }
    })
    const modal = $('#setup-dt-sources-modal')
    modal.find('#add-row').off('click').click(() => {
      table.tabulator('addRow', { url: '', enabled: false, totalFound: '??' })
    })
    modal.find('#copy-row').off('click').click(() => {
      const sel = table.tabulator('getSelectedRows')
      if (sel.length !== 1) { return }
      table.tabulator('addRow', sel[0].getData())
    })
    modal.find('#del-row').off('click').click(() => {
      const sel = table.tabulator('getSelectedRows')
      if (sel.length !== 1) { return }
      table.tabulator('deleteRow', sel[0])
    })
    modal.find('#clear').off('click').click(() => {
      table.tabulator('clearData')
    })
    modal.find('#save-btn').off('click').click(() => {
      const data = table.tabulator('getData')
      dtSrc.length = 0
      dtSrc.push(...data)
      modal.modal('toggle')
      notifyMeNow('The dataset\'s sources was successfully <b>saved</b>', 'success', 'glyphicon glyphicon-floppy-disk')
    })
  } else {
    table.tabulator('setData', dtSrc)
  }
}

const addTC = ({ code, name }) => {
  // Verify if this TC is already added
  // if (code !== 'OTHER' && tcs[code] !== undefined) { return }
  // Add TC to the tcs[]
  let count
  const rCode = code
  if (tcs[code] !== undefined) {
    let oldCode = code
    code = `${code}${new Date().getTime()}`
    let prev = 1
    count = Object.keys(tcs)
      .filter(cur => cur.includes(oldCode))
      .sort((a, b) => tcs[a].count - tcs[b].count)
      .reduce((acc, cur) => {
        if (prev === false) { return acc }
        cur = tcs[cur]
        if (cur.count === undefined) { return acc }

        if (cur.count > acc && acc > prev) {
          prev = false
          return acc
        } else {
          prev = cur.count
          return cur.count + 1
        }
      }, prev)
    name = `${name} (${count})`
  } else {
    count = 1
  }
  tcs[code] = { code, rCode, name, count, qis: {}, dataset: {} }
  // Add TC to the table
  const columns = $('#qi-table').tabulator('getColumns')
  $('#qi-table').tabulator('addColumn', { title: PortalG.colChild({ name: wrapText(name), title: name }), formatter: formatter.tcCell, cellClick, headerSort: false, width: 130, options: { code } }, false, columns.pop())
  $('[data-toggle="tooltip"]').tooltip()
}

const changeCellStatus = (col, row, skipToggle) => {
  const ele = $(`#${col}_${row}`)
  if (!skipToggle) {
    ele.find('.cell-editor-tools').toggleClass('hidden')
    ele.find('.cell-editor-ic').toggleClass('hidden')
  }
  const qi = tcs[col].qis[row]
  const preview = ele.find('.cell-preview')
  if (qi) {
    const totalQIVs = qi.eGroup.calculateTotalChildren()
    preview.find('span').html(`${totalQIVs} value${totalQIVs === 1 ? '' : 's'}`)
    preview.removeClass('hidden')
  } else {
    preview.addClass('hidden')
  }
}

const reRenderTCSTable = () => {
  Object.keys(tcs).forEach(c => {
    Object.keys(tcs[c].qis).forEach(r => {
      changeCellStatus(c, r)
    })
  })
}

const requestEQI = ({ topic, qi }, isUpdate, callback) => {
  qi = configJSON.QIList[qi]
  const qiVal = tcs[topic].qis[qi.code] === undefined ? { code: qi.code, eGroup: new ecop.EGroup(ecop.EGroup.Types.OR.id) } : tcs[topic].qis[qi.code]
  ecop.QIValue[configJSON.QIList[qiVal.code].type].prototype.generateUIModal(configJSON.QIList[qiVal.code], qiVal.eGroup, (value, tools) => {
    const eGroup = ecop.EGroup.prototype.treeToEgroup(value)
    tcs[topic].qis[qi.code] = { code: qi.code, eGroup, tools }
    notifyMeNow(`Expected value successfully <b>${isUpdate ? 'updated' : 'saved'}</b>`, 'success', 'glyphicon glyphicon-' + (isUpdate ? 'refresh' : 'plus'))
    callback({ success: true })
  }, { title: isUpdate ? 'Update ' : undefined, tools: isUpdate ? qiVal.tools : {} })
}

const NotifyTemps = {
  bottom: { placement: { from: 'bottom', align: 'right' }, animate: { enter: 'animated bounceInUp', exit: 'animated bounceOutDown' }, newest_on_top: true },
  long: { delay: 5000 }
}

const notifyMeNow = (message, type, icon, options) => {
  $.notify(
    {
      message,
      icon
    }, $.extend({}, {
      type,
      delay: 2000,
      allow_dismiss: false,
      placement: { from: 'top', align: 'right' },
      newest_on_top: false,
      animate: {
        enter: 'animated bounceInDown',
        exit: 'animated bounceOutUp'
      }
    }, options || {}))
}

const confirmAction = (callback, { msg, btnLabel, btnClass }) => {
  vex.dialog.buttons.YES.text = btnLabel || 'Delete'
  vex.dialog.buttons.YES.className = 'btn-' + (btnClass || 'danger')
  vex.dialog.confirm({
    message: msg || 'Are you absolutely sure you want to continue?',
    className: 'vex-theme-default',
    callback
  })
}

const wrapText = (text, maxChars) => {
  const size = maxChars || 30
  const length = text.length
  return length <= size ? text : `${text.substr(0, size - 5 - 5)}[...]${text.substr(length - 4, 5)}`
}

const showSpinner = (on) => {
  setSpinner(on)
  showBackdrop(on)
  if (!on) {
    $('.spin-backdrop ').remove()
  }
}

const getTitle = (json, id) => {
  try {
    const title = json.identificationInfo.MD_DataIdentification.citation.CI_Citation.title.CharacterString.__text
    return title
  } catch (error) {
    return id === undefined ? 'No identifier' : id
  }
}

const DatasetView = {
  openView: (dt) => {
    const sections = []
    const geos = []
    configJSON.DATASET_UI.forEach(section => {
      const { items, geo } = DatasetView.loadSection(section, dt)
      if (items !== null) {
        const sect = { title: section.title, items }
        geo ? geos.push(sect) : sections.push(sect)
      }
    })

    // Remove previous modal
    $('#dataset-view-modal').remove()
    // Add the new modal and all the sections
    $('body').append(PortalG.datasetView({
      title: getTitle(dt, dt.fileIdentifier.CharacterString.__text),
      sections
    }))
    // Show modal
    $('#dataset-view-modal').modal('toggle')
      .on('shown.bs.modal', e => {
        // Add geos sections
        geos.forEach(geo => {
          if (geo.items.length > 0) {
            const listId = `list-${crypto.getRandomValues(new Uint32Array(4)).join('')}`
            $('#metadata-body-container').append($(PortalG.datasetViewGeo({ title: geo.title, listId })))
            geo.items.forEach(item => {
              item.values.forEach(mapData => {
                if (mapData.length === 4) {
                  const mapId = `map-${crypto.getRandomValues(new Uint32Array(4)).join('')}`
                  $(`#${listId}`).append(`<li><strong>${item.title}: </strong><div class="section-map" id="${mapId}"></div></li>`)
                  DatasetView.createMap(mapData, mapId)
                }
              })
            })
          }
        })
      })
  },
  createMap: (coords, mapId) => {
    let map = new L.Map(mapId, {})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const bounds = [[coords[2], coords[0]], [coords[3], coords[1]]]
    L.rectangle(bounds, {}).addTo(map)
    // zoom the map to the rectangle bounds
    map.fitBounds(bounds)
  },
  loadSection: (section, json) => {
    return {
      items: section.items.map(i => DatasetView.loadItems(i, json)),
      geo: section.geo
    }
  },
  loadItems: (item, json) => {
    const loadTags = (json, tags) => {
      const value = []
      tags.forEach(tagArr => {
        const val = tagArr.reduce((acc, cur) => {
          if (acc !== undefined && acc.constructor === Array) { acc = acc[0] }
          return acc === undefined ? acc : acc[cur]
        }, json)
        if (val !== undefined && val !== null) { value.push(val) }
      })
      return value.length === 0 ? ['N/A'] : value
    }

    json = item.src.reduce((acc, cur) => acc === null || acc === undefined ? acc : acc[cur], json)
    if (json === null || json === undefined) { json = {} }
    const values = json.constructor === Array ? json.reduce((acc, cur) => {
      acc.push(loadTags(cur, item.tags))
      return acc
    }, []) : [loadTags(json, item.tags)]

    return $.extend({}, { splitter: ', ', outSplitter: ', ', title: '' }, item, { values })
  }
}
