import { list } from "@keystone-next/keystone";

import { relationship, text } from "@keystone-next/keystone/fields";

export const nodeFirmwareVersion = list({
  ui: {
    labelField: 'version',
    isHidden: true,
    listView: {
      initialColumns: ['version'],
    },
  },
  fields: {
    version: text({ isRequired: true, isIndexed: 'unique' }),
    pcb_node: relationship({
        ref: 'pcb_node.firmware_version',
        ui: {
            displayMode: 'count',
            createView: {
                fieldMode: 'hidden'
            }
        },
        many: true
    }),
  },
});
