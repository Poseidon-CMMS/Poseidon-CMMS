import { list } from '@keystone-next/keystone';

import { text, timestamp, relationship } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const diagnostic = list({
    ui: {
      listView: {
        initialColumns: ['hdsIssue', 'creationDate','diagnosticDate','user', 'comments'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('hdwIssue'),
    },
    fields: {
      creationDate: timestamp({ isRequired: true }), //fecha de alta
      diagnosticDate: timestamp(),
      comments: text(),
      user: relationship({
        ref: 'Diagnostic.user'
      }),
      hdwIssue: relationship({
        ref: 'HdwIssue.diagnostic',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate', 'irrigator', 'observations'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      diagnosticType: relationship({
        ref: 'DiagnosticType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
    },
  });