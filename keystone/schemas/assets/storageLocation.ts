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
    stock_movement_from: relationship({
      ref: "stock_movement.location_from",
      ui: {
        displayMode: "cards",
        cardFields: ["date"],
        linkToItem: true,
        inlineConnect: true,
        hideCreate: true,
        
      },
      many: true,
    }),
    stock_movement_to: relationship({
      ref: "stock_movement.location_to",
      ui: {
        displayMode: "cards",
        cardFields: ["date"],
        linkToItem: true,
        inlineConnect: true,
        hideCreate: true,
      },
      many: true,
    })
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
