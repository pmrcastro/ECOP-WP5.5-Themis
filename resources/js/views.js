const TestEval = {
  reportDS: '<hr><h3>QI: <span>{{=it.qi.name}}</span></h3> <h4>Summary</h4> <table class="table table-hover qi-summary"> <tbody> <tr> <td>Name</td> <td>{{=it.qi.name}}</td> </tr> <tr> <td>Type</td> <td>{{=it.qi.type}}</td> </tr> <tr> <td>Tag</td> <td>{{=it.qi.tag}}</td> </tr> <tr> <td>Fields</td> <td>{{=it.qi.field}}</td> </tr> </tbody> </table> <h4>Data</h4> <table class="table table-hover"> <thead> <tr> {{~it.values.captions :value:index}} <th>{{=value}}</th> {{~}} </tr> </thead> <tbody> {{~it.values.rows :value:index}} <tr> {{~value :v:i}} <td>{{=v}}</td> {{~}} </tr> {{~}} </tbody> </table>',
  reportResult: '<table class="table table-hover"> <thead> <tr> <th>QI</th> <th>Result</th> </tr> </thead> <tbody> {{~it.result :value:index}} <tr> <td>{{=value.qi}}</td> <td>{{=value.result}}</td> </tr> {{~}} </tbody> </table><hr>'
}

