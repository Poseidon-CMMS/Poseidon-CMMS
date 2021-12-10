import { list } from "@keystone-next/keystone";

import { relationship, text, virtual } from "@keystone-next/keystone/fields";
import { graphql } from "@keystone-next/keystone/types";

export const satelliteModemType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ["reference_number", "version"],
    },
  },
  fields: {
    reference_number: text({
      isRequired: true,
      isIndexed: "unique",
      
    }),
    version: text({ isRequired: true, isIndexed: "unique" }),
    label: virtual({
        field: graphql.field({
            type: graphql.String,
            resolve(item, args, context) {
                return `${item.referenceNumber} ${item.version}`;
            }
        })
    }),
    satellite_modem: relationship({
      ref: "satellite_modem.satellite_modem_type",
      ui: {
        displayMode: 'count',
        createView: {
            fieldMode: 'hidden'
        }
      },
      many: true,

    }),
  },
});
