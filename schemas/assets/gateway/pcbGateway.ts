import { list } from "@keystone-6/core";

import { timestamp, relationship, text, select, image } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../../../utils/accessControl";

export const pcbGateway = list({
  ui: {
    listView: {
      initialColumns: ["integration_id", "fabrication_date", "status", "firmware_version", "hardware_version"],
    },
    labelField: "integration_id",

  },
  hooks: {
    validateInput: (params) => {
        relationshipRequiredCheckerHook("firmware_version")(params);
        relationshipRequiredCheckerHook("hardware_version")(params);
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
    picture: image(),
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
