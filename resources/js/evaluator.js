const ecop = {}

ecop.RuleType = {
  QI: 'QIRule',
  EQI: 'EQIRule'
}
// Different types of QIValues
ecop.QIType = {
  QI: 'QI',
  EQI: 'EQI'
}

ecop.QIValue = function () { }
// Used on new ecop.QI
ecop.QIValue.Types = {
  VTEMPEXTENT: { vl: 'VTEMPEXTENT', captions: ['Beginning date', 'Ending date'] },
  VBOX: { vl: 'VBOX', captions: ['West bound', 'East bound', 'South bound', 'North bound'] },
  VSTRING: { vl: 'VSTRING', captions: ['Value'] },
  VCONTAINSSTR: { vl: 'VCONTAINSSTR', captions: ['Value'] },
  VDBLSTRING: { vl: 'VDBLSTRING', captions: ['Value', 'Coordinate system'] },
  VSCALE: { vl: 'VSCALE', captions: ['Is distance', 'Units', 'Value'] },
  VSCALERANGE: { vl: 'VSCALERANGE', captions: ['Is distance', 'Units', 'Range'] }
}
ecop.QIValue.prototype.factorQIValue = function (qiType, data) {
  let qiVl
  if (ecop.QIValue.Types[qiType] !== undefined) {
    qiVl = new ecop.QIValue[qiType](data)
  }
  return qiVl
}
ecop.QIValue.prototype.genNewNodeData = function (data, qiData, node, type) {
  return {
    nodeId: data.nodeId ? data.nodeId : (node.head ? node.nodeId : node.parentId),
    text: data.val.val || data.val,
    head: data.head,
    options: data.head ? undefined : {
      val: data.val,
      qi: new ecop.QIValue[type](qiData),
      icon: 'glyphicon glyphicon-tag'
    }
  }
}

const Tree = {
  removeNodes: (tree, node) => {
    if (node.nodes) {
      node.nodes.forEach(n => {
        Tree.removeNodes(tree, n)
      })
    }
    tree.find(`[data-nodeid=${node.nodeId}]`).remove()
  },
  requestToRemoveNode: (tree, node) => {
    confirmAction((success) => {
      if (success) {
        Tree.removeNodes(tree, node)
        tree.treeview('getNode', node.parentId).nodes = tree.treeview('getNode', node.parentId).nodes.filter(cur => cur.nodeId !== node.nodeId)
        node.state.selected = false
      }
    }, {})
  },
  addNode: (tree, isUpdate, data) => {
    const node = isUpdate ? tree.treeview('getNode', data.nodeId) : tree.treeview('addNode', data.nodeId)
    node.head = data.head
    node.text = data.head ? `<b>${ecop.EGroup.Types[data.text].label}</b>` : data.options.qi.treeValue(data.options.val)
    if (data.options !== undefined) {
      node.qi = data.options.qi
      node.icon = data.options.icon
    }
    if (data.head) { node.headId = data.text }

    Tree.updateTree(tree)
  },
  updateTree: (tree) => {
    tree.treeview('expandAll', { levels: 100, silent: true })
  },
  getSelected: (tree) => {
    return tree.treeview('getSelected')[0]
  },
  genBodyObj: (eGroup, src) => {
    return {
      type: 'tree',
      treeID: 'new-eqi-tree',
      data: { data: [ecop.EGroup.prototype.groupToTree(eGroup, src)] }
    }
  }
}

const getOptionsFromSrc = (src) => {
  if (!src) { return src }
  return configJSON.DEFAULTVALUES[src] || []
}

