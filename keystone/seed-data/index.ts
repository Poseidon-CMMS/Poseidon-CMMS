import { KeystoneContext } from "@keystone-6/core/types";
import {
  assetTypes,
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
  diagnosticTypes,
} from "./data";

import * as provinces from "./geographic/provincias.json";
import * as cities from "./geographic/localidades.json";

const SYSTEM_SIGNATURE = " 🌊 PoseidonCMMS: ";
const SYSTEM_DIVIDER = "----------------------------------------------------";

type AssetTypeProps = [
  {
    name: string;
  }
];

type PressureSensorProps = [
  {
    name: string;
  }
];

type NodeFirmwareVersion = [
  {
    version: string;
  }
];

type NodeHardwareVersion = [
  {
    version: string;
  }
];

type SolarPanelType = [
  {
    name: string;
  }
];

type BatteryType = [
  {
    name: string;
  }
];

type LoraAntennaType = [
  {
    name: string;
  }
];

type HousingType = [
  {
    name: string;
  }
];

type HdwIssueStatus = [
  {
    name: string;
  }
];

const modelsToSeed = [
  {
    tableName: "asset_type",
    label: "asset types",
    data: assetTypes,
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
    tableName: "zone",
    label: "CREA zones",
    data: creaZones,
  },
];

export async function insertSeedData(context: KeystoneContext) {
  console.log(SYSTEM_DIVIDER);
  console.log(`${SYSTEM_SIGNATURE}:🌱Inserting seed data🌱`);
  console.log(SYSTEM_DIVIDER);

  for (const model of modelsToSeed) {
    console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding ${model.label}🌱`);
    console.log(SYSTEM_DIVIDER);
    //@ts-ignore
    await insertData(context, model.tableName, model.data);
  }

  // console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding provinces🌱`);
  // console.log(SYSTEM_DIVIDER);
  // await insertProvinces(context);

  // console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding cities🌱`);
  // console.log(SYSTEM_DIVIDER);
  // await insertCities(context);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding diagnostic types🌱`);
  console.log(SYSTEM_DIVIDER);
  await insertDiagnosticTypes(context);

  console.log(SYSTEM_DIVIDER);
  console.log(`${SYSTEM_SIGNATURE}:🌱Data inserted🌱`);
  console.log(SYSTEM_DIVIDER);
}

const insertProvinces = async (context: KeystoneContext) => {
  const parsedProvinces = provinces.provincias.map((province: any) => ({
    name: province.nombre,
  }));
  await insertData(context, "Province", parsedProvinces);
};

const insertCities = async (context: KeystoneContext) => {
  const dbProvinces = await context.query.Province.findMany({
    query: "id name",
  });
  const parsedCities = cities.localidades.map((city: any) => {
    const cityProvince = dbProvinces.find(
      (p) => p.name === city.provincia.nombre
    );
    return {
      name: city.nombre,
      province: { connect: { id: cityProvince?.id } },
    };
  });
  await insertData(context, "City", parsedCities);
};

const insertDiagnosticTypes = async (context: KeystoneContext) => {
  const asset_types = await context.query.asset_type.findMany({
    query: "id name",
  });
  let parsedDiagnosticTypes = diagnosticTypes.map((diagnosticType: any) => {
    const assetType = asset_types.find((a) => a.name === diagnosticType.type);
    if (assetType)
      return {
        name: diagnosticType.name,
        type: { connect: { id: assetType.id } },
      };
    else {
      console.log('Advertencia: se intentó insertar un tipo de diagnóstico para un tipo de dispositivo inexistente');
      return null;
    }
  });
  parsedDiagnosticTypes = parsedDiagnosticTypes.filter(e => !!e);
  await insertData(context, "diagnostic_type", parsedDiagnosticTypes);
};

const insertData = async (
  context: KeystoneContext,
  schema: string,
  data: any
) => {
  // TODO: Revisar caminos no felices
  console.log(`voy a mter la tabla: ${schema}`);
  await context.db[schema].createMany({
    data: data,
  });
};
