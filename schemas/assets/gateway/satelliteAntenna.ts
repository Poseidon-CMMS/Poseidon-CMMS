import { list } from "@keystone-6/core";

import { relationship, text } from "@keystone-6/core/fields";
import { isAdmin } from "../../../utils/accessControl";

export const satelliteAntenna = list({
  ui: {
    listView: {
      initialColumns: ["integration_id", "gateway"],
    },
    labelField: "integration_id",
  },
  fields: {
    integration_id: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    gateway: relationship({
      ref: "gateway.satellite_antenna",
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
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
