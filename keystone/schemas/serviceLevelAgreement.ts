import { list } from "@keystone-6/core";

import { text, select, relationship, checkbox } from "@keystone-6/core/fields";
import { isAdmin, isLoggedIn } from "../utils/accessControl";

export const serviceLevelAgreement = list({
  ui: {
    listView: {
      initialColumns: ["name"],
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    contract: relationship({
        ref: "contract.service_level_agreement",
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          linkToItem: false,
          inlineConnect: false,
          createView: {
              fieldMode: 'hidden',
          }
        },
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
