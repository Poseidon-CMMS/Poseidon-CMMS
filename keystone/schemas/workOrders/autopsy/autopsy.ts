import { list } from "@keystone-6/core";

import {
  text,
  timestamp,
  relationship,
  file,
} from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";

export const autopsy = list({
  ui: {
    listView: {
      initialColumns: ["hdw_issue", "date", "user", "comments"],
    },
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("hdw_issue"),
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
});
