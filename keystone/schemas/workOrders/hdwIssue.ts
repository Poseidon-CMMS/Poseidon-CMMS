import { list } from "@keystone-6/core";

import {
  float,
  text,
  select,
  timestamp,
  relationship,
  virtual,
} from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { graphql } from "@keystone-6/core";
import { isAdmin, hasAPIKey, isLoggedIn } from "../../utils/accessControl";

export const hardwareIssue = list({
  ui: {
    listView: {
      initialColumns: ["creation_date", "close_date", "time_to_repair_hours"],
    },
    labelField: "creation_date",
  },
  hooks: {
    validateInput: relationshipRequiredCheckerHook("irrigator"),
    resolveInput: async ({ resolvedData, item, context, operation }) => {
      //resolvedData es siempre los datos enviados. En caso de operaciones update, item representa el estado previo del item a actualizar
      //generacion de status
      if (
        item &&
        !item?.assigned_technicianId &&
        resolvedData?.assigned_technician?.connect?.id
      ) {
        //caso in-field => assigned
        resolvedData.status = "assigned";
      } else if (resolvedData?.assigned_technician?.disconnect) {
        //caso assigned => in-field
        resolvedData.status = "in-field";
      } else if (resolvedData?.status === "closed") {
        resolvedData.close_date = new Date().toISOString();
      }

      const isCreationOperation = !item;
      if (isCreationOperation) {
        const whereClause = resolvedData?.irrigator?.connect?.id //normal creation
          ? { id: resolvedData.irrigator.connect.id }
          : resolvedData?.irrigator?.connect?.integration_id //automatic webhook-based creation
          ? { integration_id: resolvedData.irrigator.connect.integration_id }
          : { error: "error" };

        const { gateway, gps_node, pressure_sensor } =
          await context.query.irrigator.findOne({
            where: whereClause,
            query: "gateway {id} gps_node {id} pressure_sensor {id}",
          });

        if (gateway && gateway.id) {
          resolvedData.gateway = { connect: { id: gateway.id } };
        }
        if (gps_node && gps_node.id) {
          resolvedData.gps_node = { connect: { id: gps_node.id } };
        }
        if (pressure_sensor && pressure_sensor.id) {
          resolvedData.pressure_sensor = {
            connect: { id: pressure_sensor.id },
          };
        }
      }

      return resolvedData;
    },
  },
  fields: {
    creation_date: timestamp({
      validation: {
        isRequired: true,
      },
    }),
    close_date: timestamp(),
    automatic_diagnostic: select({
      type: "integer",
      options: [
        { label: "Funcionamiento normal", value: 0 },
        { label: "Revisar NODO GPS", value: 1 },
        { label: "Revisar SPRES", value: 2 },
        { label: "Revisar todo", value: 3 },
      ],
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    comments: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { diagnostic } = await context.query.hdw_issue.findOne({
            where: { id: item.id.toString() },
            query: "diagnostic { comments }",
          });
          //@ts-ignore
          if (diagnostic && diagnostic.comments) {
            return diagnostic.comments;
          } else return null;
        },
      }),
    }),

    //virtuals
    time_to_repair_hours: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { diagnostic, repair } = await context.query.hdw_issue.findOne({
            //@ts-expect-error
            where: { id: item.id.toString() },
            query: "diagnostic { date } repair { date }  ",
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
            query: "diagnostic { date }",
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
            query: `
              repair(
                orderBy: { date: desc }
              ) {
                date
                repair_type {
                  name
                  value
                }
              }
              autopsy(
                orderBy: { date: desc }
              ) {
                date
              }
            `,
          });
          //@ts-ignore
          if (
            repair &&
            repair[0] &&
            repair[0].repair_type.value === "device_change" &&
            autopsy &&
            autopsy[0]
          ) {
            //@ts-ignore
            const oldDate: Date = new Date(repair[0].date);
            //@ts-ignore
            const finalDate: Date = new Date(autopsy[0].date);
            //@ts-ignore
            const differenceinMs = finalDate - oldDate;
            const differenceinHours = differenceinMs / (1000 * 60 * 60);
            return `${differenceinHours}`;
          } else return null;
        },
      }),
    }),

    diagnostic: relationship({
      ref: "diagnostic.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["date", "comments"],
        inlineConnect: true,
      },
      many: false,
    }),
    inspection: relationship({
      ref: "inspection.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["date", "comments"],
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: true,
    }),
    repair: relationship({
      ref: "repair.hdw_issue",
      ui: {
        hideCreate: true,
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
        inlineConnect: true,
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: true,
    }),
    status: select({
      validation: {
        isRequired: true,
      },
      type: "string",
      options: [
        { label: "In Field", value: "in-field" },
        { label: "Assigned", value: "assigned" },
        { label: "Repaired", value: "repaired" },
        { label: "Out of field", value: "out-of-field" },
        { label: "Closed", value: "closed" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    assigned_technician: relationship({
      ref: "user.hdw_issue",
      ui: {
        displayMode: "select",
      },
      many: false,
    }),
    //entities
    irrigator: relationship({
      ref: "irrigator.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        inlineConnect: true,
      },
      many: false,
    }),
    gateway: relationship({
      ref: "gateway.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    gps_node: relationship({
      ref: "gps_node.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.hdw_issue",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
  },
  access: {
    operation: {
      query: isLoggedIn,
      create: (params) => isAdmin(params) || hasAPIKey(params),
      update: isAdmin,
      delete: isAdmin,
    },
    filter: {
      query: ({ session, context, listKey, operation }) => {
        const isAdmin = session?.data?.type === "admin";
        return isAdmin
          ? {}
          : { assigned_technician: { id: { equals: session?.data?.id } } };
      },
    },
  },
});
