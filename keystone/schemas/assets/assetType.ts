import { list } from "@keystone-6/core";

import { relationship, text } from "@keystone-6/core/fields";
import { isAdmin, isLoggedIn } from "../../utils/accessControl";

export const assetType = list({
  ui: {
    listView: {
      initialColumns: ["name"],
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    diagnostic_type: relationship({
      ref: "diagnostic_type.type",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    inspection_type: relationship({
      ref: "inspection_type.type",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    autopsy_type: relationship({
      ref: "autopsy_type.asset_type",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
  },
  access: {
    operation: {
      query: isLoggedIn,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});
