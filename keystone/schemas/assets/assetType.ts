import { list } from "@keystone-6/core";

import { relationship, text } from "@keystone-6/core/fields";
import { isAdmin } from "../../utils/accessControl";

export const assetType = list({
  ui: {
    isHidden: true,
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
    }),
    inspection_type: relationship({
      ref: "inspection_type.type",
      many: true,
    }),
    autopsy_type: relationship({
      ref: "autopsy_type.type",
      many: true,
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
