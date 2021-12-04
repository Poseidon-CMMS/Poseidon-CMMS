import { list } from '@keystone-next/keystone';

import { relationship, text, select, integer } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const pressureSensor = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['manufacturerId', 'status', 'irrigator', 'pressureSensorType', 'order','comments'],
      },
      labelField: 'manufacturerId',
    },
    hooks: {
        validateInput: relationshipRequiredCheckerHook('pressureSensorType'),
    },
    fields: {
      manufacturerId: text({ isRequired: true }),
      status: select({
        isRequired: true,
        options: [
          { label: 'OK', value: 'ok' },
          { label: 'Roto', value: 'broken' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      comments: text(),
      order: integer(),
      image: text(),
      irrigator: relationship({
        ref: 'Irrigator.pressureSensor',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      pressureSensorType: relationship({
        ref: 'PressureSensorType',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
      storageLocation: relationship({
        ref: 'StorageLocation.pressureSensor',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
    },
  });