import { list } from '@keystone-next/keystone';

import { select, timestamp, relationship } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../hooks/relationshipRequiredCheckerHook';

export const installUninstallRequest = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['creation_date', 'status','irrigator'],
      },
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('irrigator'),
    },
    fields: {
      creation_date: timestamp({ isRequired: true }), //fecha de alta
      irrigator: relationship({
        ref: 'irrigator.install_uninstall_request',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
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
      work_order: relationship({
        ref: 'work_order.install_uninstall_request',
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