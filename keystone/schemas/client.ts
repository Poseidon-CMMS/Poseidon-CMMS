import { list } from '@keystone-6/core';

import { text, relationship } from '@keystone-6/core/fields';

export const client = list({
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
    fields: {
      name: text({           validation: {
            isRequired: true,
          } }),
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