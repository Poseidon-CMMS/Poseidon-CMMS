import { list } from "@keystone-6/core";

import {
  select,
  timestamp,
  relationship,
  text,
  virtual,
  file,
} from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { isAdmin, isLoggedIn } from "../../utils/accessControl";
import { graphql } from "@keystone-6/core";

export const repair = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: ["date", "work_order"],
    },
    labelField: "date",
  },
  hooks: {
    // validateInput: relationshipRequiredCheckerHook("work_order"),
    afterOperation: async ({ resolvedData, item, context, operation }) => {
      if (operation === "create") {
        const hdwIssueId = resolvedData?.hdw_issue?.connect?.id;
        await context.query.hdw_issue.updateOne({
          where: { id: hdwIssueId },
          data: {
            status: "repaired",
          },
          query: "id status",
        });
      }
    },
  },
  fields: {
    date: timestamp({
      validation: {
        isRequired: true,
      },
    }), //fecha de alta
    hdw_issue: relationship({
      ref: "hdw_issue.repair",
      ui: {
        displayMode: "cards",
        cardFields: [
          "creation_date",
          "irrigator",
          "time_to_repair_hours",
          "comments",
        ],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    repair_type: relationship({
      ref: "repair_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    solution_type: relationship({
      ref: "solution_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    replaced_asset_type: relationship({
      ref: "asset_type.repair",
      many: false,
    }),
    new_gateway: relationship({
      ref: "gateway.installed_in_repair",
      many: false,
    }),
    new_gps_node: relationship({
      ref: "gps_node.installed_in_repair",
      many: false,
    }),
    new_pressure_sensor: relationship({
      ref: "pressure_sensor.installed_in_repair",
      many: false,
    }),
    work_order: relationship({
      ref: "work_order.repair",
      ui: {
        displayMode: "cards",
        cardFields: ["work_date", "km_traveled", "comment"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    comments: text(),
    log: file(),
  },
  access: {
    operation: {
      query: isLoggedIn,
      create: isLoggedIn,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});
