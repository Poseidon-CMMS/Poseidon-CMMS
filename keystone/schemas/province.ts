import { list } from "@keystone-next/keystone";

import { text, relationship } from "@keystone-next/keystone/fields";


export const province = list({
  ui: {
    listView: {
      initialColumns: ["name"],
    },
  },
  fields: {
    name: text({ isRequired: true }),
    field: relationship({
      ref: "field.province",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "gate"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    city: relationship({
      ref: "city.province",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: true,
    }),
  },
});
