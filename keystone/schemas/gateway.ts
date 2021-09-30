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

export const gateway = list({
    ui: {
      listView: {
        initialColumns: ['fabricationDate', 'housingType', 'loraAntennaPosition'],
      },
    },
    fields: {
      fabricationDate: timestamp({ isRequired: true }), //fecha de alta
      housingType: text({ isRequired: true }), //TODO preguntar el tipo, si va a haber ABM
      loraAntennaPosition: select({
        isRequired: true,
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