// ----------------------
// QIValues types classes
// ----------------------
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl] = function (dates) {
  ecop.QIValue.call(this)
  this.instType = ecop.QIValue.Types.VTEMPEXTENT.vl
  this.begDt = dates.reload ? dates.begDt : dates[0]
  this.endDt = dates.reload ? dates.endDt : dates[1]
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype = Object.create(ecop.QIValue.prototype)
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.constructor = ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl]
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.conformityTest = function (eqiList, qiList, { percCov }) {
  const perc = this.calcOverlapPerc(eqiList, qiList)
  return perc >= percCov
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.dataToArr = function () {
  return [this.begDt, this.endDt]
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.calcOverlapPerc = function (eqis, qis) {
  // Eliminate range overlapping of dataset and qis values
  const eRange = ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.eliminateRangeOver(eqis, true)
  const dRange = ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.eliminateRangeOver(qis, false)

  // Calculates intersection period time
  const union = [...eRange, ...dRange].sort((a, b) => a.dt - b.dt)
  let eOpen = false
  let dOpen = false
  let counting = false
  let intMili = 0
  let prvDt
  union.forEach(cur => {
    // Calculates the date period
    if (eOpen && dOpen && !cur.isStart) { intMili += cur.dt.getTime() - prvDt.getTime() }
    // Update the Open vars
    if (cur.isE) {
      eOpen = cur.isStart
    } else { dOpen = cur.isStart }
    // Update prvDate and counting
    if (eOpen && dOpen) {
      if (!counting) {
        counting = true
        prvDt = cur.dt
      }
    } else {
      counting = false
    }
  })

  // Calculates eRange period time
  const eMili = eRange.reduce((acc, cur, i, vls) => i % 2 === 0 ? acc : cur.dt.getTime() - vls[i - 1].dt.getTime(), 0)

  return intMili * 100 / eMili
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.eliminateRangeOver = function (lst, isE) {
  return lst
    .reduce((acc, cur) => {
      acc.push({ isStart: true, dt: new Date(cur.begDt) }, { isStart: false, dt: new Date(cur.endDt) })
      return acc
    }, [])
    .sort((a, b) => a.dt - b.dt)
    .filter((cur, i, vls) => {
      const valid = i === 0 || i === vls.length - 1 || (vls[i + 1].isStart !== cur.isStart && (vls[i - 1].removed && vls[i - 1].prevIsStart !== cur.isStart || vls[i - 1].isStart !== cur.isStart))
      cur.removed = !valid
      cur.prevIsStart = !valid ? (i === 0 ? true : vls[i - 1].prevIsStart) : cur.isStart
      return valid
    })
    .map(cur => {
      return { dt: cur.dt, isStart: cur.isStart, isE: isE !== undefined ? isE : cur.isE }
    })
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.generateUIModal = function (config, egroup, closeCallback, { title, tools }) {
  const content = config.content[0]
  Gen.VTEMPEXTENTModal({
    modalTitle: `${title || 'Create '}${config.name || ''} expected values`,
    opts: { name: content.name || '' },
    buttonsCRUD: config.options.buttonsCRUD,
    tools: $.extend({}, config.options.tools, { values: tools }),
    body: Tree.genBodyObj(egroup),
    btnCallback: (btn) => {
      if (btn.id !== 'remove') {
        $('.date-picker-input input').datepicker({
          format: 'yyyy-mm-dd',
          startView: 2,
          maxViewMode: 3,
          autoclose: true
        })
        if (btn.id !== 'edit') {
          $('.date-picker-input input').val('')
        }
      }
      const tree = $('#new-eqi-tree')
      const selected = Tree.getSelected(tree)
      if (selected === undefined) { return }

      if (btn.id === 'remove' && selected.nodeId !== 0) {
        Tree.requestToRemoveNode(tree, selected)
      } else if (btn.id === 'addValue') {
        Tree.addNode(tree, btn.isUpdate, ecop.QIValue.prototype.genNewNodeData(btn, btn.val, selected, ecop.QIValue.Types.VTEMPEXTENT.vl))
      }
    },
    rendered: (ele) => { },
    closeCallback
  })
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.treeValue = function () {
  return `${this.begDt} &#8594; ${this.endDt}`
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.composeFilter = function (cswField) {
  return new Ows4js.Filter().PropertyName(cswField).isBetween(this.begDt, this.endDt)
}
ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl].prototype.genPreview = function (eGroup) {
  return 'asdads'
}

ecop.QIValue[ecop.QIValue.Types.VBOX.vl] = function (boundaries) {
  ecop.QIValue.call(this)
  this.instType = ecop.QIValue.Types.VBOX.vl
  this.wB = boundaries.reload ? boundaries.wB : boundaries[0]
  this.eB = boundaries.reload ? boundaries.eB : boundaries[1]
  this.sB = boundaries.reload ? boundaries.sB : boundaries[2]
  this.nB = boundaries.reload ? boundaries.nB : boundaries[3]
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype = Object.create(ecop.QIValue.prototype)
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.constructor = ecop.QIValue[ecop.QIValue.Types.VBOX.vl]
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.conformityTest = function (eqiList, qiList, { percCov }) {
  let ePoly = eqiList.map(cur => cur.calculateCoord())
  ePoly = ePoly.reduce((acc, cur) => turf.union(acc, cur), turf.union(ePoly[0]))
  let dPoly = qiList.map(cur => cur.calculateCoord())
  dPoly = dPoly.reduce((acc, cur) => turf.union(acc, cur), turf.union(dPoly[0]))

  // let coverArea = 0
  // if (ePoly.geometry.type === dPoly.geometry.type) {
  //   const interPoly = turf.intersect(ePoly, dPoly)
  //   coverArea = interPoly === undefined ? 0 : turf.area(interPoly) * 100 / turf.area(ePoly)
  // } else {
  //   const intersectFuc = ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.multiPoliIntersection
  //   coverArea = ePoly.geometry.type === 'Polygon'
  //   ? intersectFuc(ePoly, dPoly)
  //   : intersectFuc(dPoly, ePoly)
  // }
  // const coverArea = this.multiPoliIntersection(ePoly, dPoly) * 100 / turf.area(ePoly)

  const interPoly = turf.intersect(ePoly, dPoly)
  const coverArea = interPoly === undefined ? 0 : turf.area(interPoly) * 100 / turf.area(ePoly)

  return coverArea >= percCov
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.multiPoliIntersection = function (poly0, poly1) {
  let coverArea = 0
  // turf.featureEach(turf.featureCollection(poly0.geometry.coordinates), curFeat0 => {
  //   turf.featureEach(turf.featureCollection(poly1.geometry.coordinates), curFeat1 => {
  //     console.log(poly1, poly0)
  //     const interPoly = turf.intersect(turf.polygon(curFeat0), turf.polygon(curFeat1))
  //     coverArea += interPoly === undefined ? 0 : turf.area(interPoly)
  //   })
  // })
  // poly0.geometry.coordinates.forEach(p0 => {
  //   poly1.geometry.coordinates.forEach(p1 => {
  //     if (p0 !== undefined && p1 !== undefined) {
  //       const interPoly = turf.intersect(turf.polygon([p0]), turf.polygon([p1]))
  //       coverArea += interPoly === undefined ? 0 : turf.area(interPoly)
  //     }
  //   })
  // })
  if (poly0.geometry.type === poly1.geometry.type) {
    const interPoly = turf.intersect(poly0, poly1)
    coverArea = interPoly === undefined ? 0 : turf.area(interPoly)
  } else {
    let multi = poly0.geometry.type === 'MultiPolygon' ? poly0 : poly1
    let poly = poly0.geometry.type === 'MultiPolygon' ? poly1 : poly0
    turf.featureEach(turf.featureCollection(multi.geometry.coordinates), curFeat => {
      const interPoly = turf.intersect(poly, turf.polygon(curFeat))
      coverArea += interPoly === undefined ? 0 : turf.area(interPoly)
    })
  }
  return coverArea
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.dataToArr = function () {
  return [this.wB, this.eB, this.sB, this.nB]
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.calculateCoord = function () {
  return turf.polygon([[
    [+this.wB, +this.nB],
    [+this.eB, +this.nB],
    [+this.eB, +this.sB],
    [+this.wB, +this.sB],
    [+this.wB, +this.nB]
  ]])
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.generateUIModal = function (config, egroup, closeCallback, { title, tools }) {
  const content = config.content[0]
  Gen.VBOXModal({
    modalTitle: `${title || 'Create '}${config.name || ''} expected values`,
    opts: { name: content.name || '', tools: {} },
    buttonsCRUD: config.options.buttonsCRUD,
    tools: $.extend({}, config.options.tools, { values: tools }),
    body: Tree.genBodyObj(egroup),
    btnCallback: (btn) => {
      const tree = $('#new-eqi-tree')
      const selected = Tree.getSelected(tree)
      if (selected === undefined) { return }

      if (btn.id === 'remove' && selected.nodeId !== 0) {
        Tree.requestToRemoveNode(tree, selected)
      } else if (btn.id === 'addValue') {
        Tree.addNode(tree, btn.isUpdate, ecop.QIValue.prototype.genNewNodeData(btn, btn.val, selected, ecop.QIValue.Types.VBOX.vl))
      }
    },
    rendered: (ele) => { },
    closeCallback
  })
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.treeValue = function () {
  return `[${this.wB}, ${this.eB}, ${this.sB}, ${this.nB}]`
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.composeFilter = function (cswField) {
  return new Ows4js.Filter().BBOX(this.wB, this.sB, this.eB, this.nB, 'urn:x-ogc:def:crs:EPSG:6.11:4326')
}
ecop.QIValue[ecop.QIValue.Types.VBOX.vl].prototype.genPreview = function (eGroup, callback) {
  // const map = new L.map('mymap', {}).setView([38.9, -77.03], 14)
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { }).addTo(map)
  // $(document).on('load', '#mymap', function (e) {
  // leafletImage(map, function (err, canvas) {
  //   const img = new Image()
  //   img.src = canvas.toDataURL()
  //   callback({ url: `url('${img.src}')`, src: img.src })
  // })
  // })
  return 'asd'
}

ecop.QIValue[ecop.QIValue.Types.VSTRING.vl] = function (value) {
  ecop.QIValue.call(this)
  this.instType = ecop.QIValue.Types.VSTRING.vl
  this.value = value.reload ? value.value : value[0]
}
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype = Object.create(ecop.QIValue.prototype)
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype.constructor = ecop.QIValue[ecop.QIValue.Types.VSTRING.vl]
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype.conformityTest = function (qi) {
  return qi.qiVls.reduce((acc, cur) => acc || this.value.toLowerCase() === cur.value.toLowerCase(), false)
}
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype.dataToArr = function () {
  return [this.value]
}
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype.generateUIModal = function (config, egroup, closeCallback, { title, tools }) {
  const content = config.content[0]
  const options = getOptionsFromSrc(content.options.src) || {}
  Gen.VSTRINGModal({
    modalTitle: `${title || 'Create '}${config.name || ''} expected values`,
    opts: { name: content.name || '', options },
    buttonsCRUD: config.options.buttonsCRUD,
    tools: $.extend({}, config.options.tools, { values: tools }),
    body: Tree.genBodyObj(egroup, options),
    btnCallback: (btn) => {
      const tree = $('#new-eqi-tree')
      const selected = Tree.getSelected(tree)
      if (selected === undefined) { return }

      if (btn.id === 'remove' && selected.nodeId !== 0) {
        Tree.requestToRemoveNode(tree, selected)
      } else if (btn.id === 'addValue') {
        Tree.addNode(tree, btn.isUpdate, ecop.QIValue.prototype.genNewNodeData(btn, [btn.val.id], selected, ecop.QIValue.Types.VSTRING.vl))
      }
    },
    rendered: (ele) => { },
    closeCallback
  })
}
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype.treeValue = function (val) {
  return val
    ? val.id && val.val
      ? val.id === this.value ? val.val : this.value
      : val[this.value]
    : this.value
}
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype.composeFilter = function (cswField) {
  return new Ows4js.Filter().PropertyName(cswField).isLike(`%${this.value}%`)
}
ecop.QIValue[ecop.QIValue.Types.VSTRING.vl].prototype.genPreview = function (eGroup) {
  const tree = $('<div/>')
  const container = $('<div/>').append(tree)
  tree.treeview({
    data: [
      {
        text: 'Parent 1',
        nodes: [
          {
            text: 'Child 1',
            nodes: [
              {
                text: 'Grandchild 1'
              },
              {
                text: 'Grandchild 2'
              }
            ]
          },
          {
            text: 'Child 2'
          }
        ]
      },
      {
        text: 'Parent 2'
      },
      {
        text: 'Parent 3'
      },
      {
        text: 'Parent 4'
      },
      {
        text: 'Parent 5'
      }
    ]
  })
  return container.html()
}

ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl] = function (value) {
  if (value.constructor === Array && value.length > 1) {
    return value.map(cur => new ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl]([cur]))
  } else {
    ecop.QIValue.call(this)
    this.instType = ecop.QIValue.Types.VCONTAINSSTR.vl
    this.value = value.reload ? value.value : value[0]
  }
}
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype = Object.create(ecop.QIValue.prototype)
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype.constructor = ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl]
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype.conformityTest = function (qi) {
  if (this.value.match(/^\/.*\/[a-z]*$/g)) { // then it is a ReGex expression
    const regOpts = this.value.match(/\/[a-z]*$/i)[0]
    const rOpts = regOpts.split('/')
    const regex = new RegExp(this.value.substring(1, this.value.length - regOpts.length), rOpts.constructor === Array ? rOpts.pop() : '')
    return qi.qiVls.reduce((acc, cur) => acc || cur.value.match(regex) !== null, false)
  } else {
    return qi.qiVls.reduce((acc, cur) => acc || cur.value.toLowerCase().includes(this.value.toLowerCase()), false)
  }
}
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype.dataToArr = function () {
  return [this.value]
}
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype.generateUIModal = function (config, egroup, closeCallback, { title, tools }) {
  const content = config.content[0]
  Gen.VCONTAINSSTRModal({
    modalTitle: `${title || 'Create '}${config.name || ''} expected values`,
    opts: { name: content.name || '' },
    buttonsCRUD: config.options.buttonsCRUD,
    tools: $.extend({}, config.options.tools, { values: tools }),
    body: Tree.genBodyObj(egroup),
    btnCallback: (btn) => {
      const tree = $('#new-eqi-tree')
      const selected = Tree.getSelected(tree)
      if (selected === undefined) { return }

      if (btn.id === 'remove' && selected.nodeId !== 0) {
        Tree.requestToRemoveNode(tree, selected)
      } else if (btn.id === 'addValue') {
        Tree.addNode(tree, btn.isUpdate, ecop.QIValue.prototype.genNewNodeData(btn, [btn.val], selected, ecop.QIValue.Types.VCONTAINSSTR.vl))
      }
    },
    rendered: (ele) => {
      ele.find('#add-value-input').autocomplete({ minLength: 0, source: getOptionsFromSrc(content.options.src) || [] }).focus(function () { $(this).autocomplete('search', $(this).val()) })
    },
    closeCallback
  })
}
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype.treeValue = function () {
  return this.value
}
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype.composeFilter = function (cswField) {
  return new Ows4js.Filter().PropertyName(cswField).isLike(`%${this.value}%`)
}
ecop.QIValue[ecop.QIValue.Types.VCONTAINSSTR.vl].prototype.genPreview = function (eGroup) {
  return 'asdads'
}

ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl] = function (values) {
  ecop.QIValue.call(this)
  this.instType = ecop.QIValue.Types.VDBLSTRING.vl
  this.values = values.reload ? values.values : values
}
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype = Object.create(ecop.QIValue.prototype)
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype.constructor = ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl]
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype.conformityTest = function (qi) {
  return qi.qiVls.reduce((acc, cur) => acc || (cur.values[0].toLowerCase() === this.values[0].toLowerCase() &&
    cur.values[1].toLowerCase() === this.values[1].toLowerCase()), false)
}
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype.dataToArr = function () {
  return this.values
}
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype.generateUIModal = function (config, egroup, closeCallback, { title, tools }) {
  const content = config.content
  const name = []
  const options = []
  let srcMap = {}
  content.forEach(cur => {
    name.push(cur.name || '')
    const src = getOptionsFromSrc(cur.options.src)
    srcMap = $.extend({}, srcMap, src)
    options.push(src)
  })
  Gen.VDBLSTRINGModal({
    modalTitle: `${title || 'Create '}${config.name || ''} expected values`,
    opts: { name, options },
    buttonsCRUD: config.options.buttonsCRUD,
    tools: $.extend({}, config.options.tools, { values: tools }),
    body: Tree.genBodyObj(egroup, srcMap),
    btnCallback: (btn) => {
      const tree = $('#new-eqi-tree')
      const selected = Tree.getSelected(tree)
      if (selected === undefined) { return }

      if (btn.id === 'remove' && selected.nodeId !== 0) {
        Tree.requestToRemoveNode(tree, selected)
      } else if (btn.id === 'addValue') {
        Tree.addNode(tree, btn.isUpdate, ecop.QIValue.prototype.genNewNodeData(btn, btn.val, selected, ecop.QIValue.Types.VDBLSTRING.vl))
      }
    },
    rendered: (ele) => { },
    closeCallback
  })
}
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype.treeValue = function (val) {
  // return `${this.values[0]} ${this.values[1]}`
  val = val && val.length === 2 ? val : this.values
  return `${val[0]} ${val[1]}`
}
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype.composeFilter = function (cswField) {
  return undefined
}
ecop.QIValue[ecop.QIValue.Types.VDBLSTRING.vl].prototype.genPreview = function (eGroup) {
  return 'asdads'
}

ecop.QIValue[ecop.QIValue.Types.VSCALE.vl] = function (data) {
  ecop.QIValue.call(this)
  this.instType = ecop.QIValue.Types.VSCALE.vl
  // data = data.reload ? data : data[0]
  if (data.constructor === Array) {
    this.isDistance = data.length === 2
    this.units = data[1]
    this.value = data[0]
  } else {
    this.isDistance = data.reload ? data.isDistance : data.param !== undefined && data.param._uom !== undefined
    this.units = data.reload ? data.units : this.isDistance ? data.param._uom : undefined
    this.value = data.reload ? data.value : this.isDistance ? data.value : data
  }
}
ecop.QIValue[ecop.QIValue.Types.VSCALE.vl].prototype = Object.create(ecop.QIValue.prototype)
ecop.QIValue[ecop.QIValue.Types.VSCALE.vl].prototype.constructor = ecop.QIValue[ecop.QIValue.Types.VSCALE.vl]
ecop.QIValue[ecop.QIValue.Types.VSCALE.vl].prototype.dataToArr = function () {
  return [this.isDistance, this.units, this.value]
}

ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl] = function (data) {
  ecop.QIValue.call(this)
  this.instType = ecop.QIValue.Types.VSCALERANGE.vl
  this.isDistance = data.reload ? data.isDistance : data[0].param !== undefined && data[0].param._uom !== undefined
  this.units = data.reload ? data.units : this.isDistance ? data[0].param._uom : undefined
  this.lValue = data.reload ? data.lValue : this.isDistance ? data[0].value : data[0]
  this.hValue = data.reload ? data.hValue : this.isDistance ? data[1].value : data[1]

  if (data.length === 3) {
    this.type = data.reload ? data.type : data[2]
  }
}
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype = Object.create(ecop.QIValue.prototype)
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype.constructor = ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl]
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype.conformityTest = function (qi) {
  const boundaries = [this.hValue, this.lValue].sort()

  return qi.qiVls
    .filter(cur => this.isDistance === cur.isDistance)
    .reduce((acc, cur) => {
      const isDistN = cur === this.isDistance && cur.units !== this.units
      const val = isDistN ? Qty(cur.value, cur.units).baseScalar : cur.value
      const lVal = isDistN ? Qty(boundaries[0], this.units).baseScalar : boundaries[0]
      const hVal = isDistN ? Qty(boundaries[1], this.units).baseScalar : boundaries[1]

      return acc || (val >= lVal && val <= hVal)
    }, false)
}
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype.dataToArr = function () {
  return [this.isDistance, this.units, `${this.lValue} - ${this.hValue}`]
}
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype.generateUIModal = function (config, egroup, closeCallback, { title, tools }) {
  const src = getOptionsFromSrc(config.selectSrc)
  Gen.VSCALERANGEModal({
    modalTitle: `${title || 'Create '}${config.name || ''} expected values`,
    opts: { name: config.name || '', types: config.contentTypes, selectSrc: src },
    buttonsCRUD: config.options.buttonsCRUD,
    tools: $.extend({}, config.options.tools, { values: tools }),
    body: Tree.genBodyObj(egroup, src),
    btnCallback: (btn) => {
      const tree = $('#new-eqi-tree')
      const selected = Tree.getSelected(tree)
      if (selected === undefined) { return }

      if (btn.id === 'remove' && selected.nodeId !== 0) {
        Tree.requestToRemoveNode(tree, selected)
      } else if (btn.id === 'addValue') {
        const _uom = btn.val.units || undefined
        if (!btn.head) {
          btn.val = [
            _uom ? { value: btn.val.min, param: { _uom } } : btn.val.min,
            _uom ? { value: btn.val.max, param: { _uom } } : btn.val.max,
            btn.val.type
          ]
        }
        Tree.addNode(tree, btn.isUpdate, ecop.QIValue.prototype.genNewNodeData(btn, btn.val, selected, ecop.QIValue.Types.VSCALERANGE.vl))
      }
    },
    rendered: (ele) => { },
    closeCallback
  })
}
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype.treeValue = function (val) {
  if (val && val.length === 3) {
    const distanceData = val[0].param && val[0].param._uom ? ` (${val[0].param._uom})` : ''
    return `Min: ${val[0].value || val[0]} ${distanceData} |  Max: ${val[1].value || val[1]} ${distanceData}`
  } else {
    const distanceData = this.isDistance ? ` (${this.units})` : ''
    return `Min: ${this.lValue} ${distanceData} |  Max: ${this.hValue} ${distanceData}`
  }
}
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype.composeFilter = function (cswField) {
  return undefined
}
ecop.QIValue[ecop.QIValue.Types.VSCALERANGE.vl].prototype.genPreview = function (eGroup) {
  return 'asdads'
}

// ----------------------
// <<<<<<<<<<<>>>>>>>>>>>
// ----------------------

ecop[ecop.RuleType.QI] = function (config) {
  this.tag = config.tag
  this.fields = config.fields
}
ecop[ecop.RuleType.QI].prototype.loadFromXML = function (jd) {
  // const tags = this.tag.split('/')
  this.tag.split('/').forEach(t => {
    jd = jd[t]
  })
  jd = jd.constructor === Object ? [jd] : jd

  const qiVls = []
  jd.forEach(obj => {
    const qiVl = []
    this.fields.forEach(fd => {
      const subFds = fd.split('/')
      let co = obj
      for (let i = 0; i < subFds.length; i++) {
        co = co[subFds[i]]
        if (co === undefined) { return }

        if (i === subFds.length - 1) {
          co = co.__text
        } else {
          if (subFds[i + 1].includes('@')) {
            co = { value: co.__text, param: ecop[ecop.RuleType.QI].prototype.extractAttrs(subFds.slice(i + 1, subFds.length), co) }
            i = subFds.length
          }
        }
      }
      if (co === undefined) { return }
      qiVl.push(co)
    })
    qiVls.push(qiVl)
  })

  return qiVls
}
ecop[ecop.RuleType.QI].prototype.extractAttrs = function (params, data) {
  const result = {}
  params.forEach(p => {
    if (p.includes('@')) {
      const param = p.replace('@', '_')
      result[param] = data[param]
    }
  })
  return result
}
// Returns an array with the values to be able to create the QI
ecop[ecop.RuleType.QI].prototype.loadFromJSON = function (json) {
  if (this.fields.length === 0 && this.tag.length === 0) { return }
  json = this.tag.reduce((acc, cur) => acc === undefined ? acc : acc[cur], json)
  if (json === undefined) { return }
  const data = []
  if (json.constructor === Array) {
    json.forEach(arr => {
      const res = this.loadFromFields(arr, [])
      if (res.length !== 0) { data.push(res) }
    })
  } else {
    const res = this.loadFromFields(json, [])
    if (res.length !== 0) { data.push(res) }
  }
  return data.length !== 0 ? data : undefined
}
ecop[ecop.RuleType.QI].prototype.loadFromFields = function (json, data) {
  if (this.fields.length !== 0) {
    this.fields.forEach(fieldArr => {
      const val = fieldArr.reduce((acc, cur) => {
        return acc === undefined ? acc : acc[cur]
      }, json)
      if (val !== undefined && val !== '') { data.push(val) }
    })
  } else {
    data = json
  }
  return data
}

ecop[ecop.RuleType.EQI] = function (config) {
  this.tag = config.tag
  this.fields = config.fields
  this.options = config.options
}
ecop[ecop.RuleType.EQI].prototype.loadFromXML = function (jd) {
  this.tag.split('/').forEach(t => {
    jd = jd[t]
  })
  // load options data
  const opts = {}
  this.options.forEach(opt => {
    const option = jd[opt]
    if (option !== undefined) { opts[opt] = option }
  })

  const mainGroup = this.fetchLogicGroups(jd.Criteria.LogicGroup)

  return { opts, mainGroup }
}
ecop[ecop.RuleType.EQI].prototype.fetchLogicGroups = function (data) {
  const group = { matchType: data._matchType }
  const values = []

  let rows = data.row
  let groups = data.LogicGroup

  if (rows !== undefined) {
    rows = rows.constructor === Array ? rows : [rows]
    rows.forEach(r => {
      const row = []
      this.fields.forEach(f => {
        const divs = f.split('@')
        const fieldName = divs.shift()

        let value = r[fieldName]
        if (divs.length > 0 && value !== undefined) {
          const param = {}
          divs.forEach(d => {
            param[`_${d}`] = value[`_${d}`]
          })
          value = { value: value.__text, param }
        }
        if (value !== undefined) { row.push(value) }
      })
      values.push(row)
    })
  }

  if (groups !== undefined) {
    groups = groups.constructor === Array ? groups : [groups]
    groups.forEach(g => {
      values.push(this.fetchLogicGroups(g))
    })
  }

  group.values = values

  return group
}

ecop[ecop.QIType.QI] = function (name, qiType, rule) {
  this.name = name
  this.qiType = qiType
  this.rule = rule
  this.qiVls = []
}
ecop[ecop.QIType.QI].prototype.factorQIFromConfig = function (qiType, data) {
  return new ecop[qiType](data.name, data.type, new ecop[ecop.RuleType[qiType]](data.config[qiType]))
}
ecop[ecop.QIType.QI].prototype.loadFromXML = function (jsonData) {
  this.qiVls = []
  const retVls = this.rule.loadFromXML(jsonData)
  retVls.forEach(vl => { // create each single QIValue
    const qiVl = ecop.QIValue.prototype.factorQIValue(this.qiType, vl)
    if (qiVl === undefined) { return }
    this.qiVls.push(qiVl)
  })
}
ecop[ecop.QIType.QI].prototype.factorQIReport = function (template) {
  const reportData = {
    qi: {
      name: this.name,
      type: this.qiType,
      tag: this.rule.tag,
      field: this.rule.fields.join('; ')
    },
    values: {
      captions: ecop.QIValue.Types[this.qiType].captions,
      rows: this.qiVls.map(vl => vl.dataToArr())
    }
  }
  return template(reportData)
}
ecop[ecop.QIType.QI].prototype.loadFromJSON = function (data) {
  this.qiVls = []
  const retVls = this.rule.loadFromJSON(data)
  if (retVls === undefined) { return }
  retVls.forEach(vl => {
    const qiVl = ecop.QIValue.prototype.factorQIValue(this.qiType, vl)
    if (qiVl !== undefined) {
      if (qiVl.constructor === Array) {
        this.qiVls.push(...qiVl)
      } else {
        this.qiVls.push(qiVl)
      }
    }
  })
}

ecop[ecop.QIType.EQI] = function (name, qiType, rule) {
  ecop[ecop.QIType.QI].call(this, name, qiType, rule)
  // this.options = {} // ex: cover, isCF
  // this.mainGroup = eGroup
}
ecop[ecop.QIType.EQI].prototype = Object.create(ecop[ecop.QIType.QI].prototype)
ecop[ecop.QIType.EQI].prototype.constructor = ecop[ecop.QIType.EQI]
ecop[ecop.QIType.EQI].prototype.loadFromXML = function (jsonData) {
  const retVls = this.rule.loadFromXML(jsonData)

  this.options = retVls.opts
  this.mainGroup = this.createLogicGroup(retVls.mainGroup)
}
ecop[ecop.QIType.EQI].prototype.createLogicGroup = function (curLG) {
  const group = new ecop.EGroup(ecop.EGroup.Types[curLG.matchType].id)

  curLG.values.forEach(val => {
    let value
    if (val.constructor === Array) {
      value = ecop.QIValue.prototype.factorQIValue(this.qiType, val)
    } else {
      value = this.createLogicGroup(val)
    }
    if (value !== undefined) { group.values.push(value) }
  })
  return group
}
ecop[ecop.QIType.EQI].prototype.conformityTest = function (qis) {
  const conformity = this.mainGroup.conformityTest(qis, this.options)
  return conformity
}

ecop.EGroup = function (matchType) {
  this.instType = 'EGroup'
  this.matchType = matchType
  this.values = []
}
ecop.EGroup.Types = {
  OR: {
    id: 'OR',
    label: 'ANY',
    check: (acc, cur) => cur || (acc !== undefined && acc)
  },
  AND: {
    id: 'AND',
    label: 'ALL',
    check: (acc, cur) => cur && (acc === undefined || acc)
  },
  NA: {
    id: 'NA',
    label: 'NA'
  }
}
ecop.EGroup.prototype.conformityTest = function (qi, options) {
  let conformity
  // if (this.matchType === ecop.EGroup.Types.AND.id && this.values.length > 0 &&
  //   (this.values[0].constructor === ecop.QIValue[ecop.QIValue.Types.VBOX.vl] ||
  //     this.values[0].constructor === ecop.QIValue[ecop.QIValue.Types.VTEMPEXTENT.vl])) {
  if (this.matchType === ecop.EGroup.Types.AND.id && this.values.length > 0 &&
    (qi.qiType === ecop.QIValue.Types.VTEMPEXTENT.vl ||
    qi.qiType === ecop.QIValue.Types.VBOX.vl)) {
    const callType = (qi.qiType === ecop.QIValue.Types.VBOX.vl ? ecop.QIValue.Types.VBOX : ecop.QIValue.Types.VTEMPEXTENT).vl
    conformity = ecop.QIValue[callType].prototype.conformityTest(this.values, qi.qiVls, options || {})
  } else {
    conformity = this.values.reduce((acc, cur) => {
      const res = cur.conformityTest(qi, options || {})
      return ecop.EGroup.Types[this.matchType].check(acc, res)
    }, undefined)
  }

  return conformity
}
ecop.EGroup.prototype.treeToEgroup = function (node) {
  let value
  if (node.head) {
    value = new ecop.EGroup(node.headId)
    if (node.nodes) {
      node.nodes.forEach(cur => {
        value.values.push(ecop.EGroup.prototype.treeToEgroup(cur))
      })
    }
  }

  return value || node.qi
}
ecop.EGroup.prototype.groupToTree = function (eGroup, src) {
  if (eGroup.matchType === undefined) {
    return { text: eGroup.treeValue(src), qi: eGroup, head: false, icon: 'glyphicon glyphicon-tag' }
  } else {
    return {
      text: `<b>${ecop.EGroup.Types[eGroup.matchType].label}</b>`,
      headId: ecop.EGroup.Types[eGroup.matchType].id,
      head: true,
      state: { expanded: true },
      nodes: eGroup.values.map(cur => ecop.EGroup.prototype.groupToTree(cur, src))
    }
  }
}
ecop.EGroup.prototype.groupToTreePreview = function (eGroup, qiType, callback) {
  // ecop.QIValue[qiType].prototype.genPreview(eGroup, callback)
  return ecop.QIValue[qiType].prototype.genPreview(eGroup)
}
ecop.EGroup.prototype.calculateTotalChildren = function () {
  return this.values.reduce((acc, cur) => acc + (cur.constructor === ecop.EGroup ? cur.calculateTotalChildren() : 1), 0)
}
ecop.EGroup.prototype.composeFilter = function (cswField) {
  const isOr = this.matchType === ecop.EGroup.Types.OR.id
  return this.values.reduce((acc, cur) => {
    const newFilter = cur.composeFilter(cswField)
    return isOr
      ? acc ? newFilter ? newFilter.or(acc) : acc : newFilter // return or
      : acc ? newFilter ? newFilter.and(acc) : acc : newFilter // return and
  }, undefined)
}

ecop.QIList = function (qis) {
  this.qis = qis
}
ecop.QIList.prototype.factorQIListFromConfig = function (qiType, config) {
  var qis = {}
  Object.keys(config).forEach(c => {
    c = Object.assign({}, config[c])
    // if (!c.isntQI && c.type !== undefined) {
      c.type = c[qiType] || c.type
      // qis.push(ecop[ecop.QIType.QI].prototype.factorQIFromConfig(qiType, c))
      qis[c.code] = ecop[ecop.QIType.QI].prototype.factorQIFromConfig(qiType, c)
    // }
  })
  return new ecop.QIList(qis)
}

ecop.QIList.prototype.loadFromJSON = function () {
  Object.keys(this.qis).forEach(qi => {
    this.qis[qi].loadFromJSON(this.json)
  })
}
ecop.QIList.prototype.loadFromXML = function (xmlData) {
  const jsonData = new X2JS().xml2json(new DOMParser().parseFromString(xmlData, 'text/xml'))
  this.qis.forEach(qi => { // load each QI's values
    qi.loadFromXML(jsonData)
  })
}
ecop.QIList.prototype.conformityTest = function (qiList) {
  const conformityResult = this.qis.map(eqi => {
    const qi = qiList.qis.filter(qi => qi.name === eqi.name)[0]
    if (qi === undefined) { return }

    const res = eqi.conformityTest(qi)
    console.log(`${eqi.name} --> ${res}`)
    return { qi: eqi.name, result: res }
  })

  return conformityResult
}
ecop.QIList.prototype.conformityTestWithEV = function (eqiList) {
  return new Promise((resolve, reject) => {
    // console.log(eqiList, this)
    resolve(Object.keys(eqiList).reduce((acc, cur) => {
      const curQI = this.qis[cur]
      const curEQI = eqiList[cur]
      const result = curEQI.eGroup.conformityTest(curQI, curEQI.tools)
      acc.push({ code: curEQI.code, label: curQI.name, inConfor: result, isCritical: curEQI.tools.isCritical })
      // acc[curEQI.code] = { code: curEQI.code, label: curQI.name, inConfor: result, isCritical: curEQI.tools.isCritical }
      return acc
    }, []))
  })
}
