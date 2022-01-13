import { list } from "@keystone-6/core";

import { timestamp, relationship, text, select } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../../../utils/accessControl";

export const pcbGateway = list({
  ui: {
    listView: {
      initialColumns: ["integration_id", "fabrication_date", "status"],
    },
  },
  hooks: {
    validateInput: () => {
      relationshipRequiredCheckerHook("firmware_version"),
        relationshipRequiredCheckerHook("hardware_version");
    },
  },
  fields: {
    integration_id: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    fabrication_date: timestamp({
      validation: {
        isRequired: true,
      },
    }),
    picture: text({
      validation: {
        isRequired: false,
      },
    }),
    status: select({
      validation: {
        isRequired: true,
      },
      options: [
        { label: "OK", value: "ok" },
        { label: "Roto", value: "broken" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    gateway: relationship({
      ref: "gateway.pcb_gateway",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    firmware_version: relationship({
      ref: "gateway_firmware_version.pcb_gateway",
      ui: {
        displayMode: "select",
        labelField: "version",
      },
      many: false,
    }),
    hardware_version: relationship({
      ref: "gateway_hardware_version.pcb_gateway",
      ui: {
        displayMode: "select",
        labelField: "version",
      },
      many: false,
    }),
    storage_location: relationship({
      ref: "storage_location.pcb_gateway",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
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
