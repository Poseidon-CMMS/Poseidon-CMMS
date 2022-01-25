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
    }),
    autopsy: relationship({
      ref: "autopsy.user",
      many: true,
    }),
    created_stock_movement: relationship({
      ref: "stock_movement.author",
      many: true,
      ui: {
        hideCreate: true
      }
    }),

    //technician-only fields
    hdw_issue: relationship({
      ref: "hdw_issue.assigned_technician",
      many: true
    }),
    install_uninstall_request: relationship({
      ref: "install_uninstall_request.assigned_technician",
      many: true
    }),
    inspection: relationship({
      ref: "inspection.user",
      many: true,
    }),
    zone: relationship({
      ref: "zone.user",
      ui: {
        displayMode: "cards",
        cardFields: ["code", "name", "is_foreign"],
        inlineEdit: { fields: ["name", "is_foreign"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name", "is_foreign"] },
      },
      many: true,
    }),
    storage_location: relationship({
      ref: "storage_location.user",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
    work_order: relationship({
      ref: "work_order.technician",
      many: true
    })
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: ["name"],
    },
  },
  access: {
    operation: {
      query: isLoggedIn,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    }
  },
});
