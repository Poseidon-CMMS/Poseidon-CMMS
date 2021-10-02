import { list } from '@keystone-next/keystone';

import {
    // Scalar types
    checkbox,
    float,
    select,
    text,

    // Relationship type
    relationship,
  } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';

export const irrigator = list({
    ui: {
      listView: {
        initialColumns: ['name', 'lat', 'long', 'status', 'enabled', 'comments'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      lat: float({ isRequired: true }),
      long: float({ isRequired: true }),
      status: select({
        isRequired: true,
        options: [
          { label: 'Sin telemetria', value: 'no-telemetry' },
          { label: 'Instalado', value: 'installed' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      enabled: checkbox({ isRequired: true, defaultValue: false }),
      comments: text({ isRequired: false }),

      //6 relations
      gateway: relationship({
        ref: 'Gateway.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabricationDate'],
          inlineEdit: { fields: ['fabricationDate'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['fabricationDate'] },
        },
        many: false,
        
      }),
      gpsNode: relationship({
        ref: 'GpsNode.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabricationDate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      field: relationship({
        ref: 'Field.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'gate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      installUninstallRequest: relationship({
        ref: 'InstallUninstallRequest.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      hdwIssue: relationship({
        ref: 'HdwIssue.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate', 'comments'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    },
  });