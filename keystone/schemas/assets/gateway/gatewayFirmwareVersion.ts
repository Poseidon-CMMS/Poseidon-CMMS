import { list } from "@keystone-next/keystone";

import { relationship, text } from "@keystone-next/keystone/fields";

export const gatewayFirmwareVersion = list({
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
        ref: 'pcb_gateway.firmware_version',
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
