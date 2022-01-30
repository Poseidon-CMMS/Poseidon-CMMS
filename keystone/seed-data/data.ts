import * as provincesJSON from "./geographic/provincias.json";
import * as citiesJSON from "./geographic/localidades.json";

// --- ASSETS ---
export const assetTypes = [
  {
    id: "12b1d619-4bee-423d-bafd-51a6f153d16a",
    name: "Gateway",
  },
  {
    id: "bf2030f3-d1be-4840-ad9f-7d610e9384bf",
    name: "Nodo GPS",
  },
  {
    id: "ad8e1c40-e608-4b09-afd5-7536226b9e43",
    name: "Sensor de Presión",
  },
];

export const componentTypes = [
  {
    id: "ab50feff-090e-41de-ae42-bff269cdc736",
    name: "GTW_BAT",
  },
  {
    id: "a8f76d69-bdff-462a-afa4-abd6d04f6a0f",
    name: "GTW_LED",
  },
  {
    id: "5de20bf5-1d45-4dfa-9d8a-ecc7efc2ebb1",
    name: "GTW_MODEM",
  },
  {
    id: "e0a90667-79c6-4f56-a5fd-bd0ceca8f653",
    name: "GTW_PCB",
  },
  {
    id: "2a9e2fe3-6fe2-4292-9bd1-b819f96a3e3c",
    name: "GTW_PCB_FW",
  },
  {
    id: "a4bb7b93-c8f4-41a8-9e5d-a99699139c32",
    name: "GTW_WIFI",
  },
  {
    id: "01641a42-540c-4865-9f71-e26335f24506",
    name: "SGPS_ANTGPS",
  },
  {
    id: "a233c6a8-50ac-4c25-9469-39dc8318d29a",
    name: "SGPS_BAT",
  },
  {
    id: "8716b58e-eeaf-4b76-afb0-c8200d01512f",
    name: "SGPS_FW",
  },
  {
    id: "518c6446-8ca4-4d49-bea0-f9ca4d11c0bd",
    name: "SGPS_LORA",
  },
  {
    id: "3032ae14-8ae2-47ea-95ff-4caf756a3303",
    name: "SGPS_Panel",
  },
  {
    id: "08514ccb-8290-4a07-9626-b6834ca00059",
    name: "SGPS_PCB",
  },
  {
    id: "11b2132b-1e79-4745-9afe-a40d3bec93cb",
    name: "SPRES_CONEC",
  },
  {
    id: "2d7342f3-7811-47e4-ae90-6d052f02652f",
    name: "SPRES_SENSOR",
  },
];

export const pressureSensorTypes = [
  {
    id: "84fc832b-1abc-49ba-8781-d9a657fe4df8",
    name: "GPT230 0-6bar",
  },
  {
    id: "8f155d09-cbb4-4705-bc67-1bddf9a4af48",
    name: "FST800-211A 0-6",
  },
  {
    id: "4a590f13-83af-4732-b1bf-6ccc2cabc385",
    name: "Sensor viejo 0-4",
  },
  {
    id: "a0ecca45-2c7d-4684-be88-0b09e6291df7",
    name: "GPT230 0-10bar",
  },
];

export const nodeFirmwareVersions = [
  {
    id: "a9ab420d-6465-4092-bfba-7dc48eda6f4b",
    version: "2.4(Sodaq)",
  },
  {
    id: "2e3e787d-a83c-4718-969f-1481c0d5bc08",
    version: "3.2.4",
  },
  {
    id: "f78d350a-9435-4e47-8cea-cf0b6f496c96",
    version: "3.3.0",
  },
  {
    id: "43a1070f-5382-441e-b374-23580c6992a5",
    version: "3.2.3",
  },
  {
    id: "e4efacd3-5d0f-47f5-b6b0-0180734d3090",
    version: "3.5",
  },
];

export const nodeHardwareVersions = [
  {
    id: "5eae75fe-f4b4-4bd1-b115-01c543652875",
    version: "SODAQ",
  },
  {
    id: "77b9a31c-4fc5-4667-8ad7-fa8efdd50371",
    version: "NODO PONCE 2.3",
  },
  {
    id: "da23ee2b-9e86-4036-8dd6-0b654f13605f",
    version: "NODO PONCE 2.2",
  },
];

export const solarPanelTypes = [
  {
    id: "088daecd-3941-42f3-8cfd-335d1293f420",
    name: "Seeed - 1w 100x80 (viejo)",
  },
  {
    id: "146f6886-893b-47c6-b80e-6a6d9c146a88",
    name: "Huaxu Energy - 1.1W 5V 110x80",
  },
  {
    id: "4d6aaf80-d10d-4969-aa42-637396e2f8d9",
    name: "Monarca - 5v 1.25w 110x80",
  },
  {
    id: "a52ee985-be78-4ec4-b87b-5adb2583e058",
    name: "Norics - 5v 1 w 110x70",
  },
];

export const batteryTypes = [
  {
    id: "c7f855c9-e820-44e7-9da3-e78ecde1302f",
    name: "LiPo - GNucleo",
  },
  {
    id: "7e31f6d4-6402-4be9-98fc-766b7d055989",
    name: "Li Ion - GeB China",
  },
];

