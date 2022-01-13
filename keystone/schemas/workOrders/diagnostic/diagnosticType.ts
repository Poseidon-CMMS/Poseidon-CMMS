import { list } from "@keystone-6/core";

import { text, select, relationship, checkbox } from "@keystone-6/core/fields";
import { isAdmin } from "../../../utils/accessControl";

export const diagnosticType = list({
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
      ref: "asset_type.diagnostic_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    gateway_satellite_power: checkbox({
      defaultValue: false,
    }),
    angles: checkbox({
      defaultValue: false,
    }),
    packet_202_count: checkbox({
      defaultValue: false,
    }),
    battery_2to3: checkbox({
      defaultValue: false,
    }),
    positions: checkbox({
      defaultValue: false,
    }),
    lost_packets: checkbox({
      defaultValue: false,
    }),
    node_to_gateway_distance_in_meters: checkbox({
      defaultValue: false,
    }),
    gateway_first_data_transmission_date: checkbox({
      defaultValue: false,
    }),
    height_difference_in_meters: checkbox({
      defaultValue: false,
    }),
    from_hour: checkbox({
      defaultValue: false,
    }),
    to_hour: checkbox({
      defaultValue: false,
    }),
    packet_203_count: checkbox({
      defaultValue: false,
    }),
    pressure_difference: checkbox({
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
