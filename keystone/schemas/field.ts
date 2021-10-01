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

export const field = list({
    ui: {
      listView: {
        initialColumns: ['name', 'gate', 'irrigator'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      gate: text({ isRequired: false}),
      irrigator: relationship({
        ref: 'Irrigator.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status', 'enabled', 'description'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      
    },
  });