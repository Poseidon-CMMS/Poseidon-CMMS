import { list } from "@keystone-6/core";

import { text, timestamp, relationship, file } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin, isLoggedIn } from "../../../utils/accessControl";

export const autopsy = list({
  ui: {
    listView: {
      initialColumns: ["hdw_issue", "date", "user", "comments"],
    },
  },
  hooks: {
    afterOperation: async ({ resolvedData, item, context, operation }) => {
      if (operation === "create") {
        const hdwIssueId = resolvedData?.hdw_issue?.connect?.id;
        await context.query.hdw_issue.updateOne({
          where: { id: hdwIssueId },
          data: {
            status: "closed",
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
    self_diagnostic_file: file(),
    pressure_log: file(),
    comments: text(),

    //relationships
    user: relationship({
      ref: "user.autopsy",
    }),
    hdw_issue: relationship({
      ref: "hdw_issue.autopsy",
      ui: {
        displayMode: "cards",
        cardFields: ["creation_date", "irrigator", "comments"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    autopsy_type: relationship({
      ref: "autopsy_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
  },
  access: {
    operation: {
      query: isLoggedIn,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});