const Portal = {
  floatingButtons: '<input id="uploadDataA" type="file" class="sendToback" /><a id="downloadDataA" download="ecop_status.txt" class="sendToback"/><div class="float-add-btn ui-widget-content ui-draggable" data-toggle="modal" data-target="#new-tc-modal"><span class="glyphicon gi-xlarge glyphicon-plus add-tc" aria-hidden="true" data-toggle="tooltip" title="Add tematic category"></span></div> <ul class="mfb-component--br mfb-zoomin big-main-menu" data-mfb-toggle="hover"> <li class="mfb-component__wrap"> <div class="mfb-component__button--main"> <i class="mfb-component__main-icon--resting glyphicon glyphicon-option-horizontal"></i> <i class="mfb-component__main-icon--active glyphicon glyphicon-option-vertical"></i> </div> <ul class="mfb-component__list big-main-menu-options"> <li data-action="save"> <div data-mfb-label="Save current status" class="mfb-component__button--child"> <i class="mfb-component__child-icon glyphicon glyphicon-floppy-disk"></i> </div> </li> <li data-action="clear-localstorage"> <div data-mfb-label="Clear saved status" class="mfb-component__button--child"> <i class="mfb-component__child-icon glyphicon glyphicon-trash"></i> </div> </li> <li data-action="download-file"> <div data-mfb-label="Download current status" class="mfb-component__button--child"> <i class="mfb-component__child-icon glyphicon glyphicon-save"> </i> </div> </li> <li data-action="upload-file"> <div data-mfb-label="Upload status" class="mfb-component__button--child"> <i class="mfb-component__child-icon glyphicon glyphicon-open"></i> </div> </li> <li data-action="setup-datasets-sources"> <div data-mfb-label="Setup datasets sources" class="mfb-component__button--child"> <i class="mfb-component__child-icon glyphicon glyphicon-cog"></i> </div> </li> <li data-action="run-evaluation"> <div data-mfb-label="Run evaluation" class="mfb-component__button--child"> <i class="mfb-component__child-icon glyphicon glyphicon-play"></i> </div> </li> </ul> </li> </ul>',
  modalAddTC: '<div data-backdrop="static" data-keyboard="false" class="modal fade" id="new-tc-modal" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close tc-hidder-group" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Add tematic categories</h4> </div> <div class="modal-body"> <select multiple="" id="select-add-tc" data-placeholder="Pick your tematic categories"></select> </div> <div class="modal-footer"> <button type="button" class="btn btn-default btn-cleaned tc-hidder-group" data-dismiss="modal">Cancel</button> <button type="button" class="btn btn-success conf-add-tc-btn btn-cleaned btn-pop">Add</button> </div> </div> </div> </div>',
  modalCopyFrom: '<div class="modal fade" id="copy-from-modal" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Copy expected values from</h4> </div> <div class="modal-body"> <select id="select-copy-from" data-placeholder="Pick your tematic category" style="width:100%;"></select> </div> <div class="modal-footer"> <button type="button" class="btn btn-default btn-cleaned" data-dismiss="modal">Cancel</button> <button type="button" class="btn btn-success conf-copy-from-btn btn-cleaned btn-pop">Copy</button> </div> </div> </div> </div>',
  modalSetupDTSRC: '<div class="modal fade" data-backdrop="static" data-keyboard="false" id="setup-dt-sources-modal" tabindex="-1" role="dialog"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Setup datasets sources</h4> </div> <div class="modal-body"> <div class="sources-tools"> <button class="btn btn-md btn-link btn-green btn-cleaned" id="add-row"><span class="glyphicon glyphicon-plus"></span> Add</button> <button class="btn btn-md btn-link btn-orange btn-cleaned" id="copy-row"><span class="glyphicon glyphicon-duplicate"></span> Duplicate</button> <button class="btn btn-md btn-link btn-red btn-cleaned" id="del-row"><span class="glyphicon glyphicon-minus"></span> Remove</button> <button class="btn btn-md btn-link btn-cleaned" id="clear"><span class="glyphicon glyphicon-trash"></span> Clear all</button> </div> <div id="data-src-table"></div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default btn-cleaned" data-dismiss="modal">Cancel</button> <button type="button" class="btn btn-success" id="save-btn">Save</button> </div> </div> </div> </div>',
  colParent: '<div class="tcs-manager">{{=it.title}}<span class="glyphicon glyphicon-plus add-tc" aria-hidden="true"></span></div>',
  colDescription: '<textarea type="text" class="form-control qi-description-input" data-col="{{=it.col}}" placeholder="TC\'s description">{{? it.val}}{{=it.val}}{{?}}</textarea>',
  colChild: '<div class="tcs-manager" data-toggle="tooltip" title="{{=it.title}}">{{=it.name}}<span class="glyphicon glyphicon-remove remove-column-btn" id="{{=it.name}}" aria-hidden="true"></span></div>',
  initialCell: '<div class="table-editor-cell add-qi-area" data-col="{{=it.col}}" data-row="{{=it.row}}" id="{{=it.col}}_{{=it.row}}"> <div class="cell-editor-ic add-qi-area"><span class="glyphicon glyphicon-plus gi-xlarge add-qi-area"></span></div><div class="cell-preview hidden"><span></span></div> <div class="cell-editor-tools hidden"> <ul class="mfb-component--bl mfb-zoomin float-cell-menu" data-mfb-toggle="hover"> <li class="mfb-component__wrap"> <div class="mfb-component__button--main float-cell-menu-main"> <span class="mfb-component__main-icon--resting glyphicon glyphicon-menu-hamburger"></span> <span class="mfb-component__main-icon--active glyphicon glyphicon-menu-hamburger"></span> </div> <ul class="mfb-component__list" data-col="{{=it.col}}" data-row="{{=it.row}}"><li class="cell-tool-delete-tc"> <div class="mfb-component__button--child"> <div class="mfb-component__child-icon glyphicon glyphicon-minus"></div> </div> </li> <li class="cell-tool-edit-tc"> <div class="mfb-component__button--child"> <div class="mfb-component__child-icon glyphicon glyphicon-pencil"></div> </div> </li> <li class="cell-tool-copy-tc"> <div class="mfb-component__button--child"> <div class="mfb-component__child-icon glyphicon glyphicon-duplicate"></div> </div> </li> </ul> </li> </ul> </div>',
  addTCSelect: '{{~it :value:index}}<option value="{{=value.code}}">{{=value.name}}</option>{{~}}',
  modalShowEvalResult: '<div data-backdrop="static" data-keyboard="false" class="modal fade" id="showEvalResModal" tabindex="-1" role="dialog" aria-labelledby="showEvalResModalLabel"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title" id="showEvalResModalLabel">Result</h4> </div> <div class="modal-body"> <div class="form-inline result-modal-radio"> </div> <div id="result-elements-container"> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default btn-cleaned" data-dismiss="modal">Close</button> </div> </div> </div> </div>',
  resultContentTable: '<div class="content-table-container"><label>{{=it.title}}</label> <span class="glyphicon glyphicon-question-sign result-table-info" aria-hidden="true"></span><div class="content-table"></div></div>',
  resultContentTableTooltip: '<div class="result-caption-tooltip"> <label>Caption</label> <ul class="list-group"> <li class="list-group-item"> <span class="glyphicon glyphicon-ok btn-green gi-large"></span> Conformant </li> <li class="list-group-item"> <span class="glyphicon glyphicon-alert btn-orange gi-large"></span> Non-conformant (non-critical factor) </li> <li class="list-group-item"> <span class="glyphicon glyphicon-remove btn-red gi-large"></span> Non-conformant (critical factor) </li> </ul> </div>',
  datasetView: '<div id="dataset-view-modal" data-backdrop="static" data-keyboard="false" class="modal fade in" tabindex="-1" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title"><b>{{= it.title }}</b></h4> </div> <div class="modal-body"> <div id="metadata-body-container"> {{~ it.sections :section}} <div class="row"> <div class="col-sm-12"> <div class="thumbnail"> <div class="caption"> <div class="title">{{= section.title}}</div> <ul> {{~section.items :item}} <li><strong>{{= item.title}}:</strong> {{~ item.values :arr:arri}}{{~ arr :val:vi}}{{= val }}{{? arr.length != vi + 1 }}{{= item.splitter }}{{?}}{{~}}{{? item.values.length != arri + 1 }}{{= item.outSplitter }}{{?}}{{~}} </li> {{~}} </ul> </div> </div> </div> </div> {{~}} </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default btn-cleaned" data-dismiss="modal">Close</button> </div> </div> </div>',
  datasetViewGeo: '<div class="row"> <div class="col-sm-12"> <div class="thumbnail"> <div class="caption"> <div class="title">{{= it.title}}</div> <ul id="{{= it.listId }}"> </ul> </div> </div> </div> </div>'
}

