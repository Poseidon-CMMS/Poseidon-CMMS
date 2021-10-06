import { KeystoneContext } from "@keystone-next/keystone/types";
import { loraAntennaPositions } from "./data";
import { assetTypes } from "./data";

const SYSTEM_SIGNATURE = '🌊 PoseidonCMMS: ';
const SYSTEM_SEPARATOR = '--------------------------------------------';


type LoraAntennaPositionProps = [{
    name: string;
}];

type AssetTypeProps = [{
  name: string;
}];


export async function insertSeedData(context: KeystoneContext) {
  console.log(`${SYSTEM_SIGNATURE}:🌱Inserting seed data`);
  console.log(SYSTEM_SEPARATOR);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding lora antenna position`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createLoraAntennaPositions(context, loraAntennaPositions);

  console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding asset types`);
  console.log(SYSTEM_SEPARATOR);
  //@ts-ignore
  await createAssetTypes(context, assetTypes);
  
}  

const createLoraAntennaPositions = async (context: KeystoneContext, data: LoraAntennaPositionProps) => {// TODO: Revisar caminos no felices
  await context.lists.LoraAntennaPosition.createMany({
      data: data,
    });
  };

const createAssetTypes = async (context: KeystoneContext, data: AssetTypeProps) => {// TODO: Revisar caminos no felices
  await context.lists.AssetType.createMany({
      data: data,
    });
  };
  