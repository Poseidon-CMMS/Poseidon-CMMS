import { list } from '@keystone-next/keystone';

import { float, text, timestamp, relationship } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../hooks/relationshipRequiredCheckerHook';

export const hardwareIssue = list({
    ui: {
      listView: {
        initialColumns: ['creationDate', 'diagnosticDate','closeIssueDate','TTR', 'comment', 'observations'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('irrigator'),
    },
    fields: {
      creationDate:  timestamp({ isRequired: true }),
      diagnosticDate:  timestamp(),
      closeIssueDate: timestamp(),
      TTR: float(),
      downtime: float(),
      comment: text(),
      observations: text(),
      irrigator: relationship({
        ref: 'Irrigator.hdwIssue',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      diagnostic: relationship({
        ref: 'Diagnostic.hdwIssue',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate', 'comments'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      assetType: relationship({
        ref: 'AssetType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      gateway: relationship({
        ref: 'Gateway.hdwIssue',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabricationDate'],
          inlineEdit: { fields: ['fabricationDate'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['fabricationDate'] },
        },
        many: false,
      }),
      gpsNode: relationship({
        ref: 'GpsNode.hdwIssue',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabricationDate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      field: relationship({
        ref: 'Field.hdwIssue',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'gate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      pressureSensor: relationship({
        ref: 'PressureSensor.hdwIssue',
        ui: {
          displayMode: 'cards',
          cardFields: ['manufacturerId', 'status', 'order'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      repair: relationship({
        ref: 'Repair.hdwIssue',
        ui: {
          createView: {
            fieldMode: 'hidden'
          }
        },
        many: false,
      }),
    },
  });