const GenT = {
  parentModal: '<div data-backdrop="static" data-keyboard="false" class="modal parent-modal fade {{=it.modalClass}}" tabindex="-1" role="dialog"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">{{=it.modalTitle}}</h4> </div> <div class="modal-body"><div class="{{=it.modalClass}}-data"></div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default btn-cleaned" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-success close-modal-persist btn-cleaned btn-pop" data-dismiss="modal">Save</button></div> </div> </div> </div>',
  headerBtnModal: '<button class="{{=it.class}}"><span class="{{=it.icon}}"></span> {{=it.label}}</button>',
  headerBtnsParentModal: '<div data-backdrop="static" data-keyboard="false" class="{{=it.modalClass}}-header btns-tree">{{=it.buttonsEle}}</div>',
  addCondition: '<div class="new-condition-form"> <h5><span class="operation-label">Add</span> condition</h5> <div class="form-inline form-group"> <div class="col-sm-8"> <select class="form-control" id="condition-select" style="width:100%;"> <option value="NA" selected disabled>Select a condition type</option> {{~it.conditions :value:index}} <option value="{{= value.value}}">{{= value.label}}</option> {{~}}</select> </div> <button class="btn btn-success" id="add-condition-record"><span class="operation-label">Add</span></button> </div> </div>',
  addVSTRING: '<div data-backdrop="static" data-keyboard="false" class="modal-add-container box-border hidden"> <button class="close" id="close-add-container"> <span aria-hidden="true">&times;</span> </button> {{= it.preElements}}  <hr class="new-condition-form new-value"> <div class="new-value"> <h5><span class="operation-label">Add</span> {{=it.options.name}}</h5> <div class="form-inline form-group"> <div class="col-sm-8"> <select type="text" class="form-control col-sm-8" style="width:100%;" id="add-value-input"><option value="" selected disabled>Pick the new value</option>{{~it.options.options :value:index}} <option value="{{= value.value}}">{{= value.label}}</option> {{~}}</select> </div> <button class="btn btn-success" id="add-value-record"><span class="operation-label">Add</span></button> </div> </div> </div>',
  addVDBLSTRING: '<div data-backdrop="static" data-keyboard="false" class="modal-add-container box-border hidden"> <button class="close" id="close-add-container"> <span aria-hidden="true">&times;</span> </button> {{= it.preElements}}  <hr class="new-condition-form new-value"> <div class="new-value"> <h5><div class="col-sm-4"><span class="operation-label">Add</span> {{=it.options.name[0]}}</div><div class="col-sm-8" style="padding-left:1%;"><span class="operation-label">Add</span> {{=it.options.name[1]}}</div></h5> <div class="form-inline form-group"> <div class="col-sm-8"> <select type="text" class="form-control col-sm-4" style="width:49%;" id="add-value-input-left"><option value="" selected disabled>Pick the new value</option>{{~it.options.options[0]:value:index}} <option value="{{= value.value}}">{{= value.label}}</option> {{~}}</select> <select type="text" class="form-control col-sm-4" style="width:49%;margin-left:2%;" id="add-value-input-right"><option value="" selected disabled>Pick the new value</option>{{~it.options.options[1] :value:index}} <option value="{{= value.value}}">{{= value.label}}</option> {{~}}</select></div> <button class="btn btn-success" id="add-value-record"><span class="operation-label">Add</span></button> </div> </div> </div>',
  addVCONTAINSSTR: '<div data-backdrop="static" data-keyboard="false" class="modal-add-container box-border hidden"> <button class="close" id="close-add-container"> <span aria-hidden="true">&times;</span> </button> {{= it.preElements}}  <hr class="new-condition-form new-value"> <div class="new-value"> <h5><span class="operation-label">Add</span> {{=it.options.name}}</h5> <div class="form-inline form-group"> <div class="col-sm-8"> <input type="text" class="form-control col-sm-8" style="width:100%;" id="add-value-input"" placeholder="Insert a value or regular expression /Regex/"> </div> <button class="btn btn-success" id="add-value-record"><span class="operation-label">Add</span></button> </div> </div> </div>',
  addVTEMPEXTENT: '<div data-backdrop="static" data-keyboard="false" class="modal-add-container box-border hidden"> <button class="close" id="close-add-container"> <span aria-hidden="true">&times;</span> </button> {{= it.preElements}}  <hr class="new-condition-form new-value"> <div class="new-value"> <h5><span class="operation-label">Add</span> {{=it.name}}</h5> <div class="form-inline form-group"> <div class="col-sm-8 date-picker-input-tuple"> <div class="date-picker-input"><input type="text" readonly placeholder="Beginning date" class="form-control"></div> <div class="date-picker-input"><input type="text" readonly placeholder="Ending date" class="form-control"></div> </div> <button class="btn btn-success" id="add-value-record"><span class="operation-label">Add</span></button> </div> </div> </div>',
  addVSCALE: '<div data-backdrop="static" data-keyboard="false" class="modal-add-container box-border hidden"> <button class="close" id="close-add-container"> <span aria-hidden="true">&times;</span> </button> {{= it.preElements}} <hr class="new-condition-form new-value"> <div class="new-value"> <h5><span class="operation-label">Add</span> {{=it.options.name}}</h5> <div class="form-horizontal"> <div class="form-group"> <label for="input-select" class="col-sm-3 control-label">Type</label> <div class="col-sm-5"> <select id="input-select" class="form-control"> {{~it.options.types :value:index}} <option value="{{=value.value}}">{{=value.name}}</option> {{~}} </select> </div> </div> <div class="form-group"> <label for="input-min" class="col-sm-3 control-label">{{=it.default.labels.min}}</label> <div class="col-sm-5"> <input type="number" min="0" class="form-control" id="input-min" placeholder="Insert the value..."> </div> </div> <div class="form-group"> <label for="input-max" class="col-sm-3 control-label">{{=it.default.labels.max}}</label> <div class="col-sm-5"> <input type="number" min="0" class="form-control" id="input-max" placeholder="Insert the value..."> </div> </div> <div class="form-group"> <label for="units-select" class="col-sm-3 control-label">Units of measure</label> <div class="col-sm-5"> <select id="units-select" class="form-control" {{? it.default.hasSelect === false}}disabled{{?}}><option value="" selected disabled>Pick the new value</option>{{~it.options.selectSrc :value:index}} <option value="{{=value.value}}">{{=value.label}}</option> {{~}}</select> </div> </div> <div class="form-group"> <div class="col-sm-2 col-sm-offset-5"> <button class="btn btn-success form-control btn-cleaned btn-pop" id="add-value-record"><span class="operation-label">Add</span></button> </div> </div></div> </div> </div>',
  addVBOX: '<div data-backdrop="static" data-keyboard="false" class="modal-add-container box-border hidden"> <button class="close"> <span aria-hidden="true">&times;</span> </button> {{= it.preElements}}  <hr class="new-condition-form new-value"> <div class="new-value"> <h5><span class="operation-label">Add</span> {{=it.name}}</h5> <div class="form-inline form-group"> <div class="col-sm-8"> <input type="text" class="form-control col-sm-8" style="width:100%;" placeholder="[West Long, East Long, South Lat, North Lat]" id="add-value-input"> <button class="btn btn-link open-map-btn" data-target="#pick-map-modal" data-toggle="modal">Select from map</button> </div> </div> <button class="btn btn-success" id="add-value-record"><span class="operation-label">Add</span></button> </div> </div><div class="modal fade" id="pick-map-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-toggle="modal" data-target="#pick-map-modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Draw a rectangle in the map</h4> </div><div class="modal-body"> <div id="location-picker" style="width:100%;height:400px;"></div> </div> <div class="modal-footer"><button type="button" class="btn btn-warning on-left draw-shape-btn btn-cleaned" data->Draw</button><button type="button" class="btn btn-link on-left clear-map btn-cleaned" data->Clear</button><button type="button" class="btn btn-default btn-cleaned" data-toggle="modal" data-target="#pick-map-modal" data->Cancel</button> <button type="button" class="btn btn-success btn-cleaned confirm-location-picker btn-pop">Confirm</button> </div> </div> </div> </div>'
}

