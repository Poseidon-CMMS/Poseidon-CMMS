import { list } from '@keystone-next/keystone';

import { timestamp, relationship, text, checkbox } from '@keystone-next/keystone/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';

export const satelliteModem = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['manufacturer_id', 'shipment_date', 'is_transmitting', 'comment', 'gateway'],
      },
    },
    hooks: {
      validateInput: relationshipRequiredCheckerHook('satellite_modem_type'),
    },
    fields: {
      manufacturer_id: text({isRequired: true, isIndexed: 'unique'}),
      shipment_date: timestamp({ isRequired: true }),
      is_transmitting: checkbox({defaultValue: false, isRequired: true}),
      comment: text(),
      satellite_modem_type: relationship({
        ref: 'satellite_modem_type.satellite_modem',
        ui: {
          displayMode: 'cards',
          cardFields: ['reference_number', 'version'],
          inlineConnect: true,
        }
      }),
      gateway: relationship({
        ref: 'gateway.satellite_modem',
        ui: {
          displayMode: 'select',
        },
        many: false,
      }),
      storage_location: relationship({
        ref: 'storage_location.satellite_modem',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
    },
  });