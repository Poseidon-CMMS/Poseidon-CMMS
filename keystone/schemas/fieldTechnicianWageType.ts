import { list } from "@keystone-next/keystone";

import { float, relationship, text } from "@keystone-next/keystone/fields";

export const fieldTechnicianWageType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name'],
    },
  },
  fields: {
    name: text({ isRequired: true, isIndexed: 'unique' }),
    installPay: float({isRequired: true}),
    uninstallPay: float({isRequired: true}),
    repairPay: float({isRequired: true}),
    kmTravelledPay: float({isRequired: true}),
    fieldTechnician: relationship({
        ref: 'FieldTechnician.wageType',
        ui: {
            createView: {
                fieldMode: "hidden"
            }
        },
        many: true
    })
  },
});
