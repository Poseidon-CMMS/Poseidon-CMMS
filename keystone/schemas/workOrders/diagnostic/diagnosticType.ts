import { list } from "@keystone-6/core";

import { text, select, relationship } from "@keystone-6/core/fields";
import { isAdmin } from "../../../utils/accessControl";

export const diagnosticType = list({
  ui: {
    isHidden: true,
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
    type: select({
      validation: {
        isRequired: true,
      },
      options: [
        { label: "Pressure Sensor", value: "SPRES" },
        { label: "Gateway", value: "GTW" },
        { label: "GPS Node", value: "gps_node" },
        { label: "LoRa", value: "lora" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
  },
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    }
  },
});
