import { list } from "@keystone-6/core";

import { timestamp, float, relationship } from "@keystone-6/core/fields";
import { isAdmin } from "../../utils/accessControl";

export const stockMovement = list({
  ui: {
    listView: {
      initialColumns: [
        "location_from",
        "location_to",
        "author"
      ],
    },
  },
  fields: {
    date: timestamp({
      validation: {
        isRequired: true,
      },
    }),
    location_from: relationship({
      ref: "storage_location.stock_movement_from",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    location_to: relationship({
      ref: "storage_location.stock_movement_to",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    gateway: relationship({
      ref: "gateway.stock_movement",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    gps_node: relationship({
      ref: "gps_node.stock_movement",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.stock_movement",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    //NULL si fue un cambio automatico
    author: relationship({
      ref: "user.created_stock_movement",
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
