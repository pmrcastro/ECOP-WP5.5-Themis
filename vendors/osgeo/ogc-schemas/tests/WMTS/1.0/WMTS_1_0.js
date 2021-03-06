var Jsonix = require('jsonix').Jsonix;
var XLink_1_0 = require('w3c-schemas').XLink_1_0;
var OWS_1_1_0 = require('../../../ogc-schemas').OWS_1_1_0;
var GML_3_1_1 = require('../../../ogc-schemas').GML_3_1_1;
var SMIL_2_0 = require('../../../ogc-schemas').SMIL_2_0;
var SMIL_2_0_Language = require('../../../ogc-schemas').SMIL_2_0_Language;
var WMTS_1_0 = require('../../../ogc-schemas').WMTS_1_0;

var roundtrips = require('../../roundtrip').roundtrips;
var mappings = [XLink_1_0, OWS_1_1_0, GML_3_1_1, SMIL_2_0, SMIL_2_0_Language, WMTS_1_0];

module.exports = {
	"Context": function(test) {
		var context = new Jsonix.Context(mappings);
		test.done();
        },
	"Roundtrips" : roundtrips(mappings, __dirname)
};
