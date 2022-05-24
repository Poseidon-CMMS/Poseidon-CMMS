import { list } from "@keystone-6/core";

import { text, relationship, timestamp, select, integer } from "@keystone-6/core/fields";
import { isAdmin } from "../utils/accessControl";

export const contract = list({
  ui: {
    listView: {
      initialColumns: ["name"],
    },
  },
  fields: {
    hubspot_id: text({
      validation: {
        isRequired: false,
      },
      isIndexed: "unique",
    }),
    creation_date: timestamp({
      validation: {
        isRequired: true,
      },
    }),

    start_date: timestamp({
      validation: {
        isRequired: true,
      },
    }),

    end_date: timestamp({
      validation: {
        isRequired: true,
      },
    }),

    actual_install_date: timestamp({
      validation: {
        isRequired: false,
      },
    }),

    actual_uninstall_date: timestamp({
      validation: {
        isRequired: false,
      },
    }),
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    irrigator_quantity: integer(),
    irrigator: relationship({
      ref: "irrigator.contract",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    service_level_agreement: relationship({
      ref: "service_level_agreement.contract",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    contract_type: select({
        validation: {
          isRequired: true,
        },
        options: [
          { label: "Cliente nuevo", value: "new_client" },
          { label: "Recontratación", value: "contract_renewal" },
          { label: "Muestra comercial", value: "demo" },
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
    },
  },
});
