import { list } from '@keystone-next/keystone';

import {
    timestamp,
    relationship,
    text,
  } from '@keystone-next/keystone/fields';

export const pcbGateway = list({
    ui: {
      listView: {
        initialColumns: ['fabricationDate'],
      },
    },
    fields: {
      integrationId: text({isRequired: true, isIndexed: 'unique'}),
      fabricationDate: timestamp({ isRequired: true }),
      picture: text({isRequired: false}),
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