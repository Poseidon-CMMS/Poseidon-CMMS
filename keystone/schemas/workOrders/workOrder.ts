import { list } from "@keystone-next/keystone";

import { text, timestamp, float, relationship } from "@keystone-next/keystone/fields";

export const workOrder = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['work_date', 'km_traveled', 'comment'],
    },
  },
  fields: {
    work_date: timestamp({ isRequired: true }),
    km_traveled: float({isRequired: true}),
    comment: text(),
    install_uninstall_request: relationship({
        ref: 'install_uninstall_request.work_order',
        ui: {
          displayMode: 'cards',
          cardFields: ['creation_date', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: true,
      }),
    repair: relationship({
      ref: 'repair.work_order',
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
