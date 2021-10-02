import { list } from '@keystone-next/keystone';

import {
    select,
    text,
    timestamp,
    relationship,
  } from '@keystone-next/keystone/fields';

export const gateway = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['fabricationDate', 'housingType', 'loraAntennaPosition'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
      housingType: text({ isRequired: true }), //TODO  cambiar a entidad
      loraAntennaPosition: select({
        isRequired: true, //TODO cambiar aenjtidad
        options: [
          { label: 'Arriba', value: 'above' },
          { label: 'Abajo', value: 'below' },
        ],
        ui: {
          displayMode: 'select',
        },
      }),
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
    },
  });