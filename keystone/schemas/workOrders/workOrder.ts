import { list } from '@keystone-6/core';

import { text, timestamp, float, relationship } from '@keystone-6/core/fields';

export const workOrder = list({
  ui: {
    isHidden: false,
    listView: {
      initialColumns: ['work_date', 'km_traveled', 'comment'],
    },
    labelField: 'comment'
  },
  fields: {
    work_date: timestamp({           validation: {
            isRequired: true,
          } }),
    km_traveled: float({          validation: {
            isRequired: true,
          }}),
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
