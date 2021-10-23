import { list } from '@keystone-next/keystone';

import { checkbox, text, relationship } from '@keystone-next/keystone/fields';

export const zone = list({
    ui: {
      listView: {
        initialColumns: ['code', 'name', 'isForeign'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      code: text(),
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