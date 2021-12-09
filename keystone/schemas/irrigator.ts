import { list } from '@keystone-next/keystone';

import { graphql } from '@keystone-next/keystone/types';
import { checkbox, float, select, text, relationship, virtual } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../hooks/relationshipRequiredCheckerHook';

export const irrigator = list({
    ui: {
      listView: {
        initialColumns: ['integrationID','name', 'lat', 'long', 'status', 'enabled', 'comment'],
      },
    },
    fields: {
      integrationID: text({ isRequired: true }),
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
      comment: text({ isRequired: false }),

      //6 relations
      gateway: relationship({
        ref: 'gateway.irrigator',
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
        ref: 'gpsNode.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabricationDate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      field: relationship({
        ref: 'field.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'gate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      installUninstallRequest: relationship({
        ref: 'installUninstallRequest.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      hdwIssue: relationship({
        ref: 'hdwIssue.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate', 'observations'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
      pressureSensor: relationship({
        ref: 'pressureSensor.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['manufacturerId', 'status', 'order'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      transmissionStatus: virtual({
        field: graphql.field({
          type: graphql.String,
          async resolve(item, args, context) {
            const later = (delay: number, value: string) :Promise<string> =>
                  new Promise(resolve => setTimeout(resolve, delay, value));
    
            return await  later(300,Math.random()>0.5?"transmitting":"error");
          },
        }),
      }),
    },
  });