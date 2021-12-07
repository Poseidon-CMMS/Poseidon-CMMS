import { list } from '@keystone-next/keystone';

import { text, timestamp, relationship, float, checkbox, select, integer, image } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const diagnostic = list({
    ui: {
      listView: {
        initialColumns: ['hdwIssue', 'date','user', 'comments'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('hdwIssue'),
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
        ref: 'Diagnostic.user'
      }),
      hdwIssue: relationship({
        ref: 'HdwIssue.diagnostic',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate', 'irrigator', 'observations'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      diagnosticType: relationship({
        ref: 'DiagnosticType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }), 
    },
  });