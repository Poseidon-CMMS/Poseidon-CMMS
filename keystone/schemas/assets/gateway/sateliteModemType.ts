import { list, graphql } from '@keystone-6/core';

import { relationship, text, virtual } from '@keystone-6/core/fields';

export const satelliteModemType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ["reference_number", "version"],
    },
  },
  fields: {
    reference_number: text({
                validation: {
            isRequired: true,
          },
      isIndexed: "unique",
      
    }),
    version: text({           validation: {
            isRequired: true,
          }, isIndexed: "unique" }),
    label: virtual({
        field: graphql.field({
            type: graphql.String,
            resolve(item, args, context) {
              //@ts-ignore
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
