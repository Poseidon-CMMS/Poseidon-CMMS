import { list } from '@keystone-6/core';

import { timestamp, relationship, text } from '@keystone-6/core/fields';
import { isAdmin } from '../../../utils/accessControl';

export const gateway = list({ // TODO: falta definir sus relaciones
    ui: {
      listView: {
        initialColumns: ['integration_id', 'fabrication_date', 'housing_type'],
      },
    },
    fields: {
      fabrication_date: timestamp({           validation: {
            isRequired: true,
          } }), //fecha de alta
      integration_id: text({          validation: {
            isRequired: true,
          }, isIndexed: "unique"}),
      irrigator: relationship({
        ref: 'irrigator.gateway',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'lat', 'long', 'status'],
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      housing_type: relationship({
        ref: 'gateway_housing_type',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
      satellite_modem: relationship({
        ref: 'satellite_modem.gateway',
        ui: {
          displayMode: 'cards',
          cardFields: ['manufacturer_id', 'shipment_date', 'is_transmitting', 'comment'],
          inlineEdit: { fields: ['manufacturer_id', 'shipment_date', 'is_transmitting', 'comment']},
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['manufacturer_id', 'shipment_date', 'is_transmitting', 'comment'] },
        },
        many: false
      }),
      satellite_antenna: relationship({
        ref: 'satellite_antenna.gateway',
        ui: {
          displayMode: 'select',
        },
        many: false
      }),
      pcb_gateway: relationship({
        ref: 'pcb_gateway.gateway',
        ui: {
          createView: {
            fieldMode: 'hidden'
        }
        },
        many: false,
      }),
      hdw_issue: relationship({
        ref: 'hdw_issue.gateway',
        ui: {
          createView: {
            fieldMode: 'hidden'
          }
        },
        many: false,
      }),
      lora_antenna_type: relationship({
        ref: 'lora_antenna_type',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        },
        many: false
      }),
      storage_location: relationship({
        ref: 'storage_location.gateway',
        ui: {
          displayMode: 'select',
          labelField: 'name'
        }
      }),
      installed_in_repair: relationship({ //NO es una reparacion a este gateway. Es una reparacion a algún equipo de riego, en la cual este gateway se utilizó para reemplazar uno que estaba roto
        ref: 'repair.new_gateway',
        many:true
      })
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