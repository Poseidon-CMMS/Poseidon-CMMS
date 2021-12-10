import { createSchema, list } from '@keystone-next/keystone';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-next/keystone/fields';
import { document } from '@keystone-next/fields-document';
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

export const lists = createSchema({
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

  user: list({
    ui: {
      listView: {
        initialColumns: ['name'],
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

      diagnostic: relationship({
        ref: 'diagnostic.user',
        many: true
      }),
      inspection: relationship({
        ref: 'inspection.user',
        many: true
      })
    },
  })
});
