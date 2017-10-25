// ALL THE OBJECT NAMES SHOULD NOT BE CHANGED
// <<<<< name, type, tag, fields >>>>>
// <<<<< name, type, options, tag, fields >>>>>
// TODO: JOIN QIs and EQIs > QIList
const configJSON = {
  QIList: {
    TAGFILTER: {
      code: 'TAGFILTER',
      type: ecop.QIValue.Types.VCONTAINSSTR.vl,
      name: 'Filter by abstract/title',
      isntQI: true,
      options: {
        tools: {
          filter: {
            allowFilter: false,
            isFilter: true
          },
          hasIsCritical: false,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          caption: 'Lineage information required?',
          options: {}
        }
      ],
      config: {
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification'],
          fields: [['abstract', 'CharacterString', '__text'], ['citation', 'CI_Citation', 'title', 'CharacterString', '__text']]
        },
        EQI: {
          tag: [],
          fields: [[]]
        }
      }
    },
    TYPOLOGY: {
      code: 'TYPOLOGY',
      type: ecop.QIValue.Types.VSTRING.vl,
      name: 'Topic category',
      options: {
        tools: {
          filter: {
            allowFilter: false,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          name: 'Topic category',
          mandatory: true,
          options: {
            src: 'TCG'
          }
        }
      ],
      config: {
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification', 'topicCategory'],
          fields: [['MD_TopicCategoryCode', '__text']]
        },
        EQI: {
          tag: 'EQI_Metadata/TopicCategory',
          options: ['isCF'],
          fields: ['topic']
        }
      }
    },
    SPATIAL_SCALE: {
      code: 'SPATIAL_SCALE',
      type: ecop.QIValue.Types.VSCALERANGE.vl,
      QI: ecop.QIValue.Types.VSCALE.vl, // add this field if the EQI type is different from the QI type
      name: 'Spatial scale',
      options: {
        tools: {
          filter: {
            allowFilter: false,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      contentTypes: [
        {
          name: 'Scale',
          value: 'scale',
          labels: {
            min: 'Scale distance min',
            max: 'Scale distance max'
          },
          hasSelect: false
        },
        {
          name: 'Resolution',
          value: 'resolution',
          labels: {
            min: 'Resolution distance min',
            max: 'Resolution distance max'
          },
          hasSelect: true
        }
      ],
      selectSrc: 'UNTMSR',
      config: {
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification', 'spatialResolution', 'MD_Resolution'],
          fields: [['equivalentScale', 'MD_RepresentativeFraction', 'denominator', 'Integer', '__text'], ['distance', 'Distance', '__text'], ['distance', 'Distance', '_uom']]
        },
        EQI: {
          tag: 'EQI_Metadata/SpatialScale',
          options: ['isCF'],
          fields: ['scaleMin', 'scaleMax', 'distanceMin@uom', 'distanceMax@uom']
        }
      }
    },
    SPATIAL_EXTENT: {
      code: 'SPATIAL_EXTENT',
      type: ecop.QIValue.Types.VBOX.vl,
      name: 'Spatial extent',
      options: {
        tools: {
          filter: {
            allowFilter: true,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: true,
            config: {
              caption: 'Cover(%)',
              minValue: 0,
              maxValue: 100,
              defaultValue: 100
            }
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          name: 'spatial location',
          mandatory: true
        }
      ],
      config: {
        cswFilter: ['ows:BoundingBox'],
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification', 'extent', 'EX_Extent', 'geographicElement', 'EX_GeographicBoundingBox'],
          fields: [['westBoundLongitude', 'Decimal', '__text'],
          ['eastBoundLongitude', 'Decimal', '__text'],
          ['southBoundLatitude', 'Decimal', '__text'],
          ['northBoundLatitude', 'Decimal', '__text']]
        },
        EQI: {
          tag: 'EQI_Metadata/SpatialExtent',
          options: ['isCF', 'percCover'],
          fields: ['westBoundLongitude', 'eastBoundLongitude', 'southBoundLatitude', 'northBoundLatitude']
        }
      }
    },
    TEMPORAL_EXTENT: {
      code: 'TEMPORAL_EXTENT',
      type: ecop.QIValue.Types.VTEMPEXTENT.vl,
      name: 'Temporal extent',
      options: {
        tools: {
          filter: {
            allowFilter: true,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: true,
            config: {
              caption: 'Cover(%)',
              minValue: 0,
              maxValue: 100,
              defaultValue: 100
            }
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          name: 'time period',
          mandatory: true
        }
      ],
      config: {
        cswFilter: ['dc:date'],
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification', 'extent'],
          fields: [['EX_Extent', 'temporalElement', 'EX_TemporalExtent', 'extent', 'TimePeriod', 'beginPosition', '__text'],
          ['EX_Extent', 'temporalElement', 'EX_TemporalExtent', 'extent', 'TimePeriod', 'endPosition', '__text']]
        },
        EQI: {
          tag: 'EQI_Metadata/TemporalExtent',
          options: ['isCF', 'percCover'],
          fields: ['beginPosition', 'endPosition']
        }
      }
    },
    LINEAGE: {
      code: 'LINEAGE',
      type: ecop.QIValue.Types.VCONTAINSSTR.vl,
      name: 'Lineage',
      options: {
        tools: {
          filter: {
            allowFilter: false,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          caption: 'Lineage information required?',
          options: {}
        }
      ],
      config: {
        QI: {
          tag: ['dataQualityInfo', 'DQ_DataQuality', 'lineage', 'LI_Lineage'],
          fields: [['statement', 'CharacterString', '__text']]
        },
        EQI: {
          tag: 'EQI_Metadata/Lineage',
          options: ['isCF', 'isRequired'],
          fields: ['lineage']
        }
      }
    },
    REFERENCE_SYSTEM: {
      code: 'REFERENCE_SYSTEM',
      type: ecop.QIValue.Types.VDBLSTRING.vl,
      name: 'Reference System',
      options: {
        tools: {
          filter: {
            allowFilter: false,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          name: 'Code',
          mandatory: true,
          options: {
            src: 'SRSCS'
          }
        },
        {
          name: 'Code space',
          mandatory: false,
          options: {
            src: 'CSPACES'
          }
        }
      ],
      config: {
        QI: {
          tag: ['referenceSystemInfo', 'MD_ReferenceSystem', 'referenceSystemIdentifier', 'RS_Identifier'],
          fields: [['code', 'CharacterString', '__text'], ['codeSpace', 'CharacterString', '__text']]
        },
        EQI: {
          tag: 'EQI_Metadata/ReferenceSystem',
          options: ['isCF'],
          fields: ['code', 'codeSpace']
        }
      }
    },
    PRODUCER: {
      code: 'PRODUCER',
      type: ecop.QIValue.Types.VCONTAINSSTR.vl,
      name: 'Producer recognition',
      options: {
        tools: {
          filter: {
            allowFilter: true,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          caption: '',
          mandatory: true,
          options: {
            src: 'PRDRECOGNITION'
          }
        }
      ],
      config: {
        cswFilter: ['dc:creator', 'dc:publisher', 'dc:contributor'],
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification', 'supplementalInformation'],
          fields: [['CharacterString', '__text']]
        },
        EQI: {
          tag: 'EQI_Metadata/SupplementalInformation',
          options: ['isCF', 'isRequired'],
          fields: ['info']
        }
      }
    },
    ACCESS_USE: {
      code: 'ACCESS_USE',
      type: ecop.QIValue.Types.VCONTAINSSTR.vl,
      name: 'Access and use restrictions',
      options: {
        tools: {
          filter: {
            allowFilter: true,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          caption: '',
          mandatory: true,
          options: {
            src: 'ACCESSUSE'
          }
        }
      ],
      config: {
        cswFilter: ['dc:rights'],
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification', 'resourceConstraints'],
          fields: [['MD_Constraints', 'useLimitation', 'CharacterString', '__text'], ['MD_LegalConstraints', 'accessConstraints', 'MD_RestrictionCode', '_codeListValue'], ['MD_LegalConstraints', 'otherConstraints', 'CharacterString', '__text']]
        },
        EQI: {
          tag: 'EQI_Metadata/AccessUseRestrition',
          options: ['isCF'],
          fields: ['useLimitation']
        }
      }
    },
    REPRESENTATION_TYPE: {
      code: 'REPRESENTATION_TYPE',
      type: ecop.QIValue.Types.VSTRING.vl,
      name: 'Representation type',
      options: {
        tools: {
          filter: {
            allowFilter: true,
            isFilter: false
          },
          hasIsCritical: true,
          slider: {
            has: false
          }
        },
        buttonsCRUD: [
          {
            label: 'Add',
            id: 'add',
            class: 'btn btn-link btn-sm btn-green btn-cleaned',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            label: 'Edit',
            id: 'edit',
            class: 'btn btn-link btn-sm btn-orange btn-cleaned',
            icon: 'glyphicon glyphicon-pencil'
          },
          {
            label: 'Remove',
            id: 'remove',
            class: 'btn btn-link btn-sm btn-red btn-cleaned',
            icon: 'glyphicon glyphicon-minus'
          }
        ]
      },
      content: [
        {
          name: 'Format type',
          mandatory: true,
          options: {
            src: 'REPRTYPE'
          }
        }
      ],
      config: {
        cswFilter: ['dc:format'],
        QI: {
          tag: ['identificationInfo', 'MD_DataIdentification', 'spatialRepresentationType'],
          fields: [['MD_SpatialRepresentationTypeCode', '_codeListValue']]
        },
        EQI: {
          tag: 'EQI_Metadata/FileFormats',
          options: ['isCF'],
          fields: ['name', 'version']
        }
      }
    }
  },
  TCs: [
    {
      name: 'Other',
      code: 'OTHER'
    },
    {
      name: 'Coordinate reference systems',
      code: 'RS'
    },
    {
      name: 'Geographical grid systems',
      code: 'GG'
    },
    {
      name: 'Geographical names',
      code: 'GN'
    },
    {
      name: 'Administrative units',
      code: 'AU'
    },
    {
      name: 'Addresses',
      code: 'AD'
    },
    {
      name: 'Cadastral parcels',
      code: 'CP'
    },
    {
      name: 'Transport networks',
      code: 'TN'
    },
    {
      name: 'Hydrography',
      code: 'HY'
    },
    {
      name: 'Protected sites',
      code: 'PS'
    },
    {
      name: 'Elevation',
      code: 'EL'
    },
    {
      name: 'Land cover',
      code: 'LC'
    },
    {
      name: 'Orthoimagery',
      code: 'OI'
    },
    {
      name: 'Geology',
      code: 'GE'
    },
    {
      name: 'Statistical units',
      code: 'SU'
    },
    {
      name: 'Buildings',
      code: 'BU'
    },
    {
      name: 'Soil',
      code: 'SO'
    },
    {
      name: 'Land use',
      code: 'LU'
    },
    {
      name: 'Human health and safety',
      code: 'HH'
    },
    {
      name: 'Utility and governmental services',
      code: 'US'
    },
    {
      name: 'Environmental monitoring facilities',
      code: 'EF'
    },
    {
      name: 'Production and industrial facilities',
      code: 'PF'
    },
    {
      name: 'Agricultural and aquaculture facilities',
      code: 'AF'
    },
    {
      name: 'Population distribution - demography',
      code: 'PD'
    },
    {
      name: 'Area management/ restriction/ regulation zones and reporting units',
      code: 'AM'
    },
    {
      name: 'Natural risk zones',
      code: 'NZ'
    },
    {
      name: 'Atmospheric conditions',
      code: 'AC'
    },
    {
      name: 'Meteorological geographical features',
      code: 'MF'
    },
    {
      name: 'Oceanographic geographical features',
      code: 'OF'
    },
    {
      name: 'Sea regions',
      code: 'SR'
    },
    {
      name: 'Bio-geographical regions',
      code: 'BR'
    },
    {
      name: 'Habitats and biotopes',
      code: 'HB'
    },
    {
      name: 'Species distribution',
      code: 'SD'
    },
    {
      name: 'Energy resources',
      code: 'ER'
    },
    {
      name: 'Mineral resources',
      code: 'MR'
    }
  ],
  DEFAULTVALUES: {
    TCG: {
      biota: 'Biota',
      boundaries: 'Boundaries',
      climatologyMeteorologyAtmosphere: 'Climatology / Meteorology / Atmosphere',
      economy: 'Economy',
      elevation: 'Elevation',
      environment: 'Environment',
      farming: 'Farming',
      geoscientificInformation: 'Geoscientific Information',
      health: 'Health',
      imageryBaseMapsEarthCover: 'Imagery / Base Maps / Earth Cover',
      inlandWaters: 'Inland Waters',
      intelligenceMilitary: 'Intelligence / Military',
      location: 'Location',
      oceans: 'Oceans',
      planningCadastre: 'Planning / Cadastre',
      society: 'Society',
      structure: 'Structure',
      transportation: 'Transportation',
      utilitiesCommunication: 'Utilities / Communication'
    },
    SRSCS: {
      'EPSG:2100': 'EPSG:2100',
      'EPSG:3003': 'EPSG:3003',
      'EPSG:3004': 'EPSG:3004',
      'EPSG:3035': 'EPSG:3035',
      'EPSG:3763': 'EPSG:3763',
      'EPSG:4277': 'EPSG:4277',
      'EPSG:4278': 'EPSG:4278',
      'EPSG:4291': 'EPSG:4291',
      'EPSG:4326': 'EPSG:4326',
      'EPSG:4618': 'EPSG:4618',
      'EPSG:7405': 'EPSG:7405',
      'EPSG:23029': 'EPSG:23029',
      'EPSG:27700': 'EPSG:27700',
      'EPSG:28992': 'EPSG:28992',
      'EPSG:29100': 'EPSG:29100',
      'EPSG:29101': 'EPSG:29101',
      'EPSG:29168': 'EPSG:29168',
      'EPSG:29169': 'EPSG:29169',
      'EPSG:29170': 'EPSG:29170',
      'EPSG:29171': 'EPSG:29171',
      'EPSG:29172': 'EPSG:29172',
      'EPSG:29181': 'EPSG:29181',
      'EPSG:29182': 'EPSG:29182',
      'EPSG:29183': 'EPSG:29183',
      'EPSG:29184': 'EPSG:29184',
      'EPSG:29185': 'EPSG:29185',
      'EPSG:29187': 'EPSG:29187',
      'EPSG:29188': 'EPSG:29188',
      'EPSG:29189': 'EPSG:29189',
      'EPSG:29190': 'EPSG:29190',
      'EPSG:29191': 'EPSG:29191',
      'EPSG:29192': 'EPSG:29192',
      'EPSG:29193': 'EPSG:29193',
      'EPSG:29194': 'EPSG:29194',
      'EPSG:29195': 'EPSG:29195',
      'EPSG:32629': 'EPSG:32629',
      'EPSG:32630': 'EPSG:32630',
      'EPSG:32633': 'EPSG:32633',
      'EPSG:32634': 'EPSG:32634',
      'EPSG:62776405': 'EPSG:62776405',
      'EPSG:66186405': 'EPSG:66186405',
      'ESRI:102161': 'ESRI:102161',
      'ESRI:102164': 'ESRI:102164',
      'SR-ORG:6812': 'SR-ORG:6812',
      'SR-ORG:6832': 'SR-ORG:6832',
      'SR-ORG:6971': 'SR-ORG:6971',
      'SR-ORG:7132': 'SR-ORG:7132',
      'Non-available/non-applicable': 'Non-available/non-applicable'
    },
    CSPACES: {
      'EPSG': 'EPSG',
      'ESRI': 'ESRI',
      'SR-ORG': 'SR-ORG'
    },
    ACCESSUSE: [
      'geossUserRegistration',
      'geossAttribution',
      'geossMonetaryCharge',
      'geossNoMonetaryCharge',
      'geossMarginalCost',
      'geossDataCore',
      'geossNonCommercial',
      'geossOther',
      'No conditions apply',
      'Conditions unknown'
    ],
    UNTMSR: {
      'm': 'm',
      'Km': 'Km',
      'cm': 'cm',
      'mm': 'mm',
      'mi': 'mi',
      'nmi': 'nmi',
      'nmi(Adm)': 'nmi(Adm)',
      'ft(US)': 'ft(US)',
      'ft': 'ft',
      'in': 'in',
      'yd': 'yd',
      'ch': 'ch',
      'rd': 'rd',
      'link': 'link',
      'Modified ft (US)': 'Modified ft (US)',
      'ft (Cla)': 'ft (Cla)',
      'ft Ind': 'ft Ind',
      'link (Ben)': 'link (Ben)',
      'link (Srs)': 'link (Srs)',
      'yd (Ind)': 'yd (Ind)',
      'yd (Srs)': 'yd (Srs)',
      'fm': 'fm',
      'British foot (1936)': 'British foot (1936)',
      'Å': 'Å',
      'AU': 'AU'
    },
    PRDRECOGNITION: [
      'Data producer: Official',
      'Data producer: Non-Official',
      'Data producer: Unknown'
    ],
    REPRTYPE: {
      'vector': 'Vector',
      'grid': 'Grid',
      'tin': 'TIN',
      'textTable': 'Text Table'
    },
    DTSRCs: [
      'http://biosos.ipvc.pt/geonetwork/srv/en/csw',
      'http://62.28.241.40/geonetwork/srv/en/csw',
      'http://eco.starlab.es/csw',
      'https://catalog.data.gov/csw',
      'http://metadata.bgs.ac.uk/geonetwork/srv/en/csw',
      'https://catalog.data.gov/csw-all',
      'http://data.linz.govt.nz/services/csw/',
      'https://pycsw.eodc.eu',
      'http://csw.geopole.org/',
      'https://geonode.wfp.org/catalogue/csw',
      'http://demo.pycsw.org/cite/csw',
      'http://www.pacioos.hawaii.edu/ogc/csw',
      'http://api.rvdata.us/catalog',
      'http://lgi-climbsrv.geographie.uni-kiel.de/catalogue/csw',
      'http://mappe.provincia.teramo.it/catalogue/csw',
      'http://artemis.geogr.uni-jena.de/pycsw/csw-projects.py',
      'http://geonode.jrc.ec.europa.eu/catalogue/csw',
      'http://pcrafi.spc.int/catalogue/csw',
      'http://geonode.sopac.org/catalogue/csw',
      'https://cida.usgs.gov/coastalchangehazardsportal/csw/',
      'http://search.geothermaldata.org/csw',
      'http://portal.smart-project.info/pycsw/csw',
      'https://data.noaa.gov/csw',
      'http://geoport.whoi.edu/csw',
      'http://geonode.state.gov/catalogue/csw'
    ]
  },
  STANDARDS: {
    INSPIRE: {
      commonElements: [
        { label: 'Resource title', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification', 'citation', 'CI_Citation'], fields: [['title', 'CharacterString', '__text']] },
        { label: 'Resource abstract', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification'], fields: [['abstract', 'CharacterString', '__text']] },
        { label: 'Resource type', needsAll: true, path: ['hierarchyLevel'], fields: [['MD_ScopeCode']] },
        { label: 'Unique resource identifier', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification', 'citation', 'CI_Citation'], fields: [['identifier', 'CharacterString', '__text']] },
        { label: 'Resource language', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification', 'language'], fields: [['CharacterString', '__text']] },
        { label: 'Topic category', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification', 'topicCategory'], fields: [['MD_TopicCategoryCode', '__text']] },
        { label: 'Keyword value', needsAll: true, path: ['identificationInfo'], fields: [['MD_DataIdentification', 'descriptiveKeywords', 'MD_Keywords', 'keyword']] },
        { label: 'Geographic bounding box', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification', 'extent', 'EX_Extent', 'geographicElement', 'EX_GeographicBoundingBox'], fields: [['eastBoundLongitude', 'Decimal', '__text'], ['westBoundLongitude', 'Decimal', '__text'], ['northBoundLatitude', 'Decimal', '__text'], ['southBoundLatitude', 'Decimal', '__text']] },
        { label: 'Temporal reference', needsAll: false, path: ['identificationInfo', 'MD_DataIdentification'], fields: [['extent', 'EX_Extent', 'temporalElement'], ['citation', 'CI_Citation', 'date']] },
        { label: 'Lineage', needsAll: true, path: ['dataQualityInfo', 'DQ_DataQuality', 'lineage'], fields: [['LI_Lineage', 'statement', 'CharacterString', '__text']] },
        { label: 'Spatial resolution', needsAll: false, path: ['identificationInfo', 'MD_DataIdentification', 'spatialResolution'], fields: [['MD_Resolution', 'equivalentScale', 'MD_RepresentativeFraction', 'denominator', 'Integer', '__text'], ['MD_Resolution', 'distance']] },
        { label: 'Conformity', needsAll: true, path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency', 'result', 'DQ_ConformanceResult'], fields: [['specification', 'CI_Citation', 'title', 'CharacterString', '__text'], ['specification', 'CI_Citation', 'date', 'CI_Date', 'date', 'DateTime', '__text'], ['specification', 'CI_Citation', 'date', 'CI_Date', 'dateType', 'CI_DateTypeCode', '_codeListValue'], ['pass', 'Boolean', '__text']] },
        { label: 'Conditions applying to access and use', needsAll: false, path: ['identificationInfo', 'MD_DataIdentification', 'resourceConstraints', 'MD_LegalConstraints'], fields: [['accessConstraints', 'MD_RestrictionCode', '__text'], ['otherConstraints', 'CharacterString', '__text'], ['useConstraints', 'MD_RestrictionCode', '__text'], ['otherConstraints', 'CharacterString', '__text']] },
        { label: 'Limitations on public access', needsAll: false, path: ['identificationInfo', 'MD_DataIdentification', 'resourceConstraints', 'MD_LegalConstraints'], fields: [['accessConstraints', 'MD_RestrictionCode', '_codeListValue']] },
        { label: 'Responsible party', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification', 'pointOfContact'], fields: [['CI_ResponsibleParty']] },
        { label: 'Responsible party role', needsAll: true, path: ['identificationInfo', 'MD_DataIdentification', 'pointOfContact'], fields: [['CI_ResponsibleParty', 'role', 'CI_RoleCode', '_codeListValue']] },
        { label: 'Metadata point of contact', needsAll: true, path: ['contact'], fields: [['CI_ResponsibleParty']] },
        { label: 'Metadata date', needsAll: true, path: ['dateStamp'], fields: [['DateTime', '__text']] },
        { label: 'Metadata language', needsAll: true, path: ['language'], fields: [['CharacterString', '__text']] }
      ],
      tc: {
        fields: [
          [
            ['nameOfMeasure', 'CharacterString', '__text'],
            ['evaluationMethodType', 'DQ_EvaluationMethodTypeCode', '__text'],
            ['evaluationMethodDescription', 'CharacterString', '__text'],
            ['dateTime', 'DateTime', '__text'],
            ['result'],
            ['result', 'DQ_QuantitativeResult']
          ],
          [
            ['result', 'DQ_ConformanceResult', 'specification'],
            ['result', 'DQ_ConformanceResult', 'explanation'],
            ['result', 'DQ_ConformanceResult', 'pass']
          ]
        ],
        paths: {
          OTHER: [],
          RS: [],
          GG: [],
          GN: [
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] }
          ],
          AU: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] }
          ],
          AD: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Non-quantitative Attribute Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Non-quantitativeAttributeCorrectness'] }
          ],
          CP: [
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] }
          ],
          TN: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Format Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_FormatConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Thematic Classification Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ThematicClassificationCorrectness'] },
            { label: 'Non-quantitative Attribute Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Non-quantitativeAttributeCorrectness'] }
          ],
          HY: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Relative Or Internal Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_RelativeOrInternalAccuracy'] },
            { label: 'Non-quantitative Attribute Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Non-quantitativeAttributeCorrectness'] },
            { label: 'Quantitative Attribute Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_QuantitativeAttributeAccuracy'] }
          ],
          PS: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] }
          ],
          EL: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Format Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_FormatConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Temporal Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_GriddedDataPositionalAccuracy'] }
          ],
          LC: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Format Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_FormatConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Relative Or Internal Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_RelativeOrInternalAccuracy'] },
            { label: 'Temporal Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_TemporalConsistency'] },
            { label: 'Temporal Validity', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_TemporalValidity'] },
            { label: 'Thematic Classification Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ThematicClassificationCorrectness'] },
            { label: 'Non-quantitative Attribute Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Non-quantitativeAttributeCorrectness'] },
            { label: 'Quantitative Attribute Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_QuantitativeAttributeAccuracy'] }
          ],
          OI: [
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Temporal Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_GriddedDataPositionalAccuracy'] }
          ],
          GE: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          SU: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Temporal Validity', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_TemporalValidity'] },
            { label: 'Thematic Classification Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ThematicClassificationCorrectness'] }
          ],
          BU: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] }
          ],
          SO: [
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          LU: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Thematic Classification Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ThematicClassificationCorrectness'] },
            { label: 'Non-quantitative Attribute Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Non-quantitativeAttributeCorrectness'] }
          ],
          HH: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] },
            { label: 'Temporal Validity', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_TemporalValidity'] },
            { label: 'Quantitative Attribute Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_QuantitativeAttributeAccuracy'] }
          ],
          US: [
            { label: 'Comission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Comission'] },
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Format Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_FormatConsistency'] }
          ],
          EF: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          PF: [
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Temporal Validity', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_TemporalValidity'] },
            { label: 'Thematic Classification Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ThematicClassificationCorrectness'] }
          ],
          AF: [
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Temporal Validity', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_TemporalValidity'] },
            { label: 'Thematic Classification Correctness', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ThematicClassificationCorrectness'] }
          ],
          PD: [],
          AM: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          NZ: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          AC: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          MF: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          OF: [
            { label: 'Omission', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_Omission'] },
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] }
          ],
          SR: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] },
            { label: 'Absolute Or External Accuracy', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_AbsoluteOrExternalAccuracy'] }
          ],
          BR: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          HB: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          SD: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          ER: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ],
          MR: [
            { label: 'Conceptual Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_ConceptualConsistency'] },
            { label: 'Domain Consistency', path: ['dataQualityInfo', 'DQ_DataQuality', 'report', 'DQ_DomainConsistency'] }
          ]
        }
      }
    }
  },
  DATASET_UI: [
    {
      title: 'Basic Information',
      geo: false,
      items: [
        { title: 'UUID', outSplitter: ', ', splitter: ', ', src: ['fileIdentifier'], tags: [['CharacterString', '__text']] },
        { title: 'Title', outSplitter: ', ', splitter: ', ', src: ['identificationInfo', 'MD_DataIdentification', 'citation'], tags: [['CI_Citation', 'title', 'CharacterString', '__text']] },
        { title: 'Abstract', outSplitter: ', ', splitter: ', ', src: ['identificationInfo', 'MD_DataIdentification', 'abstract'], tags: [['CharacterString', '__text']] },
        { title: 'Topic Category', outSplitter: ', ', splitter: ', ', src: ['identificationInfo', 'MD_DataIdentification', 'topicCategory'], tags: [['MD_TopicCategoryCode', '__text']] },
        { title: 'Keywords', outSplitter: ', ', splitter: ', ', src: ['identificationInfo', 'MD_DataIdentification', 'descriptiveKeywords'], tags: [['MD_Keywords', 'keyword', 'CharacterString', '__text']] }
      ]
    },
    {
      title: 'Temporal Extent',
      geo: false,
      items: [
        { title: 'Begin/End date', outSplitter: ', ', splitter: ' to ', src: ['identificationInfo', 'MD_DataIdentification', 'extent'], tags: [['EX_Extent', 'temporalElement', 'EX_TemporalExtent', 'extent', 'TimePeriod', 'beginPosition', '__text'], ['EX_Extent', 'temporalElement', 'EX_TemporalExtent', 'extent', 'TimePeriod', 'endPosition', '__text']] }
      ]
    },
    {
      title: 'Point of Contact',
      geo: false,
      items: [
        { title: 'Organisation', outSplitter: ', ', splitter: ', ', src: ['contact', 'CI_ResponsibleParty', 'organisationName'], tags: [['CharacterString', '__text']] },
        { title: 'Electronic mail address', outSplitter: ', ', splitter: ', ', src: ['contact', 'CI_ResponsibleParty', 'contactInfo', 'CI_Contact', 'address', 'CI_Address', 'electronicMailAddress'], tags: [['CharacterString', '__text']] },
        { title: 'Role', outSplitter: ', ', splitter: ', ', src: ['contact', 'CI_ResponsibleParty', 'role'], tags: [['CI_RoleCode', '_codeListValue']] }
      ]
    },
    {
      title: 'Spatial Resolution',
      geo: false,
      items: [
        { title: 'Resolution', outSplitter: '', splitter: '', src: ['identificationInfo', 'MD_DataIdentification', 'spatialResolution', 'MD_Resolution'], tags: [['distance', 'Distance', '__text'], ['distance', 'Distance', '_uom']] },
        { title: 'Spatial scale', outSplitter: '', splitter: '', src: ['identificationInfo', 'MD_DataIdentification', 'spatialResolution', 'MD_Resolution'], tags: [['equivalentScale', 'MD_RepresentativeFraction', 'denominator', 'Integer', '__text']] }
      ]
    },
    {
      title: 'Additional Information',
      geo: false,
      items: [
        { title: 'Lineage', outSplitter: '', splitter: '', src: ['dataQualityInfo', 'DQ_DataQuality', 'lineage', 'LI_Lineage'], tags: [['statement', 'CharacterString', '__text']] }
      ]
    },
    {
      title: 'Geospatial Location',
      geo: true,
      items: [
        { title: 'Geolocation', src: ['identificationInfo', 'MD_DataIdentification', 'extent', 'EX_Extent', 'geographicElement', 'EX_GeographicBoundingBox'], tags: [['westBoundLongitude', 'Decimal', '__text'], ['eastBoundLongitude', 'Decimal', '__text'], ['southBoundLatitude', 'Decimal', '__text'], ['northBoundLatitude', 'Decimal', '__text']] }
      ]
    }
  ]
}
