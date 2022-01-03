import { list } from "@keystone-6/core";

import { relationship, text, select, integer } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../../../utils/accessControl";

export const pressureSensor = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: [
        "integration_id",
        "status",
        "irrigator",
        "pressure_sensor_type",
        "order",
        "comments",
      ],
    },
    labelField: "integration_id",
  },
  hooks: {
    // validateInput: relationshipRequiredCheckerHook('pressure_sensor_type'), //TODO: versi esto se puede arreglar
  },
  fields: {
    integration_id: text({
      validation: {
        isRequired: true,
      },
    }),
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
    comments: text(),
    order: integer(),
    image: text(),
    irrigator: relationship({
      ref: "irrigator.pressure_sensor",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    pressure_sensor_type: relationship({
      ref: "pressure_sensor_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
    storage_location: relationship({
      ref: "storage_location.pressure_sensor",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
    hdw_issue: relationship({
      ref: "hdw_issue.pressure_sensor",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    installed_in_repair: relationship({
      //NO es una reparacion a este sensor de presión. Es una reparacion a algún equipo de riego, en la cual este sensor de presión se utilizó para reemplazar uno que estaba roto
      ref: "repair.new_pressure_sensor",
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
