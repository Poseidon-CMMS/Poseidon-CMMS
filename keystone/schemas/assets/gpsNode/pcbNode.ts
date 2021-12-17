import { list } from '@keystone-6/core';

import { timestamp, relationship, text, select } from '@keystone-6/core/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';
import { isAdmin } from '../../../utils/accessControl';

export const pcbNode = list({
    ui: {
      listView: {
        initialColumns: ['integration_id', 'fabrication_date'],
      },
    },
    hooks: {
      validateInput: () => {
        relationshipRequiredCheckerHook('firmware_version'),
        relationshipRequiredCheckerHook('hardware_version')
      },
    },
    fields: {
      integration_id: text({          validation: {
            isRequired: true,
          }, isIndexed: 'unique'}),
      fabrication_date: timestamp({           validation: {
            isRequired: true,
          } }),
      picture: text(),
      status: select({
                  validation: {
            isRequired: true,
          },
        options: [
          { label: 'OK', value: 'ok' },
          { label: 'Roto', value: 'broken' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      gps_node: relationship({
        ref: 'gps_node.pcb_node',
        ui: {
          createView: {
            fieldMode: 'hidden'
          }
        },
        many: false,
      }),
      firmware_version: relationship({
        ref: 'node_firmware_version.pcb_node',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      hardware_version: relationship({
        ref: 'node_hardware_version.pcb_node',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      storage_location: relationship({
        ref: 'storage_location.pcb_node',
        ui: {
          displayMode: 'select',
          labelField: 'name',
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
  },});