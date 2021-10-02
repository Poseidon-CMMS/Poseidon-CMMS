import { list } from '@keystone-next/keystone';

import {
    // Scalar types
    select,
    timestamp,
  
    // Relationship type
    relationship,
  } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';

export const installUninstallRequest = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['creationDate', 'status','irrigator'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('irrigator'),
    },
    fields: {
      creationDate: timestamp({ isRequired: true }), //fecha de alta
      irrigator: relationship({
        ref: 'Irrigator.installUninstallRequest',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      status: select({
        isRequired: true,
        options: [
          { label: 'Abierta', value: 'open' },
          { label: 'Asignada', value: 'assigned' },
          { label: 'Realizada', value: 'done' },
          { label: 'Completada', value: 'completed' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
    },
  });