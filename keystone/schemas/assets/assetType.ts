import { list } from "@keystone-next/keystone";

import { text } from "@keystone-next/keystone/fields";

export const assetType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name'],
    },
  },
  fields: {
    name: text({ isRequired: true, isIndexed: 'unique' }),
  },
});
