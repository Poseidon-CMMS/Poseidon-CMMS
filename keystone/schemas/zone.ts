import { list } from '@keystone-6/core';

import { checkbox, text, relationship } from '@keystone-6/core/fields';

export const zone = list({
    ui: {
      listView: {
        initialColumns: ['code', 'name', 'is_foreign'],
      },
    },
    fields: {
      name: text({           validation: {
            isRequired: true,
          } }),
      code: text(),
      is_foreign: checkbox({defaultValue: false}),
      field: relationship({
        ref: 'field.zone',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'gate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      user: relationship({
        ref: 'user.zone',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    },
  });