export const loraAntennaTypes = [
  {
    id: "8e1d9760-4b20-40e1-99a5-8757a00d8793",
    name: "Dipolo (Sodaq)",
  },
  {
    id: "3b4ad774-3d99-4e57-af06-b39d9abf3538",
    name: "Antena SMA 2.5dB 0°",
  },
  {
    id: "63db4767-91c6-4916-a884-ee8f2f768e92",
    name: "Antena SMA 2.5dB 90°",
  },
  {
    id: "dcdbe66a-2a26-4fdf-b96c-eafda3731230",
    name: "Antena SMA 3dB 90°",
  },
  {
    id: "4263a3ac-4280-492b-8825-9c0bd591857e",
    name: "Hongsense - SMA 2.5dB 0°",
  },
  {
    id: "31b945b7-0994-41ef-b009-764da0f0819d",
    name: "Hongsense - SMA 2.5dB 90°",
  },
];

export const gpsAntennaTypes = [
  {
    id: "11b45685-199c-48a2-b939-e56d1cee9c79",
    name: "GPS ufl MINI",
  },
  {
    id: "37045299-a2c7-41c3-a340-3f9ae3608db8",
    name: "GPS ufl",
  },
  {
    id: "a3b332dc-9497-4f50-82a1-265577ad4f95",
    name: "Hongsense - GPS ufl",
  },
];

export const nodeHousingTypes = [
  {
    id: "5da6c54d-09b7-49cd-95ce-93dfedfa5357",
    name: "Rotomoldeo v1.0",
  },
  {
    id: "f41a4c28-8c21-4494-9fcb-99b06d903899",
    name: "Roker",
  },
];

export const gatewayHousingTypes = [
  {
    id: "2ca73168-7106-4cc4-9260-040317175dbd",
    name: "Rotomoldeo v1.0",
  },
];

// --- END ASSETS ---

// --- BUSINESS ---

export const SLA = [
  //unused, yet
  {
    name: "Nivel 1 - 48hs",
    MTTR: 48,
  },
  {
    name: "Nivel 2 - 84hs",
    MTTR: 84,
  },
  {
    name: "Nivel 3 - 120hs",
    MTTR: 120,
  },
];

// --- END BUSINESS ---

// --- OT ---

export const solutionTypes = [
  {
    id: "abb8fbe9-441b-41db-9b4a-e7ba3dd34304",
    name: "GTW - Alimentación Ext - Reconexión del cable de alimentación",
  },
  {
    id: "f69d53d5-5e1a-46ed-9d2c-81dd654c3932",
    name: "GTW - Alimentación Ext - Se conecta bien el Jumper Selector",
  },
  {
    id: "9518d034-4497-4038-bcb6-5b4a348bb878",
    name: "GTW - Antena LORA - Se conecta bien la antena desconectada",
  },
  {
    id: "a01d6a42-738c-4ab8-8301-ba57ef650f75",
    name: "GTW - Antena SAT - Se conecta bien la antena al módem",
  },
  {
    id: "fa299081-1267-4bf3-989e-6aaa4de33dcc",
    name: "GTW - Se empareja bien el Sensor GPS actual",
  },
  {
    id: "7102f3fc-dc8e-4da7-8c5d-30f07c5b037e",
    name: "GTW - Se cambia la disposición del GTW en el EQ de riego",
  },
  {
    id: "cf4d7151-f07b-4de2-89c4-6f424fab047f",
    name: "GTW - Se conectan correctamente los terminales de batería",
  },
  {
    id: "72231711-1dac-46cb-b083-3466b7dcc78a",
    name: "GTW - Se corrige el GTW registrado en App",
  },
  {
    id: "f639df3f-2933-43e0-84a8-6e0e932df291",
    name: "SGPS - Se posiciona correctamente el sensor en el EQ de riego",
  },
  {
    id: "2a6f448d-ee34-42c3-ac37-f5a065657c87",
    name: "SGPS - Se conecta el conector de batería suelto",
  },
  {
    id: "bad12d5e-40b7-4909-a51d-ec8a4a748805",
    name: "SPRES - Se conecta correctamente el cable en la placa GTW",
  },
  {
    id: "ca2a73f9-d562-4529-8072-27904e646417",
    name: "SPRES - Se coloca correctamente el conector del cable en el sensor",
  },
  {
    id: "01347488-95fe-47ea-818a-610e49210b44",
    name: "SPRES - Se limpia el conector del sensor",
  },
];

export const repairTypes = [
  {
    id: "37336e41-4887-4c0a-b47b-2eabd3f11c26",
    name: "Cambio de dispositivo",
    value: "device_change",
  },
  {
    id: "3742f663-f982-46b7-87ea-4168763afc55",
    name: "Reparación de dispositivo actual",
    value: "device_repair",
  },
];