// ====== Generated templates ======
const TestEvalG = {
  reportDS: doT.template(TestEval.reportDS),
  reportResult: doT.template(TestEval.reportResult)
}

const PortalG = {
  floatingButtons: doT.template(Portal.floatingButtons),
  modalAddTC: doT.template(Portal.modalAddTC),
  modalCopyFrom: doT.template(Portal.modalCopyFrom),
  modalSetupDTSRC: doT.template(Portal.modalSetupDTSRC),
  colParent: doT.template(Portal.colParent),
  colDescription: doT.template(Portal.colDescription),
  colChild: doT.template(Portal.colChild),
  addTCSelect: doT.template(Portal.addTCSelect),
  initialCell: doT.template(Portal.initialCell),
  modalShowEvalResult: doT.template(Portal.modalShowEvalResult),
  resultContentTable: doT.template(Portal.resultContentTable),
  resultContentTableTooltip: doT.template(Portal.resultContentTableTooltip),
  datasetView: doT.template(Portal.datasetView),
  datasetViewGeo: doT.template(Portal.datasetViewGeo)
}

const GenTG = {
  parentModal: doT.template(GenT.parentModal),
  headerBtnModal: doT.template(GenT.headerBtnModal),
  headerBtnsParentModal: doT.template(GenT.headerBtnsParentModal),
  addCondition: doT.template(GenT.addCondition),
  addVSTRING: doT.template(GenT.addVSTRING),
  addVDBLSTRING: doT.template(GenT.addVDBLSTRING),
  addVCONTAINSSTR: doT.template(GenT.addVCONTAINSSTR),
  addVTEMPEXTENT: doT.template(GenT.addVTEMPEXTENT),
  addVSCALE: doT.template(GenT.addVSCALE),
  addVBOX: doT.template(GenT.addVBOX)
}