import { list } from '@keystone-next/keystone';

import { text, relationship } from '@keystone-next/keystone/fields';

export const client = list({
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      field: relationship({
        ref: 'field.client',
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