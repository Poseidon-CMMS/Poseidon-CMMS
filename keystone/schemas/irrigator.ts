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
import { isAdmin } from "../utils/accessControl";

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
  },
  fields: {
    integration_id: text({
      validation: {
        isRequired: true,
      },
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
        { label: "Sin telemetria", value: "no-telemetry" },
        { label: "Instalado", value: "installed" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    enabled: checkbox({ defaultValue: false }),
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
        inlineCreate: { fields: ["fabrication_date"] },
      },
      many: false,
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
    }),
    transmission_status: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const later = (delay: number, value: string): Promise<string> =>
            new Promise((resolve) => setTimeout(resolve, delay, value));

          return await later(
            300,
            Math.random() > 0.5 ? "transmitting" : "error"
          );
        },
      }),
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
