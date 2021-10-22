import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text } from '@keystone-next/keystone/fields';

export const gateway = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['fabricationDate', 'housingType'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
      integrationId: text({isRequired: true, isIndexed: "unique"}),
      irrigator: relationship({
        ref: 'Irrigator.gateway',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      housingType: relationship({
        ref: 'GatewayHousingType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
      satelliteModem: relationship({
        ref: 'SatelliteModem.gateway',
        ui: {
          displayMode: 'cards',
          cardFields: ['manufacturerId', 'shipmentDate', 'isTransmitting', 'comment'],
          inlineEdit: { fields: ['manufacturerId', 'shipmentDate', 'isTransmitting', 'comment']},
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['manufacturerId', 'shipmentDate', 'isTransmitting', 'comment'] },
        },
        many: false
      }),
      satelliteAntenna: relationship({
        ref: 'SatelliteAntenna.gateway',
        ui: {
          displayMode: 'select',
        },
        many: false
      }),
      pcbGateway: relationship({
        ref: 'PcbGateway.gateway',
        ui: {
          createView: {
            fieldMode: 'hidden'
        }
        },
        many: false,
      }),
      loraAntennaType: relationship({
        ref: 'LoraAntennaType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
    },
  });