import { list } from "@keystone-next/keystone";

import { text, timestamp, float, relationship } from "@keystone-next/keystone/fields";

export const workOrder = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['workDate', 'kmTraveled', 'comment'],
    },
  },
  fields: {
    workDate: timestamp({ isRequired: true }),
    kmTraveled: float({isRequired: true}),
    comment: text(),
    installUninstallRequest: relationship({
        ref: 'installUninstallRequest.workOrder',
        ui: {
          displayMode: 'cards',
          cardFields: ['creationDate', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    repair: relationship({
      ref: 'repair.workOrder',
      ui: {
        displayMode: 'cards',
        cardFields: ['date', 'status'],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
  },
});
