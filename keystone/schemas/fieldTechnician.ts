import { list } from '@keystone-next/keystone';

import { text, relationship, checkbox, decimal} from '@keystone-next/keystone/fields';
import {relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';

export const fieldTechnician = list({
    ui: {
      listView: {
        initialColumns: ['name', 'email', 'isSeasonal', 'seasonalWage'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('zone'), 
      // TODO: un hook que revise q seasonalWage sea un numero valido en el caos de q isSeasonal sea true
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true }),
      isSeasonal: checkbox({ isRequired: true, defaultValue: false}),
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
      wageType: relationship({ // Solo para tecnicos con isSeasonal = false
        ref: 'FieldTechnicianWageType.fieldTechnician',
        ui: {
          displayMode: 'select',

        },
        many: false
      })
    },
  });