import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text } from '@keystone-next/keystone/fields';

import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const gpsNode = list({
    ui: {
      listView: {
        initialColumns: ['integration_id', 'fabrication_date'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
      integrationId: text({isRequired: true, isIndexed: 'unique'}),
      internalPhoto: text(),
      externalPhoto: text(),
      irrigator: relationship({
        ref: 'irrigator.gpsNode',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      batteryType: relationship({
        ref: 'battery_type',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      gpsAntennaType: relationship({
        ref: 'gpsAntennaType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      nodeHousingType: relationship({
        ref: 'nodeHousingType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      loraAntennaType: relationship({
        ref: 'loraAntennaType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      solarPanelType: relationship({
        ref: 'solarPanelType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      pcbNode: relationship({
        ref: 'pcbNode.gpsNode',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabrication_date', 'integration_id'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false
      }),
      storageLocation: relationship({
        ref: 'storageLocation.gpsNode',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
      hdwIssue: relationship({
        ref: 'hdwIssue.gpsNode',
        ui: {
          createView: {
            fieldMode: 'hidden'
          }
        },
        many: false,
      }),
    },
  });