import { list } from '@keystone-6/core';

import { text, relationship, checkbox, decimal} from '@keystone-6/core/fields';
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
      name: text({           validation: {
            isRequired: true,
          } }),
      email: text({           validation: {
            isRequired: true,
          } }),
      zone: relationship({
        ref: 'zone.field_technician',
        ui: {
          displayMode: 'cards',
          cardFields: ['code', 'name', 'is_foreign'],
          inlineEdit: { fields: ['name', 'is_foreign'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name', 'is_foreign'] },
        },
        many: true,
      }),
      storage_location: relationship({
        ref: 'storage_location.field_technician',
        ui: {
          displayMode: 'select',
          labelField: 'name',
        },
        many: false,
      }),
    },
  });