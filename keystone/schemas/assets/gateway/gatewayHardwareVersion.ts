import { list } from "@keystone-next/keystone";

import { relationship, text } from "@keystone-next/keystone/fields";

export const gatewayHardwareVersion = list({
  ui: {
    labelField: 'version',
    isHidden: true,
    listView: {
      initialColumns: ['version'],
    },
  },
  fields: {
    version: text({ isRequired: true, isIndexed: 'unique' }),
    pcb_gateway: relationship({
        ref: 'pcb_gateway.hardware_version',
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
