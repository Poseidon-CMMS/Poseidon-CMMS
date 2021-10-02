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

export const hardwareIssue = list({
    ui: {
      listView: {
        initialColumns: ['creationDate', 'diagnosticDate','closeIssueDate','TTR', 'comments'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('gateway'),
    },
    fields: {
      creationDate:  timestamp({ isRequired: true }),
      diagnosticDate:  timestamp({ isRequired: true }),
      closeIssueDate: timestamp({ isRequired: true }),
      TTR: float(),
      comments: text(),
      irrigator: relationship({
        ref: 'Irrigator.hdwIssue',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      
    },
  });