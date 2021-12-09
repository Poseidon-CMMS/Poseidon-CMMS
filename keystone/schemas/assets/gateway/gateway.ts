import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text } from '@keystone-next/keystone/fields';

export const gateway = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['integration_id', 'fabrication_date', 'housing_type'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
      integrationId: text({isRequired: true, isIndexed: "unique"}),
      irrigator: relationship({
        ref: 'irrigator.gateway',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      housingType: relationship({
        ref: 'gatewayHousingType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
      satelliteModem: relationship({
        ref: 'satelliteModem.gateway',
        ui: {
          displayMode: 'cards',
          cardFields: ['manufacturer_id', 'shipment_date', 'is_transmitting', 'comment'],
          inlineEdit: { fields: ['manufacturer_id', 'shipment_date', 'is_transmitting', 'comment']},
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['manufacturer_id', 'shipment_date', 'is_transmitting', 'comment'] },
        },
        many: false
      }),
      satelliteAntenna: relationship({
        ref: 'satelliteAntenna.gateway',
        ui: {
          displayMode: 'select',
        },
        many: false
      }),
      pcbGateway: relationship({
        ref: 'pcbGateway.gateway',
        ui: {
          createView: {
            fieldMode: 'hidden'
        }
        },
        many: false,
      }),
      hdwIssue: relationship({
        ref: 'hdwIssue.gateway',
        ui: {
          createView: {
            fieldMode: 'hidden'
          }
        },
        many: false,
      }),
      loraAntennaType: relationship({
        ref: 'loraAntennaType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      storageLocation: relationship({
        ref: 'storageLocation.gateway',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
    },
  });