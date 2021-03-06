import { list } from "@keystone-6/core";

import { graphql } from "@keystone-6/core";
import {
  checkbox,
  float,
  select,
  text,
  relationship,
  virtual,
} from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../hooks/relationshipRequiredCheckerHook";
import { hasAPIKey, isAdmin, isLoggedIn } from "../utils/accessControl";

export const irrigator = list({
  ui: {
    listView: {
      initialColumns: [
        "integration_id",
        "name",
        "lat",
        "long",
        "status",
        "enabled",
        "comment",
      ],
    },
    labelField: "integration_id",
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("field"),
  },
  fields: {
    integration_id: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    lat: float({
      validation: {
        isRequired: true,
      },
    }),
    long: float({
      validation: {
        isRequired: true,
      },
    }),
    status: select({
      validation: {
        isRequired: true,
      },
      options: [
        { label: "Sin telemetría", value: "no-telemetry" },
        { label: "Instalado", value: "installed" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    enabled: checkbox({ defaultValue: false }), //de alta?
    mapped: checkbox({ defaultValue: false }), // mapeado?
    comment: text({
      validation: {
        isRequired: false,
      },
    }),

    //6 relations
    gateway: relationship({
      ref: "gateway.irrigator",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date"],
        inlineEdit: { fields: ["fabrication_date"] },
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
      db: {
        foreignKey: true,
      },
    }),
    gps_node: relationship({
      ref: "gps_node.irrigator",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
      db: {
        foreignKey: true,
      },
    }),
    field: relationship({
      ref: "field.irrigator",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "gate"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    install_uninstall_request: relationship({
      ref: "install_uninstall_request.irrigator",
      ui: {
        displayMode: "cards",
        cardFields: ["creation_date"],
        linkToItem: true,
        inlineConnect: true,
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: true,
    }),
    hdw_issue: relationship({
      ref: "hdw_issue.irrigator",
      ui: {
        displayMode: "cards",
        cardFields: ["creation_date", "comments"],
        linkToItem: true,
        inlineConnect: true,
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: true,
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.irrigator",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id", "status", "order"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
      db: {
        foreignKey: true,
      },
    }),
    contract: relationship({
      ref: "contract.irrigator",
      ui: {
        displayMode: "cards",
        cardFields: ["hubspot_id"],
        linkToItem: false,
        inlineConnect: true,
      },
      many: false,
    }),
    transmission_status: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const activeHdwIssues = await context.query.hdw_issue.findMany({
            where: {
                status: { in: ["in-field", "assigned", "repaired"] },
            },
            query: "id status",
          });

          const status = activeHdwIssues.length > 0 ? "Error" : "Transmitiendo"

          return status;
        },
      }),
    }),
  },
  access: {
    operation: {
      query: (params) => isLoggedIn(params) || hasAPIKey(params),
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});
