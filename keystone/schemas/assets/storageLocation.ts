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
        ref: 'gateway.storageLocation',
        ui: {
          displayMode: 'cards',
          cardFields: ['integrationId'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    pcbGateway: relationship({
        ref: 'pcbGateway.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['integrationId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    gpsNode: relationship({
        ref: 'gpsNode.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['integrationId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    pressureSensor: relationship({
        ref: 'pressureSensor.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturerId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    satelliteModem: relationship({
        ref: 'satelliteModem.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturerId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    pcbNode: relationship({
        ref: 'pcbNode.storageLocation',
        ui: {
        displayMode: 'cards',
        cardFields: ['integrationId'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    satelliteAntenna: relationship({
        ref: 'satelliteAntenna.storageLocation',
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
        ref: 'fieldTechnician.storageLocation',
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
