import { list } from "@keystone-next/keystone";

import { relationship, text } from "@keystone-next/keystone/fields";

export const satelliteModemType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ["referenceNumber", "version"],
    },
  },
  fields: {
    referenceNumber: text({
      isRequired: true,
      isIndexed: "unique",
      
    }),
    version: text({ isRequired: true, isIndexed: "unique" }),
    satelliteModem: relationship({
      ref: "SatelliteModem.satelliteModemType",
      ui: {
        displayMode: "count",
        createView: {
            fieldMode: "hidden"
        }
      },
      many: true,

    }),
  },
});
