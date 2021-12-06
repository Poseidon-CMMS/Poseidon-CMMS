import { list } from "@keystone-next/keystone";

import { text, select, relationship } from "@keystone-next/keystone/fields";

export const diagnosticType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name', 'type'],
    },
  },
  fields: {
    name: text({ isRequired: true, isIndexed: 'unique' }),
    type: select({
        isRequired: true,
        options: [
          { label: 'Pressure Sensor', value: 'SPRES' },
          { label: 'Gateway', value: 'GTW' },
          { label: 'GPS Node', value: 'gpsNode' },
          { label: 'LoRa', value: 'lora' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
    }),
  },
});
