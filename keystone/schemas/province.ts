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
      ref: "Field.province",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "gate"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
    city: relationship({
      ref: "City.province",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: true,
    }),
  },
});
