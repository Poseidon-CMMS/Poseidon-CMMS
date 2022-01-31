import { list } from "@keystone-6/core";

import { relationship, text, select, integer, image } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin, isLoggedIn } from "../../../utils/accessControl";

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
    validateInput: relationshipRequiredCheckerHook("pressure_sensor_type"), //TODO: versi esto se puede arreglar
  },
  fields: {
    integration_id: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
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
    image: image(),
    irrigator: relationship({
      ref: "irrigator.pressure_sensor",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
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
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    install_uninstall_request: relationship({
      ref: "install_uninstall_request.pressure_sensor",
      ui: {
        hideCreate: true,
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
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    stock_movement: relationship({
      ref: "stock_movement.pressure_sensor",
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
});
