import { list } from '@keystone-next/keystone';

import { relationship, text } from '@keystone-next/keystone/fields';

export const satelliteAntenna = list({
    ui: {
      listView: {
        initialColumns: [],
      },
      labelField: 'manufacturerId'
    },
    fields: {
      manufacturerId: text({isRequired: true, isIndexed: 'unique'}),
      gateway: relationship({
        ref: 'gateway.satelliteAntenna',
        ui: {
          createView: {
              fieldMode: 'hidden'
          }
        },
        many: false,
      }),
      storageLocation: relationship({
        ref: 'storageLocation.satelliteAntenna',
        ui: {
          displayMode: 'select',
          labelField: 'name',
        },
        many: false,
      }),
    },
  });