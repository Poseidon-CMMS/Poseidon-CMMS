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
      initialColumns: ["creationDate", "closeDate", "TTR", "comments"],
    },
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("irrigator"),
  },
  fields: {
    creationDate: timestamp({ isRequired: true }),
    closeDate: timestamp(),

    //virtuals
    TTR: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item, args, context) {
          //@ts-ignore
          if (item.diagnostic && item.repair && item.repair) {
            //@ts-ignore
            const oldDate: Date = new Date(item.diagnosticDate);
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
      ref: "Diagnostic.hdwIssue",
      ui: {
        displayMode: "cards",
        cardFields: ["creationDate", "comments"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    repair: relationship({
      ref: "Repair.hdwIssue",
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
      ref: "Field.hdwIssue",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "gate"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    irrigator: relationship({
      ref: "Irrigator.hdwIssue",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    gateway: relationship({
      ref: "Gateway.hdwIssue",
      ui: {
        displayMode: "cards",
        cardFields: ["fabricationDate"],
        inlineEdit: { fields: ["fabricationDate"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["fabricationDate"] },
      },
      many: false,
    }),
    gpsNode: relationship({
      ref: "GpsNode.hdwIssue",
      ui: {
        displayMode: "cards",
        cardFields: ["fabricationDate"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    pressureSensor: relationship({
      ref: "PressureSensor.hdwIssue",
      ui: {
        displayMode: "cards",
        cardFields: ["manufacturerId", "status", "order"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
  },
});
