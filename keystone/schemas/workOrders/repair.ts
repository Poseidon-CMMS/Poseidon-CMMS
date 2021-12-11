import { list } from '@keystone-6/core';

import { select, timestamp, relationship } from '@keystone-6/core/fields';
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
      date: timestamp({           validation: {
            isRequired: true,
          } }), //fecha de alta
      hdw_issue: relationship({
        ref: 'hdw_issue.repair',
        ui: {
          displayMode: 'cards',
          cardFields: ['creation_date', 'irrigator', 'TTR', 'comments'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      status: select({
                  validation: {
            isRequired: true,
          },
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
      repair_type: relationship({
        ref: 'repair_type',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      work_order: relationship({
        ref: 'work_order.repair',
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