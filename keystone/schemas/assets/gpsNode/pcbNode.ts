import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text, select } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

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
      integrationId: text({isRequired: true, isIndexed: 'unique'}),
      fabricationDate: timestamp({ isRequired: true }),
      picture: text(),
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
      gpsNode: relationship({
        ref: 'gpsNode.pcbNode',
        ui: {
          createView: {
            fieldMode: 'hidden'
          }
        },
        many: false,
      }),
      firmwareVersion: relationship({
        ref: 'nodeFirmwareVersion.pcbNode',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      hardwareVersion: relationship({
        ref: 'nodeHardwareVersion.pcbNode',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      storageLocation: relationship({
        ref: 'storageLocation.pcbNode',
        ui: {
          displayMode: 'select',
          labelField: 'name',
        },
        many: false,
      }),
  }});