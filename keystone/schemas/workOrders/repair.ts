import { list } from '@keystone-next/keystone';

import { select, timestamp, relationship } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../hooks/relationshipRequiredCheckerHook';

export const repair = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['date', 'status','work_order'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('work_order'),
    },
    fields: {
      date: timestamp({ isRequired: true }), //fecha de alta
      hdwIssue: relationship({
        ref: 'hdwIssue.repair',
        ui: {
          displayMode: 'cards',
          cardFields: ['creation_date', 'irrigator', 'TTR', 'observations'],
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
        ref: 'repair_type',
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
          cardFields: ['work_date', 'km_traveled', 'comment'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
    },
  });