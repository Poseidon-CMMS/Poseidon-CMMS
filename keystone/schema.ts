import { document } from '@keystone-6/fields-document';
import { irrigator } from './schemas/irrigator'; 
import { gateway } from './schemas/assets/gateway/gateway'; 
import { gpsNode } from './schemas/assets/gpsNode/gpsNode';
import { hardwareIssue } from './schemas/workOrders/hdwIssue'; 
import { field as fieldDomainEntity } from './schemas/field'
import { installUninstallRequest } from './schemas/workOrders/installUninstallRequest';
import { city } from './schemas/city';
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
import { storageLocation } from './schemas/assets/storageLocation';
import { diagnosticType } from './schemas/workOrders/diagnostic/diagnosticType';
import { diagnostic } from './schemas/workOrders/diagnostic/diagnostic';
import { inspection } from './schemas/workOrders/inspection/inspection';
import { inspectionType } from './schemas/workOrders/inspection/inspectionType';
import { user } from './schemas/users/user';
import { autopsy } from './schemas/workOrders/autopsy/autopsy';
import { autopsyType } from './schemas/workOrders/autopsy/autopsyType';
import { autopsyRoot } from './schemas/workOrders/autopsy/autopsyRoot';
import { solutionType } from './schemas/workOrders/solutionType';
import { repairType } from './schemas/workOrders/repairType';
import { componentType } from './schemas/assets/componentType';

export const lists = {
  irrigator: irrigator,
  gateway: gateway,
  gps_node: gpsNode,
  field: fieldDomainEntity,
  install_uninstall_request: installUninstallRequest,
  city: city,
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
  storage_location: storageLocation,
  diagnostic_type: diagnosticType,
  diagnostic: diagnostic,
  inspection: inspection,
  inspection_type: inspectionType,
  user: user,
  autopsy: autopsy,
  autopsy_type: autopsyType,
  autopsy_root: autopsyRoot,
  solution_type: solutionType,
  repair_type: repairType,
  component_type: componentType
};
