import { list } from "@keystone-6/core";

import { text, select, relationship, checkbox } from "@keystone-6/core/fields";
import { isAdmin } from "../../../utils/accessControl";

export const inspectionType = list({
  ui: {
    listView: {
      initialColumns: ["name", "type"],
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    type: relationship({
      ref: "asset_type.inspection_type",
      many: false,
    }),
    pot_sat: checkbox({
      defaultValue: false,
    }),
    gateway_battery_voltage: checkbox({
      defaultValue: false,
    }),
    gps_node_battery_voltage: checkbox({
      defaultValue: false,
    }),
    lora_power: checkbox({
      defaultValue: false,
    }),
    pressure_sensor_signal: checkbox({
      defaultValue: false,
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
