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
        ref: 'gateway.storage_location',
        ui: {
          displayMode: 'cards',
          cardFields: ['integration_id'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    pcb_gateway: relationship({
        ref: 'pcb_gateway.storage_location',
        ui: {
        displayMode: 'cards',
        cardFields: ['integration_id'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    gps_node: relationship({
        ref: 'gps_node.storage_location',
        ui: {
        displayMode: 'cards',
        cardFields: ['integration_id'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    pressure_sensor: relationship({
        ref: 'pressure_sensor.storage_location',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturer_id'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    satellite_modem: relationship({
        ref: 'satellite_modem.storage_location',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturer_id'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    pcb_node: relationship({
        ref: 'pcb_node.storage_location',
        ui: {
        displayMode: 'cards',
        cardFields: ['integration_id'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    satellite_antenna: relationship({
        ref: 'satellite_antenna.storage_location',
        ui: {
        displayMode: 'cards',
        cardFields: ['manufacturer_id'],
        linkToItem: true,
        inlineConnect: true,
        },
        many: true,
    }),
    //People
    field_technician: relationship({
        ref: 'field_technician.storage_location',
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
