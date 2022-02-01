import { list } from "@keystone-6/core";

import { timestamp, relationship } from "@keystone-6/core/fields";
import { isAdmin } from "../../utils/accessControl"; 
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";

export const stockMovement = list({
  ui: {
    listView: {
      initialColumns: [
        "location_from",
        "location_to",
        "author",
        "gateway",
        "gps_node",
        "pressure_sensor",
      ],
    },
  },
  hooks: {
    validateInput: function (params) { //this middleware forces each stock movement to have only a single asset
      const {
        addValidationError,
        resolvedData,
        item,
        operation,
      } = params;

      let assetCount;
      if (operation === "create") {
        const gateway = resolvedData.gateway;
        const gps_node = resolvedData.gps_node;
        const pressure_sensor = resolvedData.pressure_sensor;
        //@ts-ignore
        assetCount = !!(gateway) + !!(gps_node) + !!(pressure_sensor);
        
      } else if (operation === "update") {
        const gateway = resolvedData.gateway?.disconnect ? null: resolvedData.gateway ? resolvedData.gateway : item.gatewayId;
        const gps_node = resolvedData.gps_node?.disconnect ? null: resolvedData.gps_node ? resolvedData.gps_node : item.gps_nodeId;
        const pressure_sensor = resolvedData.pressure_sensor?.disconnect ? null: resolvedData.pressure_sensor ? resolvedData.pressure_sensor : item.pressure_sensorId;
        //@ts-ignore
        assetCount = !!(gateway) + !!(gps_node) + !!(pressure_sensor);
      }

      if ( assetCount > 1){
        addValidationError(`Solo se permite un dispositivo por movimiento de stock`);
      } else if (assetCount === 0){
        addValidationError(`Debe seleccionar exactamente un dispositivo`);
      }
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
