import { list } from "@keystone-next/keystone";

import { relationship, text } from "@keystone-next/keystone/fields";

export const nodeHardwareVersion = list({
  ui: {
    labelField: "version",
    isHidden: true,
    listView: {
      initialColumns: ["version"],
    },
  },
  fields: {
    version: text({ isRequired: true, isIndexed: "unique" }),
    pcbNode: relationship({
      ref: "PcbNode.hardwareVersion",
      ui: {
        displayMode: "count",
        createView: {
          fieldMode: "hidden",
        },
      },
      many: true,
    }),
  },
});
