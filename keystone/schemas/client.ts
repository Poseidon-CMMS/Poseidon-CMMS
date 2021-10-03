import { list } from '@keystone-next/keystone';

import {
    // Scalar types
    checkbox,  
    text,  
    // Relationship type
    relationship,
  } from '@keystone-next/keystone/fields';

export const client = list({
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      field: relationship({
        ref: 'Field.client',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'gate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
    },
  });