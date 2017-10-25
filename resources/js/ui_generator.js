const Gen = {};

(function () {
  Gen.VSTRINGModal = function (options) {
    return new GenModalSTRING(options)
  }

  Gen.VCONTAINSSTRModal = function (options) {
    return new GenModalCONTAINSSTR(options)
  }

  Gen.VDBLSTRINGModal = function (options) {
    return new GenModalDBLSTRING(options)
  }

  Gen.VTEMPEXTENTModal = function (options) {
    return new GenModalTEMPEXTENT(options)
  }

  Gen.VSCALERANGEModal = function (options) {
    return new GenModalSCALERANGE(options)
  }

  Gen.VBOXModal = function (options) {
    return new GenModalBOX(options)
  }

  const GenModalBase = {
    $type: null,
    $eleClass: 'eqi-modal',
    $modalTitle: 'Add new expected value',
    $el: null,
    $options: null,
    _init: function () {
      const me = this
      me.setModalTitle()
      me._createMarkup()

      if (me.$options.rendered) { me.$options.rendered(me.$el) }

      return me
    },
    _createMarkup: function () {
      const me = this

      // Create main element (modal)
      const modal = $(GenTG.parentModal({ modalClass: me.$eleClass, modalTitle: me.$modalTitle }))
      // Set buttons
      const buttons = me._generateButtonsCRUD()
      modal.find('.modal-body').prepend(buttons)
      modal.find('.modal-body').find(`.${me.$eleClass}-header`).append(me._generateToolsOptions())

      modal.find(`.${me.$eleClass}-data`).append(me._generateDataUI())
      modal.find(`.${me.$eleClass}-data`).append(me._generateButtonsContainers())

      $(document).off('click', '.close-modal-persist').on('click', '.close-modal-persist', () => {
        const isFilter = $('#filter-check') ? $('#filter-check').is(':checked') : undefined
        const isCritical = me.$options.tools.hasIsCritical ? $('#critical-check').is(':checked') : undefined
        const percCov = me.$options.tools.slider && me.$options.tools.slider.has ? $('#perc-slider').slider('value') : undefined
        me.$options.closeCallback($('#new-eqi-tree').treeview('getNode', 0), { isCritical, percCov, isFilter })
      })

      me.$el = modal
    },
    _generateButtonsContainers: function () {
      const me = this
      return GenModalBase.Containers[me.valType](me)
    },
    _generateDataUI: function () {
      const me = this
      const body = me.$options.body
      return GenModalBase.DATA[body.type](body, me)
    },
    _generateButtonsCRUD: function () {
      const me = this
      if (me.$options.buttonsCRUD === undefined || me.$options.buttonsCRUD.length === 0) { return '' }

      const btns = me.$options.buttonsCRUD
      const btnsContainer = btns.reduce((acc, cur) => acc.append(me._createButton(cur)), $(`<div class="${me.$eleClass}-header btns-header-modal"></div>`))

      return btnsContainer
    },
    _createButton: function (cur) {
      const me = this

      const btn = $(GenTG.headerBtnModal(cur))
      btn.click(() => {
        const tree = $('#new-eqi-tree')
        const selected = tree.treeview('getSelected')[0]
        if (cur.id === 'add' || cur.id === 'edit' && selected !== undefined) {
          $('.operation-label').html(cur.id === 'add' ? 'Add' : 'Update').data('operation-type', cur.id)
          $('.modal-add-container,.new-condition-form,.new-value').removeClass('hidden')
        }
        if (cur.id === 'edit') {
          if (selected === undefined) { return }

          $('.operation-label').data('nodeId', selected.nodeId)
          if (selected.head) {
            $('.new-value').addClass('hidden')
          } else {
            $('.new-condition-form').addClass('hidden')
            if (me.doubleSelects) {
              const vals = selected.text.split(' ')
              $('#add-value-input-left').val(vals[0])
              $('#add-value-input-right').val(vals[1])
            } else if (me.hasMinMax) {
              $('#input-select').val(selected.qi.type)
              $('#input-min').val(selected.qi.lValue)
              $('#input-max').val(selected.qi.hValue)
              $('#units-select').prop('disabled', !selected.qi.isDistance)
              // if (selected.qi.isDistance) {
              $('#units-select').val(selected.qi.isDistance ? selected.qi.units : '')
              // }
            } else if (me.temporal) {
              const inputs = $('.date-picker-input-tuple .date-picker-input input')
              $(inputs[0]).val(selected.qi.begDt)
              $(inputs[1]).val(selected.qi.endDt)
            } else {
              $('#add-value-input').val(selected.qi.treeValue())
            }
          }
        }

        me.$options.btnCallback(cur)
      })
      return btn
    },
    _generateToolsOptions: function () {
      const me = this
      const parent = $('<div/>').addClass('modal-tool-options')
      if (me.$options.tools.filter) {
        parent.append($('<span/>').addClass(`inline margin ${me.$options.tools.filter.allowFilter ? '' : 'hidden'}`).text('Use as filter ')
          .append($('<input/>').attr('id', 'filter-check').attr('type', 'checkbox')
            .prop('checked', me.$options.tools.values.isFilter || !!me.$options.tools.filter.isFilter)))
      }
      if (me.$options.tools.hasIsCritical) {
        parent.append($('<span/>').addClass('inline margin').text('Is critical ')
          .append($('<input/>').attr('id', 'critical-check').attr('type', 'checkbox')
            .prop('checked', !!me.$options.tools.values.isCritical)))
      }
      if (me.$options.tools.slider && me.$options.tools.slider.has) {
        const sConf = me.$options.tools.slider.config
        parent.append($('<span/>').addClass('inline margin').html(`${sConf.caption}: `))

        const slider = $('<div/>').attr('id', 'perc-slider').addClass('inline')
          .append($('<div/>').attr('id', 'custom-handle').addClass('ui-slider-handle'))
        slider.slider({
          min: sConf.minValue,
          max: sConf.maxValue,
          value: me.$options.tools.values.percCov === undefined ? sConf.defaultValue : me.$options.tools.values.percCov,
          create: function () {
            slider.find('#custom-handle').text(`${$(this).slider('value')}%`)
          },
          slide: function (event, ui) {
            slider.find('#custom-handle').text(`${ui.value}%`)
          }
        })
        parent.append(slider)
      }
      return parent
    },
    construct: function (me, options) {
      me.$options = options
      me._init(options)
    },
    init: function (me) {
      GenModalBase._init.call(me)
      me.show()
    },
    setModalTitle: function () {
      const me = this
      if (me.$options.modalTitle !== undefined) {
        me.$modalTitle = me.$options.modalTitle
      }
    },
    show: function () {
      const me = this

      $(`.${me.$eleClass}`).remove()
      $(me.$el).modal('toggle')
    }
  }

  GenModalBase.DATA = {
    tree: (body, me) => {
      const tree = $('<div/>').addClass(`${me.$eleClass}-tree`).prop('id', `${body.treeID}`)
      tree.treeview(body.data)

      tree.on('nodeCollapsed', () => {
        tree.treeview('expandAll', { levels: 100, silent: true })
      })
      return tree
    }
  }

  GenModalSTRING.DEFAULT = {
    constructor: GenModalSTRING,
    valType: 'STRINGModal'
  }

  GenModalCONTAINSSTR.DEFAULT = {
    constructor: GenModalCONTAINSSTR,
    valType: 'CONTAINSSTRModal'
  }

  GenModalTEMPEXTENT.DEFAULT = {
    constructor: GenModalTEMPEXTENT,
    valType: 'TEMPEXTENTModal',
    temporal: true
  }

  GenModalSCALERANGE.DEFAULT = {
    constructor: GenModalSCALERANGE,
    valType: 'SCALERANGEModal',
    hasMinMax: true
  }

  GenModalBOX.DEFAULT = {
    constructor: GenModalBOX,
    valType: 'BOXModal',
  }

  GenModalDBLSTRING.DEFAULT = {
    constructor: GenModalDBLSTRING,
    valType: 'DBLSTRINGModal',
    doubleSelects: true
  }

  GenModalBase.Containers = {
    STRINGModal: (me) => {
      let html = ''

      if (me.$options.buttonsCRUD.reduce((acc, cur) => acc || cur.id === 'add' || cur.id === 'edit', false)) {
        const options = $.extend({}, me.$options.opts, { options: Object.keys(me.$options.opts.options).map(cur => { return { value: cur, label: me.$options.opts.options[cur] } }) })
        html += GenTG.addVSTRING({ preElements: GenTG.addCondition({ conditions: [{ value: 'AND', label: 'All' }, { value: 'OR', label: 'Any' }] }), options })
        $(document).off('click', '#add-condition-record').on('click', '#add-condition-record', e => {
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          GenModalBase.Containers.actions.addConditionRecord(me)
        })
        $(document).off('click', '#add-value-record').on('click', '#add-value-record', e => {
          const val = $('#add-value-input').val()
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          if (!val || val.trim() === '') { return notifyUser('Please pick a value from the input', 'danger', 'glyphicon glyphicon-remove') }
          $('#add-value-input').val('')
          GenModalBase.Containers.actions.addValueRecord(me, { val: me.$options.opts.options[val], id: val })
        })
        GenModalBase.Containers.actions.addCloseAddCont()
      }
      return html
    },
    CONTAINSSTRModal: (me) => {
      let html = ''

      if (me.$options.buttonsCRUD.reduce((acc, cur) => acc || cur.id === 'add' || cur.id === 'edit', false)) {
        html += GenTG.addVCONTAINSSTR({ preElements: GenTG.addCondition({ conditions: [{ value: 'AND', label: 'All' }, { value: 'OR', label: 'Any' }] }), options: me.$options.opts })
        $(document).off('click', '#add-condition-record').on('click', '#add-condition-record', e => {
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          GenModalBase.Containers.actions.addConditionRecord(me)
        })
        $(document).off('click', '#add-value-record').on('click', '#add-value-record', e => {
          const val = $('#add-value-input').val()
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          if (!val || val.trim() === '') { return notifyUser('Please insert some value in the input', 'danger', 'glyphicon glyphicon-remove') }
          $('#add-value-input').val('')
          GenModalBase.Containers.actions.addValueRecord(me, val)
        })
        GenModalBase.Containers.actions.addCloseAddCont()
      }
      return html
    },
    TEMPEXTENTModal: (me) => {
      let html = ''

      if (me.$options.buttonsCRUD.reduce((acc, cur) => acc || cur.id === 'add' || cur.id === 'edit', false)) {
        html += GenTG.addVTEMPEXTENT({ preElements: GenTG.addCondition({ conditions: [{ value: 'AND', label: 'All' }] }), name: me.$options.opts.name })
        $(document).off('click', '#add-condition-record').on('click', '#add-condition-record', e => {
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          GenModalBase.Containers.actions.addConditionRecord(me, true)
        })
        $(document).off('click', '#add-value-record').on('click', '#add-value-record', e => {
          const inputs = $('.date-picker-input-tuple .date-picker-input input')
          const val = [$(inputs[0]).val(), $(inputs[1]).val()]
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          if (val[0].trim() === '' || val[1].trim() === '') { return notifyUser('Please pick a time period on the inputs', 'danger', 'glyphicon glyphicon-remove') }
          if (new Date(val[1]) < new Date(val[0])) { return notifyUser('The ending date must be after the beginning date', 'danger', 'glyphicon glyphicon-remove') }
          if (selected.nodeId === 0) { return notifyUser('You can\'t insert a value on the first node. Please insert a condition first.', 'danger', 'glyphicon glyphicon-remove') }
          inputs.val('')
          GenModalBase.Containers.actions.addValueRecord(me, val)
        })
        GenModalBase.Containers.actions.addCloseAddCont()
      }
      return html
    },
    BOXModal: (me) => {
      let html = ''
      if (me.$options.buttonsCRUD.reduce((acc, cur) => acc || cur.id === 'add' || cur.id === 'edit', false)) {
        html += GenTG.addVBOX({ preElements: GenTG.addCondition({ conditions: [{ value: 'AND', label: 'All' }] }), name: me.$options.opts.name })
        let map
        let pLayer = undefined
        const clearPLayer = (on) => {
          if (pLayer) {
            map.removeLayer(pLayer)
            pLayer = undefined
          }
          if (on) {
            new L.Draw.Rectangle(map).enable()
          }
        }
        const drawPLayer = () => {
          clearPLayer()
          let val = $('#add-value-input').val().replace(/\[|]/gi, '').split(', ')
          if (!val || val.length !== 4) { // then the format is wrong
            $('#pick-map-modal').modal('toggle') // prevent modal from opening
            return
          } else {
            pLayer = L.rectangle([[val[2], val[0]], [val[3], val[1]]])
            pLayer.editing.enable()
            map.addLayer(pLayer)
            map.fitBounds(pLayer.getBounds())
          }
        }
        $(document).off('click', '.clear-map').on('click', '.clear-map', e => {
          clearPLayer()
        })
        $(document).off('click', '.draw-shape-btn').on('click', '.draw-shape-btn', e => {
          clearPLayer(true)
        })
        $(document).off('click', '.open-map-btn').on('click', '.open-map-btn', e => {
          $('#pick-map-modal')
            .on('shown.bs.modal', e => {
              if (!$('#location-picker').hasClass('leaflet-container')) {
                map = new L.Map('location-picker', {
                }).locate({ setView: true, maxZoom: 16 })
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                  continuousWorld: false, // this map option disables world wrapping. by default, it is false
                  noWrap: true // this option disables loading tiles outside of the world bounds
                }).addTo(map)
                map.on('draw:drawstop', function (e) {
                  if (!pLayer) {
                    clearPLayer(true)
                  }
                })
                map.on('draw:created', function (e) {
                  const layer = e.layer
                  layer.editing.enable()
                  layer.addTo(map)
                  pLayer = layer
                })
              }
              clearPLayer()
              if ($('.operation-label').data().operationType === 'edit') { // if it is an update action
                if (map._loaded) {
                  drawPLayer()
                } else {
                  map.on('load', function (e) {
                    drawPLayer()
                  })
                }
              }
            })
        })
        $(document).off('click', '.confirm-location-picker').on('click', '.confirm-location-picker', e => {
          if (pLayer === undefined) { return }
          const { _northEast, _southWest } = pLayer._bounds
          const bounds = [
            _southWest.lng < -180 ? -180 : _southWest.lng,
            _northEast.lng > 180 ? 180 : _northEast.lng,
            _southWest.lat < -90 ? -90 : _southWest.lat,
            _northEast.lat > 90 ? 90 : _northEast.lat
          ]
          $('#add-value-input').val(`[${bounds.join(', ')}]`)
          $('#pick-map-modal').modal('toggle')
        })
        $(document).off('click', '#add-condition-record').on('click', '#add-condition-record', e => {
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          GenModalBase.Containers.actions.addConditionRecord(me, true)
        })
        $(document).off('click', '#add-value-record').on('click', '#add-value-record', e => {
          const val = $('#add-value-input').val().replace(/\[|\]/gi, '').split(', ')
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (!val || val.length !== 4) { return notifyUser('Please pick or insert a set o coordinates', 'danger', 'glyphicon glyphicon-remove') }
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          if (selected.nodeId === 0) { return notifyUser('You can\'t insert a value on the first node. Please insert a condition first.', 'danger', 'glyphicon glyphicon-remove') }
          $('#add-value-input').val('')
          GenModalBase.Containers.actions.addValueRecord(me, val)
        })
        GenModalBase.Containers.actions.addCloseAddCont()
      }
      return html
    },
    DBLSTRINGModal: (me) => {
      let html = ''

      if (me.$options.buttonsCRUD.reduce((acc, cur) => acc || cur.id === 'add' || cur.id === 'edit', false)) {
        const options = $.extend({}, me.$options.opts, { options: me.$options.opts.options.map(arr => Object.keys(arr).map(cur => { return { value: cur, label: arr[cur] } })) })
        html += GenTG.addVDBLSTRING({ preElements: GenTG.addCondition({ conditions: [{ value: 'AND', label: 'All' }, { value: 'OR', label: 'Any' }] }), options })
        $(document).off('click', '#add-condition-record').on('click', '#add-condition-record', e => {
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          GenModalBase.Containers.actions.addConditionRecord(me)
        })
        $(document).off('click', '#add-value-record').on('click', '#add-value-record', e => {
          const valL = $('#add-value-input-left').val()
          const valR = $('#add-value-input-right').val()
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (valL === null || valR === null) { return notifyUser('Please pick a value of each input', 'danger', 'glyphicon glyphicon-remove') }
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          $('#add-value-input-left').val('')
          $('#add-value-input-right').val('')
          GenModalBase.Containers.actions.addValueRecord(me, [valL, valR])
        })
        GenModalBase.Containers.actions.addCloseAddCont()
      }
      return html
    },
    SCALERANGEModal: (me) => {
      const types = me.$options.opts.types.reduce((acc, cur) => {
        acc[cur.value] = cur
        return acc
      }, [])
      let html = ''
      if (me.$options.buttonsCRUD.reduce((acc, cur) => acc || cur.id === 'add' || cur.id === 'edit', false)) {
        const options = $.extend({}, me.$options.opts, { selectSrc: Object.keys(me.$options.opts.selectSrc).map(cur => { return { value: cur, label: me.$options.opts.selectSrc[cur] } }) })
        html += GenTG.addVSCALE({ preElements: GenTG.addCondition({ conditions: [{ value: 'AND', label: 'All' }, { value: 'OR', label: 'Any' }] }), options, default: me.$options.opts.types[0] })
        $(document).off('change', '#input-select').on('change', '#input-select', e => {
          const type = types[$('#input-select').val()]
          $('label[for="input-min"]').html(type.labels.min)
          $('label[for="input-max"]').html(type.labels.max)
          $('#units-select').val('').prop('disabled', !type.hasSelect)
        })
        $(document).off('click', '#add-condition-record').on('click', '#add-condition-record', e => {
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          GenModalBase.Containers.actions.addConditionRecord(me)
        })
        $(document).off('click', '#add-value-record').on('click', '#add-value-record', e => {
          const type = $('#input-select').val()
          const min = $('#input-min').val()
          const max = $('#input-max').val()
          const units = types[type].hasSelect ? $('#units-select').val() : null
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (selected === undefined) { return notifyUser('Please select a node', 'danger', 'glyphicon glyphicon-remove') }
          if (min === '' || max === '' || types[type].hasSelect && units === null) { return notifyUser('Please fill all the inputs', 'danger', 'glyphicon glyphicon-remove') }
          if (+min > +max) { return notifyUser('The \'max value\' must be bigger than the \'min value\'', 'danger', 'glyphicon glyphicon-remove') }
          $('#input-min').val('')
          $('#input-max').val('')
          $('#units-select').val('')
          GenModalBase.Containers.actions.addValueRecord(me, { type, min, max, units })
        })
        GenModalBase.Containers.actions.addCloseAddCont()
      }
      return html
    },
    actions: {
      addConditionRecord: (me, limitLevel) => {
        const val = $('#condition-select').val()
        if (!val) { return notifyUser('Please pick a condition value', 'danger', 'glyphicon glyphicon-remove') }
        const isUpdate = $('.operation-label').data().operationType === 'edit'

        if (limitLevel) {
          const selected = $('#new-eqi-tree').treeview('getSelected')[0]
          if (isUpdate && selected.nodeId === 0 || !isUpdate && selected.head && selected.nodeId !== 0) { return }
        }
        me.$options.btnCallback({ id: 'addValue', val, head: true, isUpdate })
        if (isUpdate) { $('.modal-add-container').addClass('hidden') }
      },
      addCloseAddCont: () => {
        $(document).off('click', '#close-add-container').on('click', '#close-add-container', e => {
          $('.modal-add-container').addClass('hidden')
        })
      },
      addValueRecord: (me, val) => {
        const isUpdate = $('.operation-label').data().operationType === 'edit'
        me.$options.btnCallback({ id: 'addValue', val, head: false, isUpdate, nodeId: (isUpdate ? $('.operation-label').data().nodeId : null) })
        if (isUpdate) { $('.modal-add-container').addClass('hidden') }
      }
    }
  }

  function GenModalBOX(options) {
    GenModalBase.construct(this, options)
  }

  GenModalBOX.prototype = $.extend({}, GenModalBase, GenModalBOX.DEFAULT, {
    _init: function () {
      GenModalBase.init(this)
    }
  })

  function GenModalSCALERANGE(options) {
    GenModalBase.construct(this, options)
  }

  GenModalSCALERANGE.prototype = $.extend({}, GenModalBase, GenModalSCALERANGE.DEFAULT, {
    _init: function () {
      GenModalBase.init(this)
    }
  })

  function GenModalTEMPEXTENT(options) {
    GenModalBase.construct(this, options)
  }

  GenModalTEMPEXTENT.prototype = $.extend({}, GenModalBase, GenModalTEMPEXTENT.DEFAULT, {
    _init: function () {
      GenModalBase.init(this)
    }
  })

  function GenModalSTRING(options) {
    GenModalBase.construct(this, options)
  }

  GenModalSTRING.prototype = $.extend({}, GenModalBase, GenModalSTRING.DEFAULT, {
    _init: function () {
      GenModalBase.init(this)
    }
  })

  function GenModalCONTAINSSTR(options) {
    GenModalBase.construct(this, options)
  }

  GenModalCONTAINSSTR.prototype = $.extend({}, GenModalBase, GenModalCONTAINSSTR.DEFAULT, {
    _init: function () {
      GenModalBase.init(this)
    }
  })

  function GenModalDBLSTRING(options) {
    GenModalBase.construct(this, options)
  }

  GenModalDBLSTRING.prototype = $.extend({}, GenModalBase, GenModalDBLSTRING.DEFAULT, {
    _init: function () {
      GenModalBase.init(this)
    }
  })

  function notifyUser(message, type, icon) {
    $.notify(
      {
        message,
        icon
      }, {
        type: `${type} bring-to-front-alert`,
        delay: 3000,
        allow_dismiss: false,
        placement: { from: 'bottom', align: 'right' },
        newest_on_top: true,
        animate: {
          enter: 'animated bounceInUp',
          exit: 'animated bounceOutDown'
        }
      })
  }
})()
