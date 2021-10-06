import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const pcbNode = list({
    ui: {
      listView: {
        initialColumns: ['fabricationDate'],
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
      gpsNode: relationship({
        ref: 'GpsNode.pcbNode',
        ui: {
          createView: {
            fieldMode: 'hidden'
        }
        },
        many: false,
      }),
      firmwareVersion: relationship({
        ref: 'NodeFirmwareVersion.pcbNode',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
      hardwareVersion: relationship({
        ref: 'NodeHardwareVersion.pcbNode',
        ui: {
          displayMode: 'select',
          labelField: 'version'
        },
        many: false
      }),
  }});