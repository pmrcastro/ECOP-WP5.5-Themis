var WFS_2_0_Module_Factory = function () {
  var WFS_2_0 = {
    n: 'WFS_2_0',
    dens: 'http:\/\/www.opengis.net\/wfs\/2.0',
    deps: ['XLink_1_0', 'Filter_2_0', 'OWS_1_1_0'],
    tis: [{
        ln: 'ElementType',
        ps: [{
            n: 'metadata',
            rq: true,
            en: {
              lp: 'Metadata',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.MetadataType'
          }, {
            n: 'valueList',
            rq: true,
            en: 'ValueList',
            ti: '.ValueListType'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'type',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'type'
            },
            t: 'a'
          }]
      }, {
        ln: 'EnvelopePropertyType',
        ps: [{
            n: 'any',
            rq: true,
            dom: false,
            mx: false,
            t: 'ae'
          }]
      }, {
        ln: 'FeaturesNotLockedType',
        ps: [{
            n: 'resourceId',
            rq: true,
            col: true,
            en: {
              lp: 'ResourceId',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.ResourceIdType'
          }]
      }, {
        ln: 'ActionResultsType',
        ps: [{
            n: 'feature',
            rq: true,
            col: true,
            en: 'Feature',
            ti: '.CreatedOrModifiedFeatureType'
          }]
      }, {
        ln: 'StoredQueryType',
        bti: 'Filter_2_0.AbstractQueryExpressionType',
        ps: [{
            n: 'parameter',
            mno: 0,
            col: true,
            en: 'Parameter',
            ti: '.ParameterType'
          }, {
            n: 'id',
            rq: true,
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'TupleType',
        ps: [{
            n: 'member',
            rq: true,
            mno: 2,
            col: true,
            ti: '.MemberPropertyType'
          }]
      }, {
        ln: 'BaseRequestType',
        ps: [{
            n: 'service',
            rq: true,
            an: {
              lp: 'service'
            },
            t: 'a'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }]
      }, {
        ln: 'DescribeStoredQueriesType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'storedQueryId',
            mno: 0,
            col: true,
            en: 'StoredQueryId'
          }]
      }, {
        ln: 'GetPropertyValueType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'abstractQueryExpression',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: 'AbstractQueryExpression',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.AbstractQueryExpressionType',
            t: 'er'
          }, {
            n: 'valueReference',
            rq: true,
            an: {
              lp: 'valueReference'
            },
            t: 'a'
          }, {
            n: 'resolvePath',
            an: {
              lp: 'resolvePath'
            },
            t: 'a'
          }, {
            n: 'resolve',
            an: {
              lp: 'resolve'
            },
            t: 'a'
          }, {
            n: 'resolveDepth',
            an: {
              lp: 'resolveDepth'
            },
            t: 'a'
          }, {
            n: 'resolveTimeout',
            ti: 'Integer',
            an: {
              lp: 'resolveTimeout'
            },
            t: 'a'
          }, {
            n: 'startIndex',
            ti: 'Integer',
            an: {
              lp: 'startIndex'
            },
            t: 'a'
          }, {
            n: 'count',
            ti: 'Integer',
            an: {
              lp: 'count'
            },
            t: 'a'
          }, {
            n: 'resultType',
            an: {
              lp: 'resultType'
            },
            t: 'a'
          }, {
            n: 'outputFormat',
            an: {
              lp: 'outputFormat'
            },
            t: 'a'
          }]
      }, {
        ln: 'InsertType',
        bti: '.AbstractTransactionActionType',
        ps: [{
            n: 'any',
            rq: true,
            col: true,
            dom: false,
            mx: false,
            t: 'ae'
          }, {
            n: 'inputFormat',
            an: {
              lp: 'inputFormat'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'PropertyName',
        tn: null,
        ps: [{
            n: 'value',
            ti: 'QName',
            t: 'v'
          }, {
            n: 'resolvePath',
            an: {
              lp: 'resolvePath'
            },
            t: 'a'
          }, {
            n: 'resolve',
            an: {
              lp: 'resolve'
            },
            t: 'a'
          }, {
            n: 'resolveDepth',
            an: {
              lp: 'resolveDepth'
            },
            t: 'a'
          }, {
            n: 'resolveTimeout',
            ti: 'Integer',
            an: {
              lp: 'resolveTimeout'
            },
            t: 'a'
          }]
      }, {
        ln: 'LockFeatureResponseType',
        ps: [{
            n: 'featuresLocked',
            en: 'FeaturesLocked',
            ti: '.FeaturesLockedType'
          }, {
            n: 'featuresNotLocked',
            en: 'FeaturesNotLocked',
            ti: '.FeaturesNotLockedType'
          }, {
            n: 'lockId',
            an: {
              lp: 'lockId'
            },
            t: 'a'
          }]
      }, {
        ln: 'Abstract',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'ValueCollectionType',
        ps: [{
            n: 'member',
            mno: 0,
            col: true,
            ti: '.MemberPropertyType'
          }, {
            n: 'additionalValues',
            ti: '.AdditionalValues'
          }, {
            n: 'truncatedResponse',
            ti: '.TruncatedResponse'
          }, {
            n: 'timeStamp',
            rq: true,
            ti: 'Calendar',
            an: {
              lp: 'timeStamp'
            },
            t: 'a'
          }, {
            n: 'numberMatched',
            rq: true,
            an: {
              lp: 'numberMatched'
            },
            t: 'a'
          }, {
            n: 'numberReturned',
            rq: true,
            ti: 'Integer',
            an: {
              lp: 'numberReturned'
            },
            t: 'a'
          }, {
            n: 'next',
            an: {
              lp: 'next'
            },
            t: 'a'
          }, {
            n: 'previous',
            an: {
              lp: 'previous'
            },
            t: 'a'
          }]
      }, {
        ln: 'CreatedOrModifiedFeatureType',
        ps: [{
            n: 'resourceId',
            rq: true,
            col: true,
            en: {
              lp: 'ResourceId',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.ResourceIdType'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }]
      }, {
        ln: 'ReplaceType',
        bti: '.AbstractTransactionActionType',
        ps: [{
            n: 'any',
            rq: true,
            dom: false,
            mx: false,
            t: 'ae'
          }, {
            n: 'filter',
            rq: true,
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.FilterType'
          }, {
            n: 'inputFormat',
            an: {
              lp: 'inputFormat'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'ParameterExpressionType',
        ps: [{
            n: 'title',
            mno: 0,
            col: true,
            en: 'Title',
            ti: '.Title'
          }, {
            n: '_abstract',
            mno: 0,
            col: true,
            en: 'Abstract',
            ti: '.Abstract'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: {
              lp: 'Metadata',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.MetadataType'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'type',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'type'
            },
            t: 'a'
          }]
      }, {
        ln: 'MemberPropertyType',
        ps: [{
            n: 'content',
            col: true,
            etis: [{
                en: 'SimpleFeatureCollection',
                ti: '.SimpleFeatureCollectionType'
              }, {
                en: 'Tuple',
                ti: '.TupleType'
              }],
            t: 'ers'
          }, {
            n: 'state',
            an: {
              lp: 'state'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            an: {
              lp: 'type',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'role',
            an: {
              lp: 'role',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'arcrole',
            an: {
              lp: 'arcrole',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            an: {
              lp: 'show',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            an: {
              lp: 'actuate',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }]
      }, {
        ln: 'ListStoredQueriesResponseType',
        ps: [{
            n: 'storedQuery',
            mno: 0,
            col: true,
            en: 'StoredQuery',
            ti: '.StoredQueryListItemType'
          }]
      }, {
        ln: 'TransactionType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'abstractTransactionAction',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'AbstractTransactionAction',
            ti: '.AbstractTransactionActionType',
            t: 'er'
          }, {
            n: 'lockId',
            an: {
              lp: 'lockId'
            },
            t: 'a'
          }, {
            n: 'releaseAction',
            an: {
              lp: 'releaseAction'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'StoredQueryListItemType',
        ps: [{
            n: 'title',
            mno: 0,
            col: true,
            en: 'Title',
            ti: '.Title'
          }, {
            n: 'returnFeatureType',
            rq: true,
            col: true,
            en: 'ReturnFeatureType',
            ti: 'QName'
          }, {
            n: 'id',
            rq: true,
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'WFSCapabilitiesType',
        tn: 'WFS_CapabilitiesType',
        bti: 'OWS_1_1_0.CapabilitiesBaseType',
        ps: [{
            n: 'wsdl',
            en: 'WSDL',
            ti: '.WFSCapabilitiesType.WSDL'
          }, {
            n: 'featureTypeList',
            en: 'FeatureTypeList',
            ti: '.FeatureTypeListType'
          }, {
            n: 'filterCapabilities',
            en: {
              lp: 'Filter_Capabilities',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.FilterCapabilities'
          }]
      }, {
        ln: 'DescribeStoredQueriesResponseType',
        ps: [{
            n: 'storedQueryDescription',
            mno: 0,
            col: true,
            en: 'StoredQueryDescription',
            ti: '.StoredQueryDescriptionType'
          }]
      }, {
        ln: 'CreateStoredQueryType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'storedQueryDefinition',
            mno: 0,
            col: true,
            en: 'StoredQueryDefinition',
            ti: '.StoredQueryDescriptionType'
          }]
      }, {
        ln: 'UpdateType',
        bti: '.AbstractTransactionActionType',
        ps: [{
            n: 'property',
            rq: true,
            col: true,
            en: 'Property',
            ti: '.PropertyType'
          }, {
            n: 'filter',
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.FilterType'
          }, {
            n: 'typeName',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'typeName'
            },
            t: 'a'
          }, {
            n: 'inputFormat',
            an: {
              lp: 'inputFormat'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'GetFeatureWithLockType',
        bti: '.GetFeatureType',
        ps: [{
            n: 'expiry',
            ti: 'Integer',
            an: {
              lp: 'expiry'
            },
            t: 'a'
          }, {
            n: 'lockAction',
            an: {
              lp: 'lockAction'
            },
            t: 'a'
          }]
      }, {
        ln: 'TransactionSummaryType',
        ps: [{
            n: 'totalInserted',
            ti: 'Integer'
          }, {
            n: 'totalUpdated',
            ti: 'Integer'
          }, {
            n: 'totalReplaced',
            ti: 'Integer'
          }, {
            n: 'totalDeleted',
            ti: 'Integer'
          }]
      }, {
        ln: 'PropertyType',
        ps: [{
            n: 'valueReference',
            rq: true,
            en: 'ValueReference',
            ti: '.PropertyType.ValueReference'
          }, {
            n: 'value',
            en: 'Value',
            ti: 'AnyType'
          }]
      }, {
        ln: 'AdditionalObjects',
        tn: null,
        ps: [{
            n: 'valueCollection',
            rq: true,
            en: 'ValueCollection',
            ti: '.ValueCollectionType'
          }, {
            n: 'simpleFeatureCollection',
            rq: true,
            mx: false,
            dom: false,
            en: 'SimpleFeatureCollection',
            ti: '.SimpleFeatureCollectionType',
            t: 'er'
          }]
      }, {
        ln: 'ListStoredQueriesType',
        bti: '.BaseRequestType'
      }, {
        ln: 'MetadataURLType',
        ps: [{
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            an: {
              lp: 'type',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'role',
            an: {
              lp: 'role',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'arcrole',
            an: {
              lp: 'arcrole',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            an: {
              lp: 'show',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            an: {
              lp: 'actuate',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }]
      }, {
        ln: 'ExecutionStatusType',
        ps: [{
            n: 'status',
            an: {
              lp: 'status'
            },
            t: 'a'
          }]
      }, {
        ln: 'DescribeFeatureTypeType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'typeName',
            mno: 0,
            col: true,
            en: 'TypeName',
            ti: 'QName'
          }, {
            n: 'outputFormat',
            an: {
              lp: 'outputFormat'
            },
            t: 'a'
          }]
      }, {
        ln: 'PropertyType.ValueReference',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'action',
            an: {
              lp: 'action'
            },
            t: 'a'
          }]
      }, {
        ln: 'QueryType',
        bti: 'Filter_2_0.AbstractAdhocQueryExpressionType',
        ps: [{
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }, {
            n: 'featureVersion',
            an: {
              lp: 'featureVersion'
            },
            t: 'a'
          }]
      }, {
        ln: 'WFSCapabilitiesType.WSDL',
        tn: null,
        ps: [{
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            an: {
              lp: 'type',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'role',
            an: {
              lp: 'role',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'arcrole',
            an: {
              lp: 'arcrole',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            an: {
              lp: 'show',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            an: {
              lp: 'actuate',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }]
      }, {
        ln: 'OutputFormatListType',
        ps: [{
            n: 'format',
            rq: true,
            col: true,
            en: 'Format'
          }]
      }, {
        ln: 'ExtendedDescriptionType',
        ps: [{
            n: 'element',
            rq: true,
            col: true,
            en: 'Element',
            ti: '.ElementType'
          }]
      }, {
        ln: 'FeaturesLockedType',
        ps: [{
            n: 'resourceId',
            rq: true,
            col: true,
            en: {
              lp: 'ResourceId',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.ResourceIdType'
          }]
      }, {
        ln: 'TruncatedResponse',
        tn: null,
        ps: [{
            n: 'exceptionReport',
            rq: true,
            en: {
              lp: 'ExceptionReport',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.ExceptionReport'
          }]
      }, {
        ln: 'EmptyType'
      }, {
        ln: 'TransactionResponseType',
        ps: [{
            n: 'transactionSummary',
            rq: true,
            en: 'TransactionSummary',
            ti: '.TransactionSummaryType'
          }, {
            n: 'insertResults',
            en: 'InsertResults',
            ti: '.ActionResultsType'
          }, {
            n: 'updateResults',
            en: 'UpdateResults',
            ti: '.ActionResultsType'
          }, {
            n: 'replaceResults',
            en: 'ReplaceResults',
            ti: '.ActionResultsType'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }]
      }, {
        ln: 'Title',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'LockFeatureType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'abstractQueryExpression',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: {
              lp: 'AbstractQueryExpression',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.AbstractQueryExpressionType',
            t: 'er'
          }, {
            n: 'lockId',
            an: {
              lp: 'lockId'
            },
            t: 'a'
          }, {
            n: 'expiry',
            ti: 'Integer',
            an: {
              lp: 'expiry'
            },
            t: 'a'
          }, {
            n: 'lockAction',
            an: {
              lp: 'lockAction'
            },
            t: 'a'
          }]
      }, {
        ln: 'DropStoredQuery',
        tn: null,
        bti: '.BaseRequestType',
        ps: [{
            n: 'id',
            rq: true,
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'SimpleFeatureCollectionType',
        ps: [{
            n: 'boundedBy',
            ti: '.EnvelopePropertyType'
          }, {
            n: 'member',
            mno: 0,
            col: true,
            ti: '.MemberPropertyType'
          }]
      }, {
        ln: 'ParameterType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'QueryExpressionTextType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'returnFeatureTypes',
            rq: true,
            ti: {
              t: 'l',
              bti: 'QName'
            },
            an: {
              lp: 'returnFeatureTypes'
            },
            t: 'a'
          }, {
            n: 'language',
            rq: true,
            an: {
              lp: 'language'
            },
            t: 'a'
          }, {
            n: 'isPrivate',
            ti: 'Boolean',
            an: {
              lp: 'isPrivate'
            },
            t: 'a'
          }]
      }, {
        ln: 'FeatureTypeType.NoCRS',
        tn: null
      }, {
        ln: 'NativeType',
        bti: '.AbstractTransactionActionType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'vendorId',
            rq: true,
            an: {
              lp: 'vendorId'
            },
            t: 'a'
          }, {
            n: 'safeToIgnore',
            rq: true,
            ti: 'Boolean',
            an: {
              lp: 'safeToIgnore'
            },
            t: 'a'
          }]
      }, {
        ln: 'CreateStoredQueryResponseType',
        bti: '.ExecutionStatusType'
      }, {
        ln: 'GetCapabilitiesType',
        bti: 'OWS_1_1_0.GetCapabilitiesType',
        ps: [{
            n: 'service',
            rq: true,
            an: {
              lp: 'service'
            },
            t: 'a'
          }]
      }, {
        ln: 'AdditionalValues',
        tn: null,
        ps: [{
            n: 'valueCollection',
            rq: true,
            en: 'ValueCollection',
            ti: '.ValueCollectionType'
          }, {
            n: 'simpleFeatureCollection',
            rq: true,
            mx: false,
            dom: false,
            en: 'SimpleFeatureCollection',
            ti: '.SimpleFeatureCollectionType',
            t: 'er'
          }]
      }, {
        ln: 'StoredQueryDescriptionType',
        ps: [{
            n: 'title',
            mno: 0,
            col: true,
            en: 'Title',
            ti: '.Title'
          }, {
            n: '_abstract',
            mno: 0,
            col: true,
            en: 'Abstract',
            ti: '.Abstract'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: {
              lp: 'Metadata',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.MetadataType'
          }, {
            n: 'parameter',
            mno: 0,
            col: true,
            en: 'Parameter',
            ti: '.ParameterExpressionType'
          }, {
            n: 'queryExpressionText',
            rq: true,
            col: true,
            en: 'QueryExpressionText',
            ti: '.QueryExpressionTextType'
          }, {
            n: 'id',
            rq: true,
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'FeatureTypeListType',
        ps: [{
            n: 'featureType',
            rq: true,
            col: true,
            en: 'FeatureType',
            ti: '.FeatureTypeType'
          }]
      }, {
        ln: 'DeleteType',
        bti: '.AbstractTransactionActionType',
        ps: [{
            n: 'filter',
            rq: true,
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.FilterType'
          }, {
            n: 'typeName',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'typeName'
            },
            t: 'a'
          }]
      }, {
        ln: 'FeatureCollectionType',
        bti: '.SimpleFeatureCollectionType',
        ps: [{
            n: 'additionalObjects',
            ti: '.AdditionalObjects'
          }, {
            n: 'truncatedResponse',
            ti: '.TruncatedResponse'
          }, {
            n: 'lockId',
            an: {
              lp: 'lockId'
            },
            t: 'a'
          }, {
            n: 'timeStamp',
            rq: true,
            ti: 'Calendar',
            an: {
              lp: 'timeStamp'
            },
            t: 'a'
          }, {
            n: 'numberMatched',
            rq: true,
            an: {
              lp: 'numberMatched'
            },
            t: 'a'
          }, {
            n: 'numberReturned',
            rq: true,
            ti: 'Integer',
            an: {
              lp: 'numberReturned'
            },
            t: 'a'
          }, {
            n: 'next',
            an: {
              lp: 'next'
            },
            t: 'a'
          }, {
            n: 'previous',
            an: {
              lp: 'previous'
            },
            t: 'a'
          }]
      }, {
        ln: 'GetFeatureType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'abstractQueryExpression',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: {
              lp: 'AbstractQueryExpression',
              ns: 'http:\/\/www.opengis.net\/fes\/2.0'
            },
            ti: 'Filter_2_0.AbstractQueryExpressionType',
            t: 'er'
          }, {
            n: 'startIndex',
            ti: 'Integer',
            an: {
              lp: 'startIndex'
            },
            t: 'a'
          }, {
            n: 'count',
            ti: 'Integer',
            an: {
              lp: 'count'
            },
            t: 'a'
          }, {
            n: 'resultType',
            an: {
              lp: 'resultType'
            },
            t: 'a'
          }, {
            n: 'outputFormat',
            an: {
              lp: 'outputFormat'
            },
            t: 'a'
          }, {
            n: 'resolve',
            an: {
              lp: 'resolve'
            },
            t: 'a'
          }, {
            n: 'resolveDepth',
            an: {
              lp: 'resolveDepth'
            },
            t: 'a'
          }, {
            n: 'resolveTimeout',
            ti: 'Integer',
            an: {
              lp: 'resolveTimeout'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractTransactionActionType',
        ps: [{
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }]
      }, {
        ln: 'ValueListType',
        ps: [{
            n: 'value',
            rq: true,
            col: true,
            en: 'Value',
            ti: 'AnyType'
          }]
      }, {
        ln: 'FeatureTypeType',
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name',
            ti: 'QName'
          }, {
            n: 'title',
            mno: 0,
            col: true,
            en: 'Title',
            ti: '.Title'
          }, {
            n: '_abstract',
            mno: 0,
            col: true,
            en: 'Abstract',
            ti: '.Abstract'
          }, {
            n: 'keywords',
            mno: 0,
            col: true,
            en: {
              lp: 'Keywords',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.KeywordsType'
          }, {
            n: 'defaultCRS',
            rq: true,
            en: 'DefaultCRS'
          }, {
            n: 'otherCRS',
            mno: 0,
            col: true,
            en: 'OtherCRS'
          }, {
            n: 'noCRS',
            rq: true,
            en: 'NoCRS',
            ti: '.FeatureTypeType.NoCRS'
          }, {
            n: 'outputFormats',
            en: 'OutputFormats',
            ti: '.OutputFormatListType'
          }, {
            n: 'wgs84BoundingBox',
            mno: 0,
            col: true,
            en: {
              lp: 'WGS84BoundingBox',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.WGS84BoundingBoxType'
          }, {
            n: 'metadataURL',
            mno: 0,
            col: true,
            en: 'MetadataURL',
            ti: '.MetadataURLType'
          }, {
            n: 'extendedDescription',
            en: 'ExtendedDescription',
            ti: '.ExtendedDescriptionType'
          }]
      }, {
        t: 'enum',
        ln: 'ResultTypeType',
        vs: ['results', 'hits']
      }, {
        t: 'enum',
        ln: 'StarStringType',
        vs: ['*']
      }, {
        t: 'enum',
        ln: 'ResolveValueType',
        vs: ['local', 'remote', 'all', 'none']
      }, {
        t: 'enum',
        ln: 'UpdateActionType',
        vs: ['replace', 'insertBefore', 'insertAfter', 'remove']
      }, {
        t: 'enum',
        ln: 'AllSomeType',
        vs: ['ALL', 'SOME']
      }],
    eis: [{
        en: 'DescribeStoredQueries',
        ti: '.DescribeStoredQueriesType'
      }, {
        en: 'ValueList',
        ti: '.ValueListType'
      }, {
        en: 'Query',
        ti: '.QueryType',
        sh: {
          lp: 'AbstractAdhocQueryExpression',
          ns: 'http:\/\/www.opengis.net\/fes\/2.0'
        }
      }, {
        en: 'TransactionResponse',
        ti: '.TransactionResponseType'
      }, {
        en: 'Abstract',
        ti: '.Abstract'
      }, {
        en: 'Transaction',
        ti: '.TransactionType'
      }, {
        en: 'additionalValues',
        ti: '.AdditionalValues'
      }, {
        en: 'GetFeatureWithLock',
        ti: '.GetFeatureWithLockType'
      }, {
        en: 'CreateStoredQuery',
        ti: '.CreateStoredQueryType'
      }, {
        en: 'StoredQuery',
        ti: '.StoredQueryType',
        sh: {
          lp: 'AbstractQueryExpression',
          ns: 'http:\/\/www.opengis.net\/fes\/2.0'
        }
      }, {
        en: 'DescribeStoredQueriesResponse',
        ti: '.DescribeStoredQueriesResponseType'
      }, {
        en: 'GetFeature',
        ti: '.GetFeatureType'
      }, {
        en: 'Value',
        ti: 'AnyType'
      }, {
        en: 'LockFeatureResponse',
        ti: '.LockFeatureResponseType'
      }, {
        en: 'DropStoredQuery',
        ti: '.DropStoredQuery'
      }, {
        en: 'additionalObjects',
        ti: '.AdditionalObjects'
      }, {
        en: 'Delete',
        ti: '.DeleteType',
        sh: 'AbstractTransactionAction'
      }, {
        en: 'WFS_Capabilities',
        ti: '.WFSCapabilitiesType'
      }, {
        en: 'DescribeFeatureType',
        ti: '.DescribeFeatureTypeType'
      }, {
        en: 'CreateStoredQueryResponse',
        ti: '.CreateStoredQueryResponseType'
      }, {
        en: 'Element',
        ti: '.ElementType'
      }, {
        en: 'truncatedResponse',
        ti: '.TruncatedResponse'
      }, {
        en: 'FeatureTypeList',
        ti: '.FeatureTypeListType'
      }, {
        en: 'GetPropertyValue',
        ti: '.GetPropertyValueType'
      }, {
        en: 'ListStoredQueries',
        ti: '.ListStoredQueriesType'
      }, {
        en: 'PropertyName',
        ti: '.PropertyName',
        sh: {
          lp: 'AbstractProjectionClause',
          ns: 'http:\/\/www.opengis.net\/fes\/2.0'
        }
      }, {
        en: 'FeatureCollection',
        ti: '.FeatureCollectionType',
        sh: 'SimpleFeatureCollection'
      }, {
        en: 'Native',
        ti: '.NativeType',
        sh: 'AbstractTransactionAction'
      }, {
        en: 'LockFeature',
        ti: '.LockFeatureType'
      }, {
        en: 'Update',
        ti: '.UpdateType',
        sh: 'AbstractTransactionAction'
      }, {
        en: 'GetCapabilities',
        ti: '.GetCapabilitiesType'
      }, {
        en: 'Property',
        ti: '.PropertyType'
      }, {
        en: 'boundedBy',
        ti: '.EnvelopePropertyType'
      }, {
        en: 'ListStoredQueriesResponse',
        ti: '.ListStoredQueriesResponseType'
      }, {
        en: 'Insert',
        ti: '.InsertType',
        sh: 'AbstractTransactionAction'
      }, {
        en: 'Title',
        ti: '.Title'
      }, {
        en: 'Replace',
        ti: '.ReplaceType',
        sh: 'AbstractTransactionAction'
      }, {
        en: 'AbstractTransactionAction',
        ti: '.AbstractTransactionActionType'
      }, {
        en: 'SimpleFeatureCollection',
        ti: '.SimpleFeatureCollectionType'
      }, {
        en: 'ValueCollection',
        ti: '.ValueCollectionType'
      }, {
        en: 'Tuple',
        ti: '.TupleType'
      }, {
        en: 'DropStoredQueryResponse',
        ti: '.ExecutionStatusType'
      }, {
        en: 'member',
        ti: '.MemberPropertyType'
      }]
  };
  return {
    WFS_2_0: WFS_2_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WFS_2_0_Module_Factory);
}
else {
  var WFS_2_0_Module = WFS_2_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WFS_2_0 = WFS_2_0_Module.WFS_2_0;
  }
  else {
    var WFS_2_0 = WFS_2_0_Module.WFS_2_0;
  }
}