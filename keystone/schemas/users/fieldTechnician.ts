import { list } from '@keystone-next/keystone';

import { text, relationship, checkbox, decimal} from '@keystone-next/keystone/fields';
import {relationshipRequiredCheckerHook } from '../../hooks/relationshipRequiredCheckerHook';

export const fieldTechnician = list({
    ui: {
      listView: {
        initialColumns: ['name', 'email'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('zone'), 
      // TODO: un hook que revise q seasonalWage sea un numero valido en el caos de q isSeasonal sea true
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true }),
      zone: relationship({
        ref: 'Zone.fieldTechnician',
        ui: {
          displayMode: 'cards',
          cardFields: ['code', 'name', 'isForeign'],
          inlineEdit: { fields: ['name', 'isForeign'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name', 'isForeign'] },
        },
        many: true,
      }),
      storageLocation: relationship({
        ref: 'StorageLocation.fieldTechnician',
        ui: {
          displayMode: 'select',
          labelField: 'name',
        },
        many: false,
      }),
    },
  });