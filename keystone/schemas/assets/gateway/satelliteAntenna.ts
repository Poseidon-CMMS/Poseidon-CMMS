import { list } from '@keystone-next/keystone';

import { relationship, text } from '@keystone-next/keystone/fields';

export const satelliteAntenna = list({
    ui: {
      listView: {
        initialColumns: [],
      },
      labelField: 'manufacturer_id'
    },
    fields: {
      manufacturer_id: text({isRequired: true, isIndexed: 'unique'}),
      gateway: relationship({
        ref: 'gateway.satellite_antenna',
        ui: {
          createView: {
              fieldMode: 'hidden'
          }
        },
        many: false,
      }),
      storage_location: relationship({
        ref: 'storage_location.satellite_antenna',
        ui: {
          displayMode: 'select',
          labelField: 'name',
        },
        many: false,
      }),
    },
  });