import { createSchema, list } from '@keystone-next/keystone';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-next/keystone/fields';
import { document } from '@keystone-next/fields-document';
import { irrigator } from './irrigator'; 
import { gateway } from './assets/gateway'; 
import { gpsNode } from './assets/gpsNode';
import { hardwareIssue } from './hdwIssue'; 
import { field as fieldDomainEntity } from './field'
import { field } from '@graphql-ts/schema/dist/declarations/src/api-with-context';
import { installUninstallRequest } from './installUninstallRequest';
import { city } from './city';
import { fieldTechnician } from './fieldTechnician';
import { province } from './province';
import { zone } from './zone';
import { loraAntennaPosition } from './assets/loraAntennaPosition';
import { client } from './client';
import { gatewayHousingType } from './assets/gatewayHousingType';
import { satelliteModem } from './assets/satelliteModem';
import { satelliteModemType } from './assets/sateliteModemType';

export const lists = createSchema({
  Irrigator: irrigator,
  Gateway: gateway,
  GpsNode: gpsNode,
  Field: fieldDomainEntity,
  InstallUninstallRequest: installUninstallRequest,
  City: city,
  FieldTechnician: fieldTechnician,
  HdwIssue: hardwareIssue,
  Province: province,
  Zone: zone,
  LoraAntennaPosition: loraAntennaPosition,  
  Client: client,
  GatewayHousingType: gatewayHousingType,
  SatelliteModem: satelliteModem,
  SatelliteModemType: satelliteModemType,
  User: list({
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({
        isRequired: true,
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ isRequired: true }),
      posts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  }),
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({
        ref: 'Post.tags',
        many: true,
      }),
    },
  }),
});
