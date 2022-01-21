import { list } from "@keystone-6/core";

import { text, relationship } from "@keystone-6/core/fields";

import { relationshipRequiredCheckerHook } from "../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../utils/accessControl";

export const city = list({
  ui: {
    listView: {
      initialColumns: ["name"],
    },
  },
  hooks: {
    // validateInput: relationshipRequiredCheckerHook("province"),
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    province: relationship({
      ref: "province.city",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    field: relationship({
      ref: "field.city",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        linkToItem: true,
        inlineConnect: true,
      },
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
