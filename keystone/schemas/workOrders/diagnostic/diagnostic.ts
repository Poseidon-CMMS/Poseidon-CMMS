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
import { isAdmin } from "../../../utils/accessControl";

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
    //type-dependent attributes
    angles: text(),
    height_diff: float(),
    battery2to3: checkbox(),
    time_start: text(),
    time_end: text(),
    gps_positions: select({
      validation: {
        isRequired: false,
      },
      type: "integer",
      options: [
        { label: "Null", value: 0 },
        { label: "Non-Null", value: 1 },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    packets_lost: integer(),
    distance_to_irrigator_center_in_meters: integer(),
    initial_snr: select({
      validation: {
        isRequired: false,
      },
      type: "integer",
      options: [
        { label: "Good", value: 0 },
        { label: "Regular", value: 1 },
        { label: "Poor", value: 2 },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    pressure_sensor_packets: integer(),
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
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    }
  },
});
