/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from '@keystone-6/core';

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from '@keystone-6/fields-document';
import { irrigator } from './schemas/irrigator'; 
import { gateway } from './schemas/assets/gateway/gateway'; 
import { gpsNode } from './schemas/assets/gpsNode/gpsNode';
import { hardwareIssue } from './schemas/workOrders/hdwIssue'; 
import { field as fieldDomainEntity } from './schemas/field'
import { installUninstallRequest } from './schemas/workOrders/installUninstallRequest';
import { city } from './schemas/city';
import { fieldTechnician } from './schemas/users/fieldTechnician';
import { province } from './schemas/province';
import { zone } from './schemas/zone';
import { client } from './schemas/client';
import { gatewayHousingType } from './schemas/assets/gateway/gatewayHousingType';
import { satelliteModem } from './schemas/assets/gateway/satelliteModem';
import { satelliteModemType } from './schemas/assets/gateway/sateliteModemType';
import { satelliteAntenna } from './schemas/assets/gateway/satelliteAntenna';
import { batteryType } from './schemas/assets/gpsNode/batteryType';
import { gpsAntennaType } from './schemas/assets/gpsNode/gpsAntennaType';
import { nodeHousingType } from './schemas/assets/gpsNode/nodeHousingType';
import { loraAntennaType } from './schemas/assets/loraAntennaType';
import { solarPanelType } from './schemas/assets/gpsNode/solarPanelType';
import { pcbNode } from './schemas/assets/gpsNode/pcbNode';
import { nodeFirmwareVersion } from './schemas/assets/gpsNode/nodeFirmwareVersion';
import { nodeHardwareVersion } from './schemas/assets/gpsNode/nodeHardwareVersion';
import { pcbGateway } from './schemas/assets/gateway/pcbGateway';
import { gatewayFirmwareVersion } from './schemas/assets/gateway/gatewayFirmwareVersion';
import { gatewayHardwareVersion } from './schemas/assets/gateway/gatewayHardwareVersion';
import { assetType } from './schemas/assets/assetType';
import { workOrder } from './schemas/workOrders/workOrder';
import { pressureSensorType } from './schemas/assets/pressureSensor/pressureSensorType';
import { pressureSensor } from './schemas/assets/pressureSensor/pressureSensor';
import { repair } from './schemas/workOrders/repair';
import { repairType } from './schemas/workOrders/repairType';
import { storageLocation } from './schemas/assets/storageLocation';
import { diagnosticType } from './schemas/workOrders/diagnostic/diagnosticType';
import { diagnostic } from './schemas/workOrders/diagnostic/diagnostic';
import { inspection } from './schemas/workOrders/inspection/inspection';
import { inspectionType } from './schemas/workOrders/inspection/inspectionType';

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists = {
  irrigator: irrigator,
  gateway: gateway,
  gps_node: gpsNode,
  field: fieldDomainEntity,
  install_uninstall_request: installUninstallRequest,
  city: city,
  field_technician: fieldTechnician,
  hdw_issue: hardwareIssue,
  province: province,
  zone: zone,
  client: client,
  gateway_housing_type: gatewayHousingType,
  satellite_modem: satelliteModem,
  satellite_modem_type: satelliteModemType,
  satellite_antenna: satelliteAntenna,
  battery_type: batteryType,
  gps_antenna_type: gpsAntennaType,
  node_housing_type: nodeHousingType,
  lora_antenna_type: loraAntennaType,
  solar_panel_type: solarPanelType,
  pcb_node: pcbNode,
  node_firmware_version: nodeFirmwareVersion,
  node_hardware_version: nodeHardwareVersion,
  pcb_gateway: pcbGateway,
  gateway_firmware_version: gatewayFirmwareVersion,
  gateway_hardware_version: gatewayHardwareVersion,
  asset_type: assetType,
  work_order: workOrder,
  pressure_sensor_type: pressureSensorType,
  pressure_sensor: pressureSensor,
  repair: repair,
  repair_type: repairType,
  storage_location: storageLocation,
  diagnostic_type: diagnosticType,
  diagnostic: diagnostic,
  inspection: inspection,
  inspection_type: inspectionType,

  // Here we define the user list.
  user: list({
    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      // The password field takes care of hiding details and hashing values
      password: password({ validation: { isRequired: true } }),
      diagnostic: relationship({
        ref: 'diagnostic.user',
        many: true
      }),
      inspection: relationship({
        ref: 'inspection.user',
        many: true
      })
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
  }),
};
