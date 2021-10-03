import { list } from '@keystone-next/keystone';

import {
    // Relationship type
    relationship,
    text
    } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';

export const field = list({
    ui: {
      listView: {
        initialColumns: ['name', 'gate', 'phone', 'zone', 'province', 'city'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('zone'),
    },
    fields: {
      name: text({ isRequired: true }),
      gate: text({ isRequired: false}),
      phone: text({ isRequired: false}),
      irrigator: relationship({
        ref: 'Irrigator.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      zone: relationship({
        ref: 'Zone.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'isForeign'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      province: relationship({
        ref: 'Province.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      city: relationship({
        ref: 'City.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      client: relationship({
        ref: 'Client.field',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
    },
  });