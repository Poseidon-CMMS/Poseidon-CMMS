import { list } from '@keystone-next/keystone';

import { checkbox, text, relationship } from '@keystone-next/keystone/fields';

export const zone = list({
    ui: {
      listView: {
        initialColumns: ['code', 'name', 'is_foreign'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      code: text(),
      isForeign: checkbox({ isRequired: true, defaultValue: false}),
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
      fieldTechnician: relationship({
        ref: 'fieldTechnician.zone',
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