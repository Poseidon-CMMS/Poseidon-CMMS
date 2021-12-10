import { list } from '@keystone-next/keystone';

import { text, relationship } from '@keystone-next/keystone/fields';

import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';


export const city = list({
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('province'),
      },
    fields: {
      name:  text({ isRequired: true }),
      province: relationship({
        ref: 'province.city',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      field: relationship({
        ref: 'field.city',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    },
  });