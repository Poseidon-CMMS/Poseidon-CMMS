import { list } from "@keystone-6/core";

import { timestamp, relationship, text } from "@keystone-6/core/fields";
import { isAdmin, isLoggedIn } from "../../../utils/accessControl";

export const gateway = list({
  ui: {
    listView: {
      initialColumns: ["integration_id", "fabrication_date", "irrigator"],
    },
    labelField: "integration_id",
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
    irrigator: relationship({
      ref: "irrigator.gateway",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    housing_type: relationship({
      ref: "gateway_housing_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
    satellite_modem: relationship({
      ref: "satellite_modem.gateway",
      ui: {
        displayMode: "cards",
        cardFields: [
          "integration_id",
          "shipment_date",
          "is_transmitting",
          "comment",
        ],
        inlineEdit: {
          fields: [
            "integration_id",
            "shipment_date",
            "is_transmitting",
            "comment",
            "satellite_modem_type",
          ],
        },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: {
          fields: [
            "integration_id",
            "shipment_date",
            "is_transmitting",
            "comment",
            "satellite_modem_type",
          ],
        },
      },
      many: false,
    }),
    satellite_antenna: relationship({
      ref: "satellite_antenna.gateway",
      ui: {
        displayMode: "select",
      },
      many: false,
    }),
    pcb_gateway: relationship({
      ref: "pcb_gateway.gateway",
      ui: {
      },
      many: false,
    }),
    hdw_issue: relationship({
      ref: "hdw_issue.gateway",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    install_uninstall_request: relationship({
      ref: "install_uninstall_request.gateway",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
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
    storage_location: relationship({
      ref: "storage_location.gateway",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
    installed_in_repair: relationship({
      //NO es una reparacion a este gateway. Es una reparacion a algún equipo de riego, en la cual este gateway se utilizó para reemplazar uno que estaba roto
      ref: "repair.new_gateway",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    stock_movement: relationship({
      ref: "stock_movement.gateway",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
  },

  access: {
    operation: {
      query: isLoggedIn,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
  hooks: {
    afterOperation: async ({ resolvedData, originalItem, item, context, operation }) => {
      if (operation !== "update") return;
      
      if(originalItem?.storage_locationId !== item?.storage_locationId){
        const result = await context.query.stock_movement.createOne({
          data: {
            date: new Date().toISOString(),
            location_from: {connect: {id: originalItem?.storage_locationId}},
            location_to: item?.storage_locationId? {connect: {id: item?.storage_locationId}}: undefined,
            gateway: {connect: {id: item?.id}}
          },
          query: 'id date location_from {id} location_to {id} gateway {id}',
        });
      }
    }
  }
});
