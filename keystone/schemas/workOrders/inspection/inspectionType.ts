import { list } from '@keystone-6/core';

import { text, select, relationship } from '@keystone-6/core/fields';

export const inspectionType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name', 'type'],
    },
  },
  fields: {
    name: text({           validation: {
            isRequired: true,
          }, isIndexed: 'unique' }),
    type: relationship({
        ref: 'asset_type.inspection_type',
        many: false
    }),
  },
});
