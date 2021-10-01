import { list } from '@keystone-next/keystone';

import {
    // Scalar types
    checkbox,
    integer,
    json,
    float,
    password,
    select,
    text,
    timestamp,
  
    // Relationship type
    relationship,
  
    // Index types
    autoIncrement,
  
    // Virtual type
    virtual,
  
    // File types
    file,
    image,
  } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';

export const installUninstallRequest = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['creationDate', 'irrigator'],
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
          cardFields: ['name', 'lat', 'long', 'status', 'enabled', 'description'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
    },
  });