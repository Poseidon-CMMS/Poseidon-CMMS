import { list } from '@keystone-6/core';

import { text, timestamp, relationship, float, checkbox, select, integer, image, file } from '@keystone-6/core/fields';
import { relationshipRequiredCheckerHook } from '../../../hooks/relationshipRequiredCheckerHook';
import { isAdmin } from '../../../utils/accessControl';

export const inspection = list({
    ui: {
      listView: {
        initialColumns: ['hdw_issue', 'date','user', 'comments'],
      },
    },
    hooks: {
        // validateInput: relationshipRequiredCheckerHook('hdw_issue'), //TODO no sirve
    },
    fields: {
      date: timestamp({           validation: {
            isRequired: true,
          } }), //fecha de alta
      comments: text(),
     
      //type-dependent fields
      led_gtw: text(),
      jumper_wifi: checkbox(),
      satellite_power: float(),
      gateway_battery_voltage: float(),
      lora_power: float(),
      gps_node_battery_voltage: float(),
      pressure_sensor_signal: float(),
      picture: image(),
      log: file(),

      //relationships
      user: relationship({
        ref: 'user.inspection'
      }),
      hdw_issue: relationship({
        ref: 'hdw_issue.inspection',
        ui: {
          displayMode: 'cards',
          cardFields: ['creation_date', 'irrigator', 'comments'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      inspection_type: relationship({
        ref: 'inspection_type',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
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