import { list } from '@keystone-next/keystone';

import {
    // Scalar types
    checkbox,  
    text,  
    // Relationship type
    relationship,
  } from '@keystone-next/keystone/fields';

export const zone = list({
    ui: {
      listView: {
        initialColumns: ['name', 'isForeign'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      isForeign: checkbox({ isRequired: true, defaultValue: false}),
      field: relationship({
        ref: 'Field.zone',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'gate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      fieldTechnician: relationship({
        ref: 'FieldTechnician.zone',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email', 'isSeasonal'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    },
  });