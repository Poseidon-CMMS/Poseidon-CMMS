import { list } from "@keystone-next/keystone";

import { relationship, text } from "@keystone-next/keystone/fields";
import { version } from "typescript";

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
    pcbGateway: relationship({
        ref: 'PcbGateway.firmwareVersion',
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
