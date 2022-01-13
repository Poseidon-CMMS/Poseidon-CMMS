import { list } from "@keystone-6/core";

import { select, timestamp, relationship, image, file } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../../utils/accessControl";

export const installUninstallRequest = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: ["creation_date", "completion_date", "close_date", "status", "irrigator"],
    },
  },
  hooks: {
    // validateInput: relationshipRequiredCheckerHook("irrigator"),
  },
  fields: {
    creation_date: timestamp({
      validation: {
        isRequired: true,
      },
    }), //fecha de creacion de la solicitud
    completion_date: timestamp({
      validation: {
        isRequired: false,
      },
    }), //fecha en la que realmente se hizo lo que habia que hacer (instalar o desinstalar)
    close_date: timestamp({
      validation: {
        isRequired: false,
      },
    }), //fecha en la que realmente se hizo lo que habia que hacer (instalar o desinstalar)
    irrigator: relationship({
      ref: "irrigator.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    gateway: relationship({
      ref: "gateway.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date"],
        inlineEdit: { fields: ["fabrication_date"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["fabrication_date"] },
      },
      many: false,
    }),
    gps_node: relationship({
      ref: "gps_node.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id", "status", "order"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    request_type: select({
      validation: { isRequired: true },
      options: [
        { label: "Instalación", value: "install" },
        { label: "Desinstalación", value: "uninstall" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    status: select({
      validation: {
        isRequired: true,
      },
      options: [
        { label: "Abierta", value: "open" },
        { label: "Asignada", value: "assigned" },
        { label: "Realizada", value: "done" },
        { label: "Completada", value: "completed" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    work_order: relationship({
      ref: "work_order.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["work_date", "km_traveled", "comment"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    gtw_image: image(),
    node_gps_image: image(),
    pressure_sensor_image: image(),
    log: file(),
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
