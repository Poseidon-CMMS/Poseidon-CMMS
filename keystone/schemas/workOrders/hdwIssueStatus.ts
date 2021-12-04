import { list } from "@keystone-next/keystone";

import { text, select } from "@keystone-next/keystone/fields";

export const hdwIssueStatus = list({
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
