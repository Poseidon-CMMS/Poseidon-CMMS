import { KeystoneContext } from "@keystone-next/keystone/types";
import { loraAntennaPositions } from "./data";

const SYSTEM_SIGNATURE = '🌊 PoseidonCMMS: ';
const SYSTEM_SEPARATOR = '--------------------------------------------';


type LoraAntennaPositionProps = [{
    name: string;
}];


export async function insertSeedData(context: KeystoneContext) {
  console.log(`${SYSTEM_SIGNATURE}:🌱Inserting seed data`);
  console.log(SYSTEM_SEPARATOR);

  const createLoraAntennaPositions = async (loraAntennaPositionData: LoraAntennaPositionProps) => {// TODO: Revisar caminos no felices
    await context.lists.LoraAntennaPosition.createMany({
        data: loraAntennaPositionData,
      });
    };

      console.log(`\n${SYSTEM_SIGNATURE}:🌱Seeding lora antenna position`);
      console.log(SYSTEM_SEPARATOR);
      //@ts-ignore
      await createLoraAntennaPositions(loraAntennaPositions);
}  