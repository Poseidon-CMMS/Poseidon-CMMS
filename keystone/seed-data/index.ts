import { KeystoneContext } from "@keystone-6/core/types";
import {
  assetTypes,
  componentTypes,
  batteryTypes,
  gpsAntennaTypes,
  pressureSensorTypes,
  nodeFirmwareVersions,
  nodeHardwareVersions,
  nodeHousingTypes,
  gatewayHousingTypes,
  solarPanelTypes,
  loraAntennaTypes,
  creaZones,
  solutionTypes,
  repairTypes,
  autopsyRoots,
  irrigators,
  provinces,
  cities,
  fields,
} from "./data";
import { diagnosticTypes } from "./data/diagnosticTypes";
import { inspectionTypes } from "./data/inspectionTypes";
import { autopsyTypes } from "./data/autopsyTypes";
import { satelliteModemTypes } from "./data/satelliteModemTypes";
import { satelliteModems } from "./data/mocks/satelliteModems";
import { satelliteAntennas } from "./data/mocks/satelliteAntennas";
import { storageLocations } from "./data/mocks/storageLocations";
import { gateways } from "./data/mocks/gateways";
import { pcbGateways } from "./data/mocks/pcbGateways";
import { gatewayFirmwareVersions } from "./data/mocks/gatewayFirmwareVersions";
import { gatewayHardwareVersions } from "./data/mocks/gatewayHardwareVersions";

const SYSTEM_SIGNATURE = " 🌊 PoseidonCMMS: ";
const SYSTEM_DIVIDER = "----------------------------------------------------";

const basicModelsToSeed = [
  {
    tableName: "asset_type",
    label: "asset types",
    data: assetTypes,
  },
  {
    tableName: "component_type",
    label: "component types",
    data: componentTypes,
  },
  {
    tableName: "pressure_sensor_type",
    label: "pressure sensor types",
    data: pressureSensorTypes,
  },
  {
    tableName: "node_firmware_version",
    label: "node firmware versions",
    data: nodeFirmwareVersions,
  },
  {
    tableName: "node_hardware_version",
    label: "node hardware versions",
    data: nodeHardwareVersions,
  },
  {
    tableName: "solar_panel_type",
    label: "solar panel types",
    data: solarPanelTypes,
  },
  {
    tableName: "battery_type",
    label: "battery types",
    data: batteryTypes,
  },
  {
    tableName: "gps_antenna_type",
    label: "gps antenna types",
    data: gpsAntennaTypes,
  },
  {
    tableName: "lora_antenna_type",
    label: "lora antenna types",
    data: loraAntennaTypes,
  },
  {
    tableName: "gateway_housing_type",
    label: "gateway housing types",
    data: gatewayHousingTypes,
  },
  {
    tableName: "node_housing_type",
    label: "node housing types",
    data: nodeHousingTypes,
  },
  {
    tableName: "solution_type",
    label: "solution types",
    data: solutionTypes,
  },
  {
    tableName: "repair_type",
    label: "repair types",
    data: repairTypes,
  },
  {
    tableName: "autopsy_root",
    label: "autopsy roots",
    data: autopsyRoots,
  },
  {
    tableName: "zone",
    label: "CREA zones",
    data: creaZones
  },
  {
    tableName: "province",
    label: "provinces",
    data: provinces
  },
  {
    tableName: "city",
    label: "cities",
    data: cities
  },
  {
    tableName: "diagnostic_type",
    label: "diagnostic types",
    data: diagnosticTypes
  },
  {
    tableName: "inspection_type",
    label: "inspection types",
    data: inspectionTypes
  },
  {
    tableName: "autopsy_type",
    label: "autopsy types",
    data: autopsyTypes
  },
  {
    tableName: "satellite_modem_type",
    label: "satellite modem types",
    data: satelliteModemTypes
  },

];

const mockModelsToSeed = [
  {
    tableName: "field",
    label: "fields",
    data: fields
  },
  {
    tableName: "irrigator",
    label: "irrigators",
    data: irrigators,
  },
  {
    tableName: "satellite_modem",
    label: "satellite modems",
    data: satelliteModems,
  },
  {
    tableName: "satellite_antenna",
    label: "satellite antennas",
    data: satelliteAntennas,
  },
  {
    tableName: "storage_location",
    label: "storage locations",
    data: storageLocations,
  },
  {
    tableName: "gateway_firmware_version",
    label: "gateway firmware versions",
    data: gatewayFirmwareVersions,
  },
  {
    tableName: "gateway_hardware_version",
    label: "gateway hardware versions",
    data: gatewayHardwareVersions,
  },
  {
    tableName: "pcb_gateway",
    label: "Pcb gateways",
    data: pcbGateways,
  },
  {
    tableName: "gateway",
    label: "gateways",
    data: gateways,
  },

];

export async function insertSeedData(context: KeystoneContext, include_example_entities: boolean) {
  console.log(SYSTEM_DIVIDER);
  console.log(`${SYSTEM_SIGNATURE}:🌱Inserting seed data🌱`);
  console.log(SYSTEM_DIVIDER);

  const modelsToSeed = include_example_entities? [...basicModelsToSeed, ...mockModelsToSeed] : basicModelsToSeed;

  for (const model of modelsToSeed) {
    console.log(SYSTEM_DIVIDER);
    console.log(`\n${SYSTEM_SIGNATURE}🌱Seeding ${model.label}🌱`);
    //@ts-ignore
    await prismaInsertData(context, model.tableName, model.data);
  }

  console.log('');
  console.log('');
  console.log(SYSTEM_DIVIDER);
  console.log(SYSTEM_DIVIDER);
  console.log(`${SYSTEM_SIGNATURE}🌱Data inserted🌱`);
  console.log(SYSTEM_DIVIDER);
  console.log(SYSTEM_DIVIDER);
}

const prismaInsertData = async (
  context: KeystoneContext,
  schema: string,
  data: any
) => {
  // TODO: Revisar caminos no felices
  let dataCreated = await context.prisma[schema].createMany({
    data: data,
  });

  if (dataCreated) {
    console.log(`${SYSTEM_SIGNATURE}: ✅ ${schema} data inserted  w/prisma`);
    console.log(SYSTEM_DIVIDER);
  } else {
    console.log(`${SYSTEM_SIGNATURE}: ❌ Couldn't insert ${schema} data`);
    console.log(SYSTEM_DIVIDER);
  }
};
