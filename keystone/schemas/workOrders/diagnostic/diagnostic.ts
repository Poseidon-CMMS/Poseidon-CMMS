import { list } from "@keystone-6/core";

import {
  text,
  timestamp,
  relationship,
  float,
  checkbox,
  select,
  integer,
  image,
} from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../../hooks/relationshipRequiredCheckerHook";
import { isAdmin, isLoggedIn } from "../../../utils/accessControl";

export const diagnostic = list({
  ui: {
    listView: {
      initialColumns: ["hdw_issue", "date", "user", "comments"],
    },
  },
  hooks: {
    // validateInput: relationshipRequiredCheckerHook("hdw_issue"), //TODO: complica la creacion en cadena
  },
  fields: {
    date: timestamp({
      validation: {
        isRequired: true,
      },
    }), //fecha de alta
    comments: text(),
    ///nuevos opcionales
    gateway_satellite_power: float(),
    angles: text({}),
    packet_202_count: integer(),
    battery_2to3: checkbox({
      defaultValue: false,
    }),
    positions: select({
      validation: {
        isRequired: false,
      },
      type: "string",
      options: [
        { label: "Null", value: "null" },
        { label: "Non-Null", value: "non-null" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    lost_packets: integer(),
    node_to_gateway_distance_in_meters: float(),
    gateway_first_data_transmission_date: timestamp(),
    height_difference_in_meters: float(),
    from_hour: text(),
    to_hour: text(),
    packet_203_count: integer(),
    pressure_difference: float(),

    grafana_link: text(),
    altimetry_image: image(),

    //relationships
    user: relationship({
      ref: "user.diagnostic",
    }),
    hdw_issue: relationship({
      ref: "hdw_issue.diagnostic",
      ui: {
        displayMode: "cards",
        cardFields: ["creation_date", "irrigator", "comments"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    diagnostic_type: relationship({
      ref: "diagnostic_type",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
      many: false,
    }),
  },
  access: {
    operation: {
      query: isLoggedIn,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});
