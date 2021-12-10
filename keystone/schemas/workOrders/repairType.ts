import { list } from '@keystone-6/core';

import { text, select } from '@keystone-6/core/fields';

export const repairType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['type','name'],
    },
  },
  fields: {
    type: select({
                  validation: {
            isRequired: true,
          },
        options: [
            { label: 'Reparación dispositivo actual', value: 'repair' },
            { label: 'Cambio de dispositivo', value: 'replace' },
        ],
        ui: {
            displayMode: 'segmented-control',
        },
      }),
    name: text({           validation: {
            isRequired: true,
          }, isIndexed: 'unique' }),
  },
});
