var CityGML_Generics_2_0_Module_Factory = function () {
  var CityGML_Generics_2_0 = {
    n: 'CityGML_Generics_2_0',
    dens: 'http:\/\/www.opengis.net\/citygml\/generics\/2.0',
    deps: ['CityGML_2_0', 'GML_3_1_1'],
    tis: [{
        ln: 'DateAttributeType',
        bti: '.AbstractGenericAttributeType',
        ps: [{
            n: 'value',
            rq: true,
            ti: 'Calendar'
          }]
      }, {
        ln: 'GenericAttributeSetType',
        bti: '.AbstractGenericAttributeType',
        ps: [{
            n: 'genericAttribute',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: '_genericAttribute',
            ti: '.AbstractGenericAttributeType',
            t: 'er'
          }, {
            n: 'codeSpace',
            an: {
              lp: 'codeSpace'
            },
            t: 'a'
          }]
      }, {
        ln: 'UriAttributeType',
        bti: '.AbstractGenericAttributeType',
        ps: [{
            n: 'value',
            rq: true
          }]
      }, {
        ln: 'GenericCityObjectType',
        bti: 'CityGML_2_0.AbstractCityObjectType',
        ps: [{
            n: 'clazz',
            en: 'class',
            ti: 'GML_3_1_1.CodeType'
          }, {
            n: 'function',
            mno: 0,
            col: true,
            ti: 'GML_3_1_1.CodeType'
          }, {
            n: 'usage',
            mno: 0,
            col: true,
            ti: 'GML_3_1_1.CodeType'
          }, {
            n: 'lod0Geometry',
            ti: 'GML_3_1_1.GeometryPropertyType'
          }, {
            n: 'lod1Geometry',
            ti: 'GML_3_1_1.GeometryPropertyType'
          }, {
            n: 'lod2Geometry',
            ti: 'GML_3_1_1.GeometryPropertyType'
          }, {
            n: 'lod3Geometry',
            ti: 'GML_3_1_1.GeometryPropertyType'
          }, {
            n: 'lod4Geometry',
            ti: 'GML_3_1_1.GeometryPropertyType'
          }, {
            n: 'lod0TerrainIntersection',
            ti: 'GML_3_1_1.MultiCurvePropertyType'
          }, {
            n: 'lod1TerrainIntersection',
            ti: 'GML_3_1_1.MultiCurvePropertyType'
          }, {
            n: 'lod2TerrainIntersection',
            ti: 'GML_3_1_1.MultiCurvePropertyType'
          }, {
            n: 'lod3TerrainIntersection',
            ti: 'GML_3_1_1.MultiCurvePropertyType'
          }, {
            n: 'lod4TerrainIntersection',
            ti: 'GML_3_1_1.MultiCurvePropertyType'
          }, {
            n: 'lod0ImplicitRepresentation',
            ti: 'CityGML_2_0.ImplicitRepresentationPropertyType'
          }, {
            n: 'lod1ImplicitRepresentation',
            ti: 'CityGML_2_0.ImplicitRepresentationPropertyType'
          }, {
            n: 'lod2ImplicitRepresentation',
            ti: 'CityGML_2_0.ImplicitRepresentationPropertyType'
          }, {
            n: 'lod3ImplicitRepresentation',
            ti: 'CityGML_2_0.ImplicitRepresentationPropertyType'
          }, {
            n: 'lod4ImplicitRepresentation',
            ti: 'CityGML_2_0.ImplicitRepresentationPropertyType'
          }]
      }, {
        ln: 'DoubleAttributeType',
        bti: '.AbstractGenericAttributeType',
        ps: [{
            n: 'value',
            rq: true,
            ti: 'Double'
          }]
      }, {
        ln: 'StringAttributeType',
        bti: '.AbstractGenericAttributeType',
        ps: [{
            n: 'value',
            rq: true
          }]
      }, {
        ln: 'MeasureAttributeType',
        bti: '.AbstractGenericAttributeType',
        ps: [{
            n: 'value',
            rq: true,
            ti: 'GML_3_1_1.MeasureType'
          }]
      }, {
        ln: 'IntAttributeType',
        bti: '.AbstractGenericAttributeType',
        ps: [{
            n: 'value',
            rq: true,
            ti: 'Integer'
          }]
      }, {
        ln: 'AbstractGenericAttributeType',
        ps: [{
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }],
    eis: [{
        en: 'uriAttribute',
        ti: '.UriAttributeType',
        sh: '_genericAttribute'
      }, {
        en: 'intAttribute',
        ti: '.IntAttributeType',
        sh: '_genericAttribute'
      }, {
        en: 'dateAttribute',
        ti: '.DateAttributeType',
        sh: '_genericAttribute'
      }, {
        en: 'measureAttribute',
        ti: '.MeasureAttributeType',
        sh: '_genericAttribute'
      }, {
        en: 'stringAttribute',
        ti: '.StringAttributeType',
        sh: '_genericAttribute'
      }, {
        en: 'genericAttributeSet',
        ti: '.GenericAttributeSetType',
        sh: '_genericAttribute'
      }, {
        en: 'GenericCityObject',
        ti: '.GenericCityObjectType',
        sh: {
          lp: '_CityObject',
          ns: 'http:\/\/www.opengis.net\/citygml\/2.0'
        }
      }, {
        en: 'doubleAttribute',
        ti: '.DoubleAttributeType',
        sh: '_genericAttribute'
      }, {
        en: '_genericAttribute',
        ti: '.AbstractGenericAttributeType',
        sh: {
          lp: '_GenericApplicationPropertyOfCityObject',
          ns: 'http:\/\/www.opengis.net\/citygml\/2.0'
        }
      }]
  };
  return {
    CityGML_Generics_2_0: CityGML_Generics_2_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], CityGML_Generics_2_0_Module_Factory);
}
else {
  var CityGML_Generics_2_0_Module = CityGML_Generics_2_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.CityGML_Generics_2_0 = CityGML_Generics_2_0_Module.CityGML_Generics_2_0;
  }
  else {
    var CityGML_Generics_2_0 = CityGML_Generics_2_0_Module.CityGML_Generics_2_0;
  }
}