import { list } from "@keystone-6/core";

import { select, timestamp, relationship } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";

export const repair = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: ["date", "status", "work_order"],
    },
    labelField: "date",
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("work_order"),
  },
  fields: {
    date: timestamp({
      validation: {
        isRequired: true,
      },
    }), //fecha de alta
    hdw_issue: relationship({
      ref: "hdw_issue.repair",
      ui: {
        displayMode: "cards",
        cardFields: [
          "creation_date",
          "irrigator",
          "time_to_repair_hours",
          "comments",
        ],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
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
    repair_type: select({
      validation: {
        isRequired: true,
      },
      options: [
        { label: "Cambio de dispositivo", value: "device_change" },
        { label: "Reparación de dispositivo actual", value: "device_repair" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    work_order: relationship({
      ref: "work_order.repair",
      ui: {
        displayMode: "cards",
        cardFields: ["work_date", "km_traveled", "comment"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
  },
});
