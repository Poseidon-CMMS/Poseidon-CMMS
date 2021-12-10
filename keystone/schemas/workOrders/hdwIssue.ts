import { list } from "@keystone-next/keystone";

import {
  float,
  text,
  select,
  timestamp,
  relationship,
  virtual,
} from "@keystone-next/keystone/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { graphql } from "@keystone-next/keystone/types";

export const hardwareIssue = list({
  ui: {
    listView: {
      initialColumns: ["creation_date", "close_date", "TTR", "comments"],
    },
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("irrigator"),
  },
  fields: {
    creation_date: timestamp({ isRequired: true }),
    close_date: timestamp(),

    //virtuals
    TTR: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item, args, context) {
          //@ts-ignore
          if (item.diagnostic && item.repair && item.repair) {
            //@ts-ignore
            const oldDate: Date = new Date(item.diagnostic_date);
            //@ts-ignore
            const finalDate: Date = new Date(item.repair.date);
            //@ts-ignore
            const differenceinMs = finalDate - oldDate;
            const differenceinHours = differenceinMs / (1000 * 60 * 60);
            return `${differenceinHours}`;
          } else return null;
        },
      }),
    }),
    comments: text(),

    diagnostic: relationship({
      ref: "diagnostic.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["date", "comments"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    repair: relationship({
      ref: "repair.hdw_issue",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    status: select({
      isRequired: true,
      dataType: "integer",
      options: [
        { label: "In Field", value: 0 },
        { label: "Assigned", value: 1 },
        { label: "Repaired", value: 2 },
        { label: "Out of field", value: 3 },
        { label: "Closed", value: 4 },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    //entities
    field: relationship({
      ref: "field.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "gate"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    irrigator: relationship({
      ref: "irrigator.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    gateway: relationship({
      ref: "gateway.hdw_issue",
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
      ref: "gps_node.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["manufacturer_id", "status", "order"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
  },
});
