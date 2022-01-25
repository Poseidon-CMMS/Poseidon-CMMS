import { list } from "@keystone-6/core";

import {
  timestamp,
  relationship,
  text,
  checkbox,
} from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin } from "../../../utils/accessControl";

export const satelliteModem = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: [
        "integration_id",
        "shipment_date",
        "is_transmitting",
        "comment",
        "gateway",
      ],
    },
  },
  hooks: {
    // validateInput: relationshipRequiredCheckerHook("satellite_modem_type"),
  },
  fields: {
    integration_id: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    shipment_date: timestamp({
      validation: {
        isRequired: true,
      },
    }),
    is_transmitting: checkbox({ defaultValue: false }),
    comment: text(),
    satellite_modem_type: relationship({
      ref: "satellite_modem_type.satellite_modem",
      ui: {
        displayMode: "cards",
        cardFields: ["reference_number", "version"],
        inlineConnect: true,
      },
    }),
    gateway: relationship({
      ref: "gateway.satellite_modem",
      ui: {
        displayMode: "select",
      },
      many: false,
    }),
  },
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});
