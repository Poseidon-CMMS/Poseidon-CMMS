import { list } from '@keystone-next/keystone';

import { select, timestamp, relationship } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../hooks/relationshipRequiredCheckerHook';

export const repair = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['date', 'status','workOrder'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('workOrder'),
    },
    fields: {
      date: timestamp({ isRequired: true }), //fecha de alta
      hdwIssue: relationship({
        ref: 'hdwIssue.repair',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate', 'irrigator', 'TTR', 'observations'],
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
      repairType: relationship({
        ref: 'repairType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      workOrder: relationship({
        ref: 'workOrder.repair',
        ui: {
          displayMode: 'cards',
          cardFields: ['workDate', 'kmTraveled', 'comment'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
    },
  });