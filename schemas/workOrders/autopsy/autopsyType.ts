import { list } from "@keystone-6/core";

import { text, relationship, select } from "@keystone-6/core/fields";
import { isAdmin } from "../../../utils/accessControl";

export const autopsyType = list({
  ui: {
    listView: {
      initialColumns: ["name", "asset_type", "component", "root"],
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    asset_type: relationship({
      ref: "asset_type.autopsy_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    component: relationship({
      ref: "component_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    root: relationship({
      ref: "autopsy_root",
      ui: {
        displayMode: "select",
        labelField: "name",
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
    },
  },
});
