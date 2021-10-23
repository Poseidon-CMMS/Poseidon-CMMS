import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text, checkbox } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const satelliteModem = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['manufacturerId', 'shipmentDate', 'isTransmitting', 'comment', 'gateway'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('satelliteModemType'),
    },
    fields: {
      manufacturerId: text({isRequired: true, isIndexed: 'unique'}),
      shipmentDate: timestamp({ isRequired: true }),
      isTransmitting: checkbox({defaultValue: false, isRequired: true}),
      comment: text(),
      satelliteModemType: relationship({
        ref: 'SatelliteModemType.satelliteModem',
        ui: {
          displayMode: 'cards',
          cardFields: ['referenceNumber', 'version'],
          inlineConnect: true,
        }
      }),
      gateway: relationship({
        ref: 'Gateway.satelliteModem',
        ui: {
          displayMode: 'select',
        },
        many: false,
      }),
      storageLocation: relationship({
        ref: 'StorageLocation.satelliteModem',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
    },
  });