import { list } from '@keystone-6/core';

import {
  float,
  text,
  select,
  timestamp,
  relationship,
  virtual,
} from '@keystone-6/core/fields';
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { graphql } from '@keystone-6/core';
import { isAdmin } from '../../utils/accessControl';

export const hardwareIssue = list({
  ui: {
    listView: {
      initialColumns: ["creation_date", "close_date", "time_to_repair_hours", "comments"],
    },
    labelField: "comments"
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("irrigator"),
  },
  fields: {
    creation_date: timestamp({           validation: {
            isRequired: true,
          } }),
    close_date: timestamp(),

    //virtuals
    time_to_repair_hours: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { diagnostic, repair } = await context.query.hdw_issue.findOne({
            //@ts-expect-error
            where: { id: item.id.toString() },
            query: 'diagnostic { date } repair { date }  ',
          });
          //@ts-ignore
          if (diagnostic && diagnostic.date && repair && repair.date) {
            //@ts-ignore
            const oldDate: Date = new Date(diagnostic.date);
            //@ts-ignore
            const finalDate: Date = new Date(repair.date);
            //@ts-ignore
            const differenceinMs = finalDate - oldDate;
            const differenceinHours = differenceinMs / (1000 * 60 * 60);
            return `${differenceinHours}`;
          } else return null;
        },
      }),
    }),
    time_to_diagnostic_hours: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { diagnostic } = await context.query.hdw_issue.findOne({
            //@ts-expect-error
            where: { id: item.id.toString() },
            query: 'diagnostic { date }',
          });
          //@ts-ignore
          if (diagnostic && diagnostic.date) {
            //@ts-ignore
            const oldDate: Date = new Date(diagnostic.date);
            //@ts-ignore
            const finalDate: Date = new Date(item.creation_date);
            //@ts-ignore
            const differenceinMs = finalDate - oldDate;
            const differenceinHours = differenceinMs / (1000 * 60 * 60);
            return `${differenceinHours}`;
          } else return null;
        },
      }),
    }),
    time_from_removal_to_autopsy_hours: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { repair, autopsy } = await context.query.hdw_issue.findOne({
            //@ts-expect-error
            where: { id: item.id.toString() },
            query: 'repair { date repair_type } autopsy { date }',
          });
          //@ts-ignore
          if (repair && repair.repair_type === 'device_change' && autopsy) {
            //@ts-ignore
            const oldDate: Date = new Date(repair.date);
            //@ts-ignore
            const finalDate: Date = new Date(autopsy.date);
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
    inspection: relationship({
      ref: "inspection.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["date", "comments"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    repair: relationship({
      ref: "repair.hdw_issue",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      many: true,
    }),
    autopsy: relationship({
      ref: "autopsy.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["date", "comments"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    status: select({
                validation: {
            isRequired: true,
          },
          type: "integer",
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
      many: false,
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
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    }
  },
});