export const autopsyRoots = [
  {
    name: "Firmware",
    id: "6ebc5839-445f-4371-8e36-085bbf5a3ae9",
  },
  {
    name: "Falla componente",
    id: "c338aefb-6c45-4f86-babd-a09b5c6ae509",
  },
  {
    name: "Ensamble",
    id: "e1d514bf-279b-4dc3-90f0-b6b2b9b3c5ec",
  },
  {
    name: "Humedad",
    id: "55dcfb37-261d-4184-9c2c-8e2e5a6be85e",
  },
];

// --- END OT ---

// --- GEOGRAPHIC ---
export const creaZones = [
  {
    id: "c73de6b6-59de-4d80-88c3-513d57e4c61e",
    name: "Centro",
    code: "CEN",
    is_foreign: false,
  },
  {
    id: "90ba0f27-63cc-4243-b070-d5caa2608d1c",
    name: "Litoral Norte",
    code: "LIN",
    is_foreign: false,
  },
  {
    id: "dfe7d9f6-d921-47dd-8939-a2503c6d4dfe",
    name: "Córdoba Norte",
    code: "COR",
    is_foreign: false,
  },
  {
    id: "7bf396f5-c825-4964-aec2-84aa79fc114c",
    name: "Este",
    code: "EST",
    is_foreign: false,
  },
  {
    id: "4f40316d-83a5-4c80-a900-b0fa9db8607c",
    name: "Norte de Buenos Aires",
    code: "NBA",
    is_foreign: false,
  },
  {
    id: "85ae21b9-9bed-4b10-a525-7f268ff3dfc4",
    name: "Litoral Sur",
    code: "LIS",
    is_foreign: false,
  },
  {
    id: "718ea56e-084d-417e-b94b-d422cd1917a8",
    name: "Noroeste Argentino",
    code: "CEN",
    is_foreign: false,
  },
  {
    id: "269f0d60-0b82-45c2-97ce-80d9bf5fc133",
    name: "Chaco Santiagueño",
    code: "CHS",
    is_foreign: false,
  },
  {
    id: "fb3ceeac-d916-4890-85c0-c6807e55dd51",
    name: "Oeste Arenoso",
    code: "OAR",
    is_foreign: false,
  },
  {
    id: "90f0649b-cfac-4b8d-94f2-7eb701c5216c",
    name: "Valles Cordilleranos",
    code: "VAC",
    is_foreign: false,
  },
  {
    id: "05adcc57-0bf1-49d8-ac55-0740020b381c",
    name: "Sur de Santa Fé",
    code: "SSF",
    is_foreign: false,
  },
  {
    id: "cd8dd7c4-e99b-41f5-b9e1-f3485036f193",
    name: "Sudoeste",
    code: "SUO",
    is_foreign: false,
  },
  {
    id: "8e0bd268-05b6-46d0-ba6b-f306ba0c1396",
    name: "Patagonia",
    code: "PAT",
    is_foreign: false,
  },
  {
    id: "9862d25f-de34-4200-ac02-45ba8ea9b184",
    name: "Sudeste",
    code: "SDE",
    is_foreign: false,
  },
  {
    id: "b1632583-5677-4091-ad5b-6d29dcae5e1b",
    name: "Santa Fé Centro",
    code: "SFC",
    is_foreign: false,
  },
  {
    id: "0ed4ea6a-4740-4ab5-9d7b-3ee8dd64f480",
    name: "Norte de Santa Fé",
    code: "NSF",
    is_foreign: false,
  },
  {
    id: "6dafe65a-26d2-4349-a7d8-11f85f43d0b0",
    name: "Semiárida",
    code: "SAR",
    is_foreign: false,
  },
  {
    id: "f063b2d6-c08a-4336-b0e7-f55f9eaf35fb",
    name: "Oeste",
    code: "OES",
    is_foreign: false,
  },
  {
    id: "16b3e19f-9d25-4476-a737-476833108573",
    name: "Mar y Sierras",
    code: "MYS",
    is_foreign: false,
  },
];
// --- END GEOGRAPHIC ---

///MOCK DATA for TESTS/DEMOS
export const fields = [
  {
    id: "ddcbc7cd-a0b9-48ae-b1b7-e0e9ea45f1dd",
    name: "Estancia Sierra de los Difuntos",
    gate: "38",
    phone: "+5492230000000",
    zoneId: "16b3e19f-9d25-4476-a737-476833108573",
  },
  {
    id: "5c7e539e-80f8-4c05-a223-8c6c2da1ad28",
    name: "Estancia Villa Epecuén",
    gate: "82",
    phone: "+5492231111111",
    zoneId: "cd8dd7c4-e99b-41f5-b9e1-f3485036f193",
  },
  {
    id: "1d78c078-9880-4190-8a26-8f7dbd296a47",
    name: "Estancia Las Cascadas Necochea",
    gate: "882",
    phone: "+5492233333333",
    zoneId: "16b3e19f-9d25-4476-a737-476833108573",
  },
];


export const provinces = provincesJSON.provincias.map((province: any) => ({
  id: province.uuid,
  name: province.nombre,
}));

export const cities = citiesJSON.localidades.map((city: any) => {
  return {
    name: city.nombre,
    provinceId: city.provincia.uuid,
  };
});
