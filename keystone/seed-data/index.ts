import { KeystoneContext } from "@keystone-next/keystone/types";
import { 
  assetTypes, batteryTypes, 
  hdwIssueStatuses, gpsAntennaTypes,
  pressureSensorTypes, nodeFirmwareVersions,
  nodeHardwareVersions, nodeHousingTypes, 
  gatewayHousingTypes, solarPanelTypes, loraAntennaTypes } from "./data";

import * as provinces from './geographic/provincias.json';
import * as cities from './geographic/localidades.json';

const SYSTEM_SIGNATURE = ' 🌊 PoseidonCMMS: ';
const SYSTEM_DIVIDER = '----------------------------------------------------';

type AssetTypeProps = [{
  name: string;
}];

type PressureSensorProps = [{
  name: string;
}];

type NodeFirmwareVersion = [{
  version: string;
}];

type NodeHardwareVersion = [{
  version: string;
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

type HousingType = [{
  name: string;
}];

type HdwIssueStatus=[{
  name: string;
}]


const modelsToSeed = [
  {
    tableName: 'AssetType',
    label: 'asset types',
    data: assetTypes
  },
  {
    tableName: 'PressureSensorType',
    label: 'pressure sensor types',
    data: pressureSensorTypes
  },
  {
    tableName: 'NodeFirmwareVersion',
    label: 'node firmware versions',
    data: nodeFirmwareVersions
  },
  {
    tableName: 'NodeHardwareVersion',
    label: 'node hardware versions',
    data: nodeHardwareVersions
  },
  {
    tableName: 'SolarPanelType',
    label: 'solar panel types',
    data: solarPanelTypes
  },
  {
    tableName: 'BatteryType',
    label: 'battery types',
    data: batteryTypes
  },
  {
    tableName: 'GpsAntennaType',
    label: 'gps antenna types',
    data: gpsAntennaTypes
  },
  {
    tableName: 'LoraAntennaType',
    label: 'lora antenna types',
    data: loraAntennaTypes
  },
  {
    tableName: 'GatewayHousingType',
    label: 'gateway housing types',
    data: gatewayHousingTypes
  },
  {
    tableName: 'NodeHousingType',
    label: 'node housing types',
    data: nodeHousingTypes
  },
  {
    tableName: 'HdwIssueStatus',
    label: 'hardware issue statuses',
    data: hdwIssueStatuses
  },
  
]

export async function insertSeedData(context: KeystoneContext) {

  console.log(SYSTEM_DIVIDER);
  console.log(`${SYSTEM_SIGNATURE}:🌱Inserting seed data🌱`);
  console.log(SYSTEM_DIVIDER);

  for (const model of modelsToSeed){
    console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding ${model.label}🌱`);
    console.log(SYSTEM_DIVIDER);
    //@ts-ignore
    await insertData(context, model.tableName, model.data);
  };

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding provinces🌱`);
  console.log(SYSTEM_DIVIDER);
  await insertProvinces(context);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding cities🌱`);
  console.log(SYSTEM_DIVIDER);
  await insertCities(context);

  console.log(SYSTEM_DIVIDER);
  console.log(`${SYSTEM_SIGNATURE}:🌱Data inserted🌱`);
  console.log(SYSTEM_DIVIDER);
}

const insertProvinces = async (context: KeystoneContext) => {
  const parsedProvinces = provinces.provincias.map(province => ({name: province.nombre}))
  await insertData(context, 'Province', parsedProvinces); 
}

const insertCities = async (context: KeystoneContext) => {
  const dbProvinces = await context.lists.Province.findMany({query: 'id name'});
  const parsedCities = cities.localidades.map(city => {
    const cityProvince = dbProvinces.find(p => p.name === city.provincia.nombre);
    return {name: city.nombre, province: {connect: {id: cityProvince?.id}}};
  })
  await insertData(context, 'City', parsedCities);
}

const insertData = async (context: KeystoneContext, schema: string, data: any) => {// TODO: Revisar caminos no felices
  await context.lists[schema].createMany({
    data: data,
  });
};