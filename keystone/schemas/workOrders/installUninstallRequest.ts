import { list } from "@keystone-6/core";

import { select, timestamp, relationship } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../../utils/accessControl";

export const installUninstallRequest = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: ["creation_date", "status", "irrigator"],
    },
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("irrigator"),
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
