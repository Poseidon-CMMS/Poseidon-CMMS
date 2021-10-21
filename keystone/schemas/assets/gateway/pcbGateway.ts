import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text, select } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const pcbGateway = list({
    ui: {
      listView: {
        initialColumns: ['integrationId', 'fabricationDate', 'status'],
      },
    },
    hooks: {
      validateInput: () => {
        relationshipRequiredCheckerHook('firmwareVersion'),
        relationshipRequiredCheckerHook('hardwareVersion')
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
        ref: 'Gateway.pcbGateway',
        ui: {
          createView: {
            fieldMode: 'hidden'
        }
        },
        many: false,
      }),
      firmwareVersion: relationship({
        ref: 'GatewayFirmwareVersion.pcbGateway',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      hardwareVersion: relationship({
        ref: 'GatewayHardwareVersion.pcbGateway',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
  }});