import { list } from "@keystone-6/core";

import { text, select, relationship } from "@keystone-6/core/fields";
import { isAdmin } from "../../../utils/accessControl";

export const autopsyType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ["name", "type"],
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    type: relationship({
      ref: 'asset_type.autopsy_type',
      ui: {
        displayMode: 'select',
        labelField: 'name'
      },
      many: false
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
