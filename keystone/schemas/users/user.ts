import { list } from "@keystone-6/core";
import { text, relationship, password, select } from "@keystone-6/core/fields";
import { isAdmin, isLoggedIn } from "../../utils/accessControl";

export const user = list({
  ui: {
    listView: {
      initialColumns: ["name", "email", "type"],
    },
    labelField: "name",
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    // The password field takes care of hiding details and hashing values
    password: password({ validation: { isRequired: true } }),
    type: select({
      validation: {
        isRequired: true,
      },
      options: [
        { label: "Usuario Administrador", value: "admin" },
        { label: "Técnico de campo", value: "technician" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),

    //admin-only fields
    diagnostic: relationship({
      ref: "diagnostic.user",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    autopsy: relationship({
      ref: "autopsy.user",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    created_stock_movement: relationship({
      ref: "stock_movement.author",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),

    //technician-only fields
    hdw_issue: relationship({
      ref: "hdw_issue.assigned_technician",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    install_uninstall_request: relationship({
      ref: "install_uninstall_request.assigned_technician",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    inspection: relationship({
      ref: "inspection.user",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    zone: relationship({
      ref: "zone.user",
      ui: {
        displayMode: "cards",
        cardFields: ["code", "name", "is_foreign"],
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
        inlineConnect: true,
      },
      many: true,
    }),
    storage_location: relationship({
      ref: "storage_location.user",
      ui: {
        displayMode: "select",
        labelField: "name",
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
      many: false,
    }),
    work_order: relationship({
      ref: "work_order.technician",
      many: true,
      ui: {
        hideCreate: true,
        createView: {
          fieldMode: "hidden",
        },
      },
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
  hooks: {
    afterOperation: async ({ resolvedData, item, context, operation }) => {
      if (item?.type ==='technician' && !item?.storage_location) {
        const result = await context.query.storage_location.createOne({
          data: {
            name: `Stock de ${item?.name}`,
            user: {connect: {id: item?.id}}
          },
          query: "id name user {id}"
        });
        console.log(result);
      }
    },
  }
});
