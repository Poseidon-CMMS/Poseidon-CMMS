import { list } from "@keystone-6/core";

import { timestamp, relationship, text } from "@keystone-6/core/fields";

import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../../../utils/accessControl";

export const gpsNode = list({
  ui: {
    listView: {
      initialColumns: ["integration_id", "fabrication_date"],
    },
  },
  fields: {
    fabrication_date: timestamp({
      validation: {
        isRequired: true,
      },
    }), //fecha de alta
    integration_id: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    internal_photo: text(),
    external_photo: text(),
    irrigator: relationship({
      ref: "irrigator.gps_node",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    battery_type: relationship({
      ref: "battery_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    gps_antenna_type: relationship({
      ref: "gps_antenna_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    node_housing_type: relationship({
      ref: "node_housing_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    lora_antenna_type: relationship({
      ref: "lora_antenna_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    solar_panel_type: relationship({
      ref: "solar_panel_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    pcb_node: relationship({
      ref: "pcb_node.gps_node",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date", "integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    storage_location: relationship({
      ref: "storage_location.gps_node",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
    hdw_issue: relationship({
      ref: "hdw_issue.gps_node",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    install_uninstall_request: relationship({
      ref: "install_uninstall_request.gps_node",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    installed_in_repair: relationship({
      //NO es una reparacion a este Nodo. Es una reparacion a algún equipo de riego, en la cual este Nodo se utilizó para reemplazar uno que estaba roto
      ref: "repair.new_gps_node",
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
