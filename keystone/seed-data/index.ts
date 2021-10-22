import { KeystoneContext } from "@keystone-next/keystone/types";
import { assetTypes } from "./data";
import { pressureSensors } from "./data";
import { nodeFirmwareVersions } from "./data";
import { nodeHardwareVersions } from "./data";
import { solarPanelTypes } from "./data";
import { loraAntennaTypes } from "./data";
import { gpsAntennaTypes } from "./data";
import { housingTypes } from "./data";

const SYSTEM_SIGNATURE = '🌊 PoseidonCMMS: ';
const SYSTEM_SEPARATOR = '--------------------------------------------';

type AssetTypeProps = [{
  name: string;
}];

type PressureSensorProps = [{
  name: string;
}];

type NodeFirmwareVersion = [{
  name: string;
}];

type SolarPanelType = [{
  name: string;
}];

type BatteryType = [{
  name: string;
}];

type LoraAntennaType = [{
  name: string;
}];

type NodeHardwareVersion = [{
  name: string;
}];

type HousingType = [{
  name: string;
}];


export async function insertSeedData(context: KeystoneContext) {
  console.log(`${SYSTEM_SIGNATURE}:🌱----- Inserting seed data -----🌱`);
  console.log(SYSTEM_SEPARATOR);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding asset types🌱`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createAssetTypes(context, assetTypes);
  
  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding pressure sensors🌱`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createPresureSensors(context, pressureSensors);
  
  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding node firmware versions🌱`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createNodeFirmwareVersions(context, nodeFirmwareVersions);
  
  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding node hardware versions🌱`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createNodeHardwareVersions(context, nodeHardwareVersions);
  
  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding solar panel types🌱`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createSolarPanelTypes(context, solarPanelTypes);
  
  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding battery types🌱`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createBatteryTypes(context, batteryTypes);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding gps antenna types🌱`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createGpsAntennaTypes(context, gpsAntennaTypes);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding lora antenna types`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createLoraAntennaTypes(context, loraAntennaTypes);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding housing types`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createHousingTypes(context, housingTypes);

}  

const createAssetTypes = async (context: KeystoneContext, data: AssetTypeProps) => {// TODO: Revisar caminos no felices
  await context.lists.AssetType.createMany({
      data: data,
    });
  };

const createPresureSensors = async (context: KeystoneContext, data: PressureSensorProps) => {// TODO: Revisar caminos no felices
  await context.lists.PressureSensor.createMany({
      data: data,
    });
  };
  
const createNodeFirmwareVersions = async (context: KeystoneContext, data: NodeFirmwareVersion) => {// TODO: Revisar caminos no felices
  await context.lists.NodeFirmwareVersion.createMany({
      data: data,
    });
  };
  
const createNodeHardwareVersions = async (context: KeystoneContext, data: NodeHardwareVersion) => {// TODO: Revisar caminos no felices
  await context.lists.NodeHardwareVersion.createMany({
      data: data,
    });
  };
  
const createSolarPanelTypes = async (context: KeystoneContext, data: SolarPanelType) => {// TODO: Revisar caminos no felices
  await context.lists.SolarPanelType.createMany({
      data: data,
    });
  };
  
const createBatteryTypes = async (context: KeystoneContext, data: BatteryType) => {// TODO: Revisar caminos no felices
  await context.lists.BatteryType.createMany({
      data: data,
    });
  };

const createLoraAntennaTypes = async (context: KeystoneContext, data: LoraAntennaType) => {// TODO: Revisar caminos no felices
  await context.lists.BatteryType.createMany({
    data: data,
  });
};

const createHousingTypes = async (context: KeystoneContext, data: HousingType) => {// TODO: Revisar caminos no felices
  await context.lists.HousingType.createMany({
    data: data,
  });
};
  
