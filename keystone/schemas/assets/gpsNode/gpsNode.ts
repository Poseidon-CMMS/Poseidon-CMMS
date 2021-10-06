import { list } from '@keystone-next/keystone';

import {
    timestamp,
    relationship,
    text,
  } from '@keystone-next/keystone/fields';

export const gpsNode = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['fabricationDate'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
      internalPhoto: text(),
      externalPhoto: text(),
      irrigator: relationship({ //TODO faltan todas las relaciones con las entidades chiquitas
        ref: 'Irrigator.gpsNode',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      loraAntennaPosition: relationship({
        ref: 'LoraAntennaPosition',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
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
      nodeLoraAntennaType: relationship({
        ref: 'NodeLoraAntennaType',
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