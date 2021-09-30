import { list } from '@keystone-next/keystone';

import {
    // Scalar types
    checkbox,
    integer,
    json,
    float,
    password,
    select,
    text,
    timestamp,
  
    // Relationship type
    relationship,
  
    // Index types
    autoIncrement,
  
    // Virtual type
    virtual,
  
    // File types
    file,
    image,
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
          cardFields: ['name', 'lat', 'long', 'status', 'enabled', 'description'],
          inlineEdit: { fields: ['name', 'lat', 'long', 'status', 'enabled', 'description'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name', 'lat', 'long', 'status', 'enabled', 'description'] },
        },
        many: false,
      }),
    },
  });