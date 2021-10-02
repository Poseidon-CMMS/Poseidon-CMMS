import { list } from '@keystone-next/keystone';

import {
    select,
    text,
    timestamp,
    relationship,
    checkbox,
    decimal,
  } from '@keystone-next/keystone/fields';

export const fieldTechnician = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['name', 'email', 'isSeasonal', 'seasonalWage'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true }),
      isSeasonal: checkbox({ isRequired: true, defaultValue: false}), // TODO: un hook que revise q seasonalWage sea un numero valido en el caos de q isSeasonal sea true
      seasonalWage: decimal({ isRequired: false }),
      zone: relationship({
        ref: 'Zone.fieldTechnician',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'isForeign'],
          inlineEdit: { fields: ['name', 'isForeign'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name', 'isForeign'] },
        },
        many: true,
      }),
    },
  });