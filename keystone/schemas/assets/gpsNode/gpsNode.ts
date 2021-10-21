import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text } from '@keystone-next/keystone/fields';

import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const gpsNode = list({
    ui: {
      listView: {
        initialColumns: ['fabricationDate'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
      integrationId: text({isRequired: true, isIndexed: 'unique'}),
      internalPhoto: text(),
      externalPhoto: text(),
      irrigator: relationship({
        ref: 'Irrigator.gpsNode',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      batteryType: relationship({
        ref: 'BatteryType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      gpsAntennaType: relationship({
        ref: 'GpsAntennaType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      nodeHousingType: relationship({
        ref: 'NodeHousingType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      loraAntennaType: relationship({
        ref: 'LoraAntennaType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      solarPanelType: relationship({
        ref: 'SolarPanelType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      pcbNode: relationship({
        ref: 'PcbNode.gpsNode',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabricationDate', 'integrationId'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false
      }),
    },
  });