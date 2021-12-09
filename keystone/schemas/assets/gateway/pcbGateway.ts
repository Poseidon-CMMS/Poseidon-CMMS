import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text, select } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const pcbGateway = list({
    ui: {
      listView: {
        initialColumns: ['integration_id', 'fabrication_date', 'status'],
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
      picture: text({isRequired: false}),
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
      gateway: relationship({
        ref: 'gateway.pcbGateway',
        ui: {
          createView: {
            fieldMode: 'hidden'
        }
        },
        many: false,
      }),
      firmwareVersion: relationship({
        ref: 'gatewayFirmwareVersion.pcbGateway',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      hardwareVersion: relationship({
        ref: 'gatewayHardwareVersion.pcbGateway',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      storageLocation: relationship({
        ref: 'storageLocation.pcbGateway',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
  }});