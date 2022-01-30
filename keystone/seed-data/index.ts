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
  inspectionTypes,
  solutionTypes,
  repairTypes,
  autopsyTypes,
  autopsyRoots,
  irrigators,
  provinces,
  cities,
  fields,
} from "./data";
import { diagnosticTypes } from "./data/diagnosticTypes";

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
  }
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

  console.log(`\n${SYSTEM_SIGNATURE}🌱Seeding inspection types🌱`);
  console.log(SYSTEM_DIVIDER);
  await insertInspectionTypes(context);

  console.log(`\n${SYSTEM_SIGNATURE}🌱Seeding autopsy types🌱`);
  console.log(SYSTEM_DIVIDER);
  await insertAutopsyTypes(context);

  console.log('');
  console.log('');
  console.log(SYSTEM_DIVIDER);
  console.log(SYSTEM_DIVIDER);
  console.log(`${SYSTEM_SIGNATURE}🌱Data inserted🌱`);
  console.log(SYSTEM_DIVIDER);
  console.log(SYSTEM_DIVIDER);
}

const insertInspectionTypes = async (context: KeystoneContext) => {
  const asset_types = await context.query.asset_type.findMany({
    query: "id name",
  });
  let parsedInspectionTypes = inspectionTypes.map((inspectionType: any) => {
    const assetType = asset_types.find(
      (a: any) => a.name === inspectionType.type
    );
    if (assetType)
      return {
        ...inspectionType,
        type: { connect: { id: assetType.id } },
      };
    else {
      console.log("⚠ Warning: missing asset_type for a given inspection");
      return null;
    }
  });
  parsedInspectionTypes = parsedInspectionTypes.filter((e) => !!e);
  await insertData(context, "inspection_type", parsedInspectionTypes);
};

const insertAutopsyTypes = async (context: KeystoneContext) => {
  const asset_types = await context.query.asset_type.findMany({
    query: "id name",
  });
  const component_types = await context.query.component_type.findMany({
    query: "id name",
  });
  const autopsy_roots = await context.query.autopsy_root.findMany({
    query: "id name",
  });
  let parsedAutopsyTypes = autopsyTypes.map((autopsyType: any) => {
    const assetType = asset_types.find(
      (a: any) => a.name === autopsyType.asset_type
    );
    const componentType = component_types.find(
      (a: any) => a.name === autopsyType.component
    );
    const autopsyRoot = autopsy_roots.find(
      (a: any) => a.name === autopsyType.root
    );
    if (assetType && componentType && autopsyRoot) {
      return {
        ...autopsyType,
        asset_type: { connect: { id: assetType.id } },
        component: { connect: { id: componentType.id } },
        root: { connect: { id: autopsyRoot.id } },
      };
    } else {
      if (!assetType)
        console.log(
          `⚠ Warning: missing assetType: ${autopsyType.asset_type} for a given autopsyType: ${autopsyType.name}`
        );
      if (!componentType)
        console.log(
          `⚠ Warning: missing component: ${autopsyType.component} for a given autopsyType: ${autopsyType.name}`
        );
      if (!autopsyRoot)
        console.log(
          `⚠ Warning: missing root: ${autopsyType.root} for a given autopsyType: ${autopsyType.name}`
        );
      return null;
    }

  });

  parsedAutopsyTypes = parsedAutopsyTypes.filter((e) => !!e);
  await insertData(context, "autopsy_type", parsedAutopsyTypes);
};

const insertData = async (
  context: KeystoneContext,
  schema: string,
  data: any
) => {
  // TODO: Revisar caminos no felices
  let dataCreated = await context.db[schema].createMany({
    data: data,
  });

  if (dataCreated) {
    console.log(`${SYSTEM_SIGNATURE}: ✅ ${schema} data inserted `);
    console.log(SYSTEM_DIVIDER);
  } else {
    console.log(`${SYSTEM_SIGNATURE}: ❌ Couldn't insert ${schema} data`);
    console.log(SYSTEM_DIVIDER);
  }
};

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
