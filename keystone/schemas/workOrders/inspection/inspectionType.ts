import { list } from "@keystone-next/keystone";

import { text, select, relationship } from "@keystone-next/keystone/fields";

export const inspectionType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name', 'type'],
    },
  },
  fields: {
    name: text({ isRequired: true, isIndexed: 'unique' }),
    type: relationship({
        ref: 'asset_type.inspection_type',
        many: false
    }),
  },
});
