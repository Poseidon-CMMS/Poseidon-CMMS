import { list } from '@keystone-next/keystone';

import {
    // Scalar types
    checkbox,
    integer,
    json,
    float,
    password,
    select,
    text,
    timestamp,
  
    // Relationship type
    relationship,
  
    // Index types
    autoIncrement,
  
    // Virtual type
    virtual,
  
    // File types
    file,
    image,
  } from '@keystone-next/keystone/fields';

export const irrigator = list({
    ui: {
      listView: {
        initialColumns: ['name', 'lat', 'long', 'status', 'enabled', 'description'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      lat: float({ isRequired: true }),
      long: float({ isRequired: true }),
      status: select({
        isRequired: true,
        options: [
          { label: 'Sin telemetria', value: 'no-telemetry' },
          { label: 'Instalado', value: 'installed' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      enabled: checkbox({ isRequired: true }),
      description: text({ isRequired: false }),

      //6 relations
      gateway: relationship({
        ref: 'Gateway.irrigator',
        ui: {
          displayMode: 'cards',
          cardFields: ['fabricationDate','housingType','loraAntennaPosition'],
          inlineEdit: { fields: ['fabricationDate','housingType','loraAntennaPosition'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['fabricationDate','housingType','loraAntennaPosition'] },
        },
        many: false,
      }),
    },
  });