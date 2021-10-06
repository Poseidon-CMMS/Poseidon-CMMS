import { list } from '@keystone-next/keystone';

import { float, text, timestamp, relationship } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';

export const hardwareIssue = list({
    ui: {
      listView: {
        initialColumns: ['creationDate', 'diagnosticDate','closeIssueDate','TTR', 'comment'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('irrigator'),
    },
    fields: {
      creationDate:  timestamp({ isRequired: true }),
      diagnosticDate:  timestamp({ isRequired: true }),
      closeIssueDate: timestamp({ isRequired: true }),
      TTR: float(),
      comment: text(),
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