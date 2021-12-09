import { list } from '@keystone-next/keystone';

import { text, timestamp, relationship, float, checkbox, select, integer, image } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const diagnostic = list({
    ui: {
      listView: {
        initialColumns: ['hdw_issue', 'date','user', 'comments'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('hdw_issue'),
    },
    fields: {
      date: timestamp({ isRequired: true }), //fecha de alta
      comments: text(),
      //type-dependent attributes
      angles: text(),
      heightDiff: float(),
      battery2to3: checkbox(),
      timeStart: text(),
      timeEnd: text(),
      gpsPositions: select({
        isRequired: false,
        dataType: "integer",
        options: [
          { label: "Null", value: 0 },
          { label: "Non-Null", value: 1 },
        ],
        ui: {
          displayMode: "segmented-control",
        },
      }),
      packetsLost: integer(),
      distanceToIrrigatorCenterInMeters: integer(),
      initialSNR: select({
        isRequired: false,
        dataType: "integer",
        options: [
          { label: "Good", value: 0 },
          { label: "Regular", value: 1 },
          { label: "Poor", value: 2 },
        ],
        ui: {
          displayMode: "segmented-control",
        },
      }),
      pressureSensorPackets: integer(),
      grafanaLink: text(),
      altimetryImage: image(),

      //relationships
      user: relationship({
        ref: 'diagnostic.user'
      }),
      hdwIssue: relationship({
        ref: 'hdwIssue.diagnostic',
        ui: {
          displayMode: 'cards',
          cardFields: ['creation_date', 'irrigator', 'observations'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      diagnosticType: relationship({
        ref: 'diagnostic_type',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }), 
    },
  });