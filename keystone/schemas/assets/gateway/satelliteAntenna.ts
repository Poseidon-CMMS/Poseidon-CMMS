import { list } from '@keystone-next/keystone';

import { relationship, text } from '@keystone-next/keystone/fields';

export const satelliteAntenna = list({
    ui: {
      listView: {
        initialColumns: [],
      },
      labelField: 'serialNumber'
    },
    fields: {
      serialNumber: text({isRequired: true, isIndexed: 'unique'}),
      gateway: relationship({
        ref: 'Gateway.satelliteAntenna',
        ui: {
          createView: {
              fieldMode: 'hidden'
          }
        },
        many: false,
      }),
    },
  });