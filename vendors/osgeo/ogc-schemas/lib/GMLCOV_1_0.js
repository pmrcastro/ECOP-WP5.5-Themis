var GMLCOV_1_0_Module_Factory = function () {
  var GMLCOV_1_0 = {
    n: 'GMLCOV_1_0',
    dens: 'http:\/\/www.opengis.net\/gmlcov\/1.0',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    deps: ['XLink_1_0', 'GML_3_2_1', 'SWE_2_0'],
    tis: [{
        ln: 'AbstractReferenceableGridType',
        bti: 'GML_3_2_1.GridType'
      }, {
        ln: 'AbstractContinuousCoverageType',
        bti: '.AbstractCoverageType'
      }, {
        ln: 'ExtensionType',
        ps: [{
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }]
      }, {
        ln: 'ParameterValueType',
        bti: 'GML_3_2_1.AbstractGeneralParameterValueType',
        ps: [{
            n: 'value',
            rq: true,
            en: {
              lp: 'value',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: 'GML_3_2_1.MeasureType'
          }, {
            n: 'dmsAngleValue',
            rq: true,
            en: {
              lp: 'dmsAngleValue',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: 'GML_3_2_1.DMSAngleType'
          }, {
            n: 'stringValue',
            rq: true,
            en: {
              lp: 'stringValue',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            }
          }, {
            n: 'integerValue',
            rq: true,
            en: {
              lp: 'integerValue',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: 'Integer'
          }, {
            n: 'booleanValue',
            rq: true,
            en: {
              lp: 'booleanValue',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: 'Boolean'
          }, {
            n: 'valueList',
            rq: true,
            en: {
              lp: 'valueList',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: 'GML_3_2_1.MeasureListType'
          }, {
            n: 'integerValueList',
            rq: true,
            en: {
              lp: 'integerValueList',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: {
              t: 'l',
              bti: 'Integer'
            }
          }, {
            n: 'valueFile',
            rq: true,
            en: {
              lp: 'valueFile',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            }
          }, {
            n: 'geometryValue',
            rq: true,
            ti: 'GML_3_2_1.GeometryPropertyType'
          }, {
            n: 'vectorValue',
            rq: true,
            ti: 'GML_3_2_1.VectorType'
          }, {
            n: 'operationParameter',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: 'operationParameter',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: 'GML_3_2_1.OperationParameterPropertyType',
            t: 'er'
          }]
      }, {
        ln: 'Metadata',
        tn: null,
        bti: 'GML_3_2_1.AbstractMetadataPropertyType',
        ps: [{
            n: 'extension',
            en: 'Extension',
            ti: '.ExtensionType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ReferenceableGridPropertyType',
        ps: [{
            n: 'abstractReferenceableGrid',
            rq: true,
            en: 'AbstractReferenceableGrid',
            ti: '.AbstractReferenceableGridType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }, {
            n: 'owns',
            ti: 'Boolean',
            an: {
              lp: 'owns'
            },
            t: 'a'
          }]
      }, {
        ln: 'SimpleMultiPointType',
        bti: 'GML_3_2_1.AbstractGeometricAggregateType',
        ps: [{
            n: 'positions',
            rq: true,
            ti: 'GML_3_2_1.DirectPositionListType'
          }]
      }, {
        ln: 'AbstractCoverageType',
        bti: 'GML_3_2_1.AbstractCoverageType',
        ps: [{
            n: 'coverageFunction',
            en: {
              lp: 'coverageFunction',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            ti: 'GML_3_2_1.CoverageFunctionType'
          }, {
            n: 'rangeType',
            rq: true,
            ti: 'SWE_2_0.DataRecordPropertyType'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            ti: '.Metadata'
          }]
      }, {
        ln: 'AbstractDiscreteCoverageType',
        bti: '.AbstractCoverageType'
      }],
    eis: [{
        en: 'AbstractCoverage',
        ti: '.AbstractCoverageType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'Extension',
        ti: '.ExtensionType'
      }, {
        en: 'MultiSurfaceCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractDiscreteCoverage'
      }, {
        en: 'ReferenceableGridCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractCoverage'
      }, {
        en: 'AbstractContinuousCoverage',
        ti: '.AbstractContinuousCoverageType',
        sh: {
          lp: 'AbstractCoverage',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'referenceableGridProperty',
        ti: '.ReferenceableGridPropertyType'
      }, {
        en: 'ParameterValue',
        ti: '.ParameterValueType',
        sh: {
          lp: 'AbstractGeneralParameterValue',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'RectifiedGridCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractCoverage'
      }, {
        en: 'AbstractReferenceableGrid',
        ti: '.AbstractReferenceableGridType',
        sh: {
          lp: 'Grid',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'MultiSolidCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractDiscreteCoverage'
      }, {
        en: 'GridCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractCoverage'
      }, {
        en: 'rangeType',
        ti: 'SWE_2_0.DataRecordPropertyType'
      }, {
        en: 'AbstractDiscreteCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractCoverage'
      }, {
        en: 'MultiPointCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractDiscreteCoverage'
      }, {
        en: 'vectorValue',
        ti: 'GML_3_2_1.VectorType'
      }, {
        en: 'geometryValue',
        ti: 'GML_3_2_1.GeometryPropertyType'
      }, {
        en: 'MultiCurveCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: 'AbstractDiscreteCoverage'
      }, {
        en: 'metadata',
        ti: '.Metadata'
      }, {
        en: 'SimpleMultiPoint',
        ti: '.SimpleMultiPointType',
        sh: {
          lp: 'AbstractGeometricAggregate',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }]
  };
  return {
    GMLCOV_1_0: GMLCOV_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], GMLCOV_1_0_Module_Factory);
}
else {
  var GMLCOV_1_0_Module = GMLCOV_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.GMLCOV_1_0 = GMLCOV_1_0_Module.GMLCOV_1_0;
  }
  else {
    var GMLCOV_1_0 = GMLCOV_1_0_Module.GMLCOV_1_0;
  }
}