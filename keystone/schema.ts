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
import { satelliteModemType } from './schemas/assets/gateway/satelliteModemType';
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
import { stockMovement } from './schemas/assets/stockMovement';
import { contract } from './schemas/contract';
import { serviceLevelAgreement } from './schemas/serviceLevelAgreement';

export const lists = {
  asset_type: assetType,
  autopsy: autopsy,
  autopsy_type: autopsyType,
  autopsy_root: autopsyRoot,
  battery_type: batteryType,
  city: city,
  client: client,
  component_type: componentType,
  diagnostic_type: diagnosticType,
  diagnostic: diagnostic,
  field: fieldDomainEntity,
  gateway: gateway,
  gateway_firmware_version: gatewayFirmwareVersion,
  gateway_hardware_version: gatewayHardwareVersion,
  gateway_housing_type: gatewayHousingType,
  gps_antenna_type: gpsAntennaType,
  gps_node: gpsNode,
  hdw_issue: hardwareIssue,
  inspection: inspection,
  inspection_type: inspectionType,
  install_uninstall_request: installUninstallRequest,
  irrigator: irrigator,
  lora_antenna_type: loraAntennaType,
  node_firmware_version: nodeFirmwareVersion,
  node_hardware_version: nodeHardwareVersion,
  node_housing_type: nodeHousingType,
  pcb_gateway: pcbGateway,
  pcb_node: pcbNode,
  pressure_sensor: pressureSensor,
  pressure_sensor_type: pressureSensorType,
  province: province,
  repair: repair,
  repair_type: repairType,
  satellite_modem: satelliteModem,
  satellite_modem_type: satelliteModemType,
  satellite_antenna: satelliteAntenna,
  solar_panel_type: solarPanelType,
  solution_type: solutionType,
  storage_location: storageLocation,
  stock_movement: stockMovement,
  user: user,
  work_order: workOrder,
  zone: zone,
  contract: contract,
  service_level_agreement: serviceLevelAgreement,
};
