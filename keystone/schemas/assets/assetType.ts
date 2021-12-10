import { list } from '@keystone-6/core';

import { relationship, text } from '@keystone-6/core/fields';

export const assetType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name'],
    },
  },
  fields: {
    name: text({           validation: {
            isRequired: true,
          }, isIndexed: 'unique' }),
    inspection: relationship({
      ref: 'inspection.device_with_problems',
      many: true
    }),
    inspection_type: relationship({
      ref: 'inspection_type.type',
      many: true
    })
  },
});
