import { list } from "@keystone-next/keystone";

import { text, select } from "@keystone-next/keystone/fields";

export const repairType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['type','name'],
    },
  },
  fields: {
    type: select({
        isRequired: true,
        options: [
            { label: 'Reparación dispositivo actual', value: 'repair' },
            { label: 'Cambio de dispositivo', value: 'replace' },
        ],
        ui: {
            displayMode: 'segmented-control',
        },
      }),
    name: text({ isRequired: true, isIndexed: 'unique' }),
  },
});
