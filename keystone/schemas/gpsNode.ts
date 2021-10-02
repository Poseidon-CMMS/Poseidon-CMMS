import { list } from '@keystone-next/keystone';

import {
    timestamp,
    relationship,
  } from '@keystone-next/keystone/fields';

export const gpsNode = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['fabricationDate'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
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
    },
  });