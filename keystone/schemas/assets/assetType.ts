import { list } from "@keystone-next/keystone";

import { relationship, text } from "@keystone-next/keystone/fields";

export const assetType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name'],
    },
  },
  fields: {
    name: text({ isRequired: true, isIndexed: 'unique' }),
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
