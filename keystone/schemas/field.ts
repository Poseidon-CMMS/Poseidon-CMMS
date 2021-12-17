import { list } from '@keystone-6/core';

import { relationship, text } from '@keystone-6/core/fields';
import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';
import { isAdmin } from '../utils/accessControl';

export const field = list({
    description: 'Campo',
    ui: {
      listView: {
        initialColumns: ['name', 'gate', 'phone', 'zone', 'province', 'city'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('zone'),
    },
    fields: {
      name: text({           validation: {
            isRequired: true,
          } }),
      gate: text({ validation: {
            isRequired: false,
          }}),
      phone: text({ validation: {
            isRequired: false,
          }}),
      irrigator: relationship({
        ref: 'irrigator.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      zone: relationship({
        ref: 'zone.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['code', 'name', 'is_foreign'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      province: relationship({
        ref: 'province.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      city: relationship({
        ref: 'city.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      client: relationship({
        ref: 'client.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      hdw_issue: relationship({
        ref: 'hdw_issue.field',
        ui: {
          createView: {
            fieldMode: 'hidden'
          }
        },
        many: false,
      }),
    },
    access: {
      operation: {
        query: isAdmin,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      }
    },
  });