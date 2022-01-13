import { list } from "@keystone-6/core";

import { text, float, relationship } from "@keystone-6/core/fields";
import { isAdmin } from "../../utils/accessControl";

export const storageLocation = list({
  ui: {
    listView: {
      initialColumns: ["name", "lat", "long"],
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    lat: float({
      validation: {
        isRequired: true,
      },
    }),
    long: float({
      validation: {
        isRequired: true,
      },
    }),
    gateway: relationship({
      ref: "gateway.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    pcb_gateway: relationship({
      ref: "pcb_gateway.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    gps_node: relationship({
      ref: "gps_node.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    satellite_modem: relationship({
      ref: "satellite_modem.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    pcb_node: relationship({
      ref: "pcb_node.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    satellite_antenna: relationship({
      ref: "satellite_antenna.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    //People
    user: relationship({
      ref: "user.storage_location",
      ui: {
        displayMode: "cards",
        cardFields: ["email"],
        linkToItem: true,
        inlineConnect: true,
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
