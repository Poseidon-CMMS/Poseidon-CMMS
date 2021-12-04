import { list } from "@keystone-next/keystone";

import { text, float, relationship} from "@keystone-next/keystone/fields";

export const storageLocation = list({
  ui: {
    listView: {
      initialColumns: ['name','lat','long'],
    },
  },
  fields: {
    name: text({ isRequired: true, isIndexed: 'unique' }),
    lat: float({ isRequired: true }),
    long: float({ isRequired: true }),
    gateway: relationship({
        ref: 'Gateway.storageLocation',
        ui: {
          displayMode: 'cards',
          cardFields: ['integrationId'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    pcbGateway: relationship({
        ref: 'PcbGateway.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['integrationId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    gpsNode: relationship({
        ref: 'GpsNode.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['integrationId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    pressureSensor: relationship({
        ref: 'PressureSensor.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturerId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    satelliteModem: relationship({
        ref: 'SatelliteModem.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturerId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    pcbNode: relationship({
        ref: 'PcbNode.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['integrationId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    satelliteAntenna: relationship({
        ref: 'SatelliteAntenna.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturerId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    //People
    fieldTechnician: relationship({
        ref: 'FieldTechnician.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['email'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: false,
    }),
  },
});
