import { list } from '@keystone-6/core';

import { relationship, text } from '@keystone-6/core/fields';
import { isAdmin } from '../../../utils/accessControl';

export const satelliteAntenna = list({
    ui: {
      listView: {
        initialColumns: [],
      },
      labelField: 'manufacturer_id'
    },
    fields: {
      manufacturer_id: text({          validation: {
            isRequired: true,
          }, isIndexed: 'unique'}),
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
    access: {
      operation: {
        query: isAdmin,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      }
    },
  });