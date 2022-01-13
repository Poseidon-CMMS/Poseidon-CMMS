import { list } from "@keystone-6/core";

import { relationship, text } from "@keystone-6/core/fields";
import { isAdmin } from "../../../utils/accessControl";

export const gatewayHardwareVersion = list({
  ui: {
    labelField: "version",
    listView: {
      initialColumns: ["version"],
    },
  },
  fields: {
    version: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    pcb_gateway: relationship({
      ref: "pcb_gateway.hardware_version",
      ui: {
        displayMode: "count",
        createView: {
          fieldMode: "hidden",
        },
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
