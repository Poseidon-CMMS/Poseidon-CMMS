import { list } from "@keystone-6/core";

import { relationship, text } from "@keystone-6/core/fields";
import { isAdmin } from "../../utils/accessControl";

export const componentType = list({
  ui: {
    listView: {
      initialColumns: ["name"],
      initialSort: {
          field: 'name',
          direction: 'ASC'
      }
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
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