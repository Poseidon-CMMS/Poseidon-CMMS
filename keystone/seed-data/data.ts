// --- ASSETS ---
export const assetTypes = [
  { name:  'Gateway'},
  { name:  'Nodo GPS'},
  { name:  'Sensor de Presión'},
  { name:  'LoRa'},
]

export const pressureSensorTypes = [
  { name: 'GPT230 0-6bar'},
  { name: 'FST800-211A 0-6'},
  { name: 'Sensor viejo 0-4'},
  { name: 'GPT230 0-10bar'}
]

export const nodeFirmwareVersions = [
  { version: '2.4(Sodaq)'},
  { version: '3.2.4'},
  { version: '3.3.0'},
  { version: '3.2.3'},
  { version: '3.5'}
]

export const nodeHardwareVersions = [
  { version: 'SODAQ'},
  { version: 'NODO PONCE 2.3'},
  { version: 'NODO PONCE 2.2'}
]

export const solarPanelTypes = [
  { name: 'Seeed - 1w 100x80 (viejo)'},
  { name: 'Huaxu Energy - 1.1W 5V 110x80'},
  { name: 'Monarca - 5v 1.25w 110x80'},
  { name: 'Norics - 5v 1 w 110x70'}
]

export const batteryTypes = [
  { name: 'LiPo - GNucleo'},
  { name: 'Li Ion - GeB China'}
]

export const loraAntennaTypes = [
  { name : 'Dipolo (Sodaq)'},
  { name : 'Antena SMA 2.5dB 0°'},
  { name : 'Antena SMA 2.5dB 90°'},
  { name : 'Antena SMA 3dB 90°'},
  { name : 'Hongsense - SMA 2.5dB 0°'},
  { name : 'Hongsense - SMA 2.5dB 90°'}
]

export const gpsAntennaTypes = [
  { name : 'GPS ufl MINI'},
  { name : 'GPS ufl'},
  { name : 'Hongsense - GPS ufl'}
]

export const nodeHousingTypes = [
  { name : 'Rotomoldeo v1.0'},
  { name: 'Roker'},
]

export const gatewayHousingTypes = [
  { name : 'Rotomoldeo v1.0'},
]



// --- END ASSETS ---

// --- BUSINESS ---

export const SLA = [
  { 
    name: 'Nivel 1 - 48hs',
    MTTR: 48
  },
  { 
    name: 'Nivel 2 - 84hs',
    MTTR: 84
  },
  { 
    name: 'Nivel 3 - 120hs',
    MTTR: 120
  },
]

// --- END BUSINESS ---

// --- OT ---
export const diagnosticTypes = [
  {type: 'Gateway', name: 'Sin datos de GTW'},
  {type: 'Gateway', name: 'Intermitencia satelital - Ubicación'},
  {type: 'Gateway', name: 'Intermitencia satelital - Alimentación'},
  {type: 'Nodo GPS', name: 'Pérdida de paquetes LORA - Muerte súbita'},
  {type: 'Nodo GPS', name: 'Posiciones GPS inválidas'},
  {type: 'Nodo GPS', name: 'Pérdida de paquetes LORA - Intermitente'},
  {type: 'Nodo GPS', name: 'Pérdida de paquetes LORA - Desde inicio de datos'},
  {type: 'Nodo GPS', name: 'Pérdida de paquetes LORA - Ubicación'},
  {type: 'Nodo GPS', name: 'Pérdida de paquetes LORA - Horario'},
  {type: 'Sensor de Presión', name: 'Presión en 0mA (203)'},
  {type: 'Sensor de Presión', name: 'Presiones inválidas (203)'},
  {type: 'Sensor de Presión', name: 'Oscilación de presión'},
  {type: 'Sensor de Presión', name: 'Presión medida distinta de real'},
];


export const periciaTypes = [ //TODO: Traducir y ver con mauri si hay que crear distintos tipos
  //ej: periciaGtwTypes, periciaNodeTypes
  { 
    name: 'Nivel 1 - 48hs',
    root: 'Instalacion',
    satelitalPower: true,
    batteryTension: false,
    loraPower: true,
    pressureSensor: true
  },
]

// --- END OT ---


// --- GEOGRAPHIC ---
export const creaZones =[
  {name: 'Centro', code: 'CEN'},
  {name: 'Chaco Santiagueño', code: 'CHS'},
  {name: 'Córdoba Norte', code: 'COR'},
  {name: 'Este', code: 'EST'},
  {name: 'Litoral Norte', code: 'LIN'},
  {name: 'Litoral Sur', code: 'LIS'},
  {name: 'Mar y Sierras', code: 'MYS'},
  {name: 'Norte de Buenos Aires', code: 'NBA'},
  {name: 'Noroeste Argentino', code: 'CEN'},
  {name: 'Norte de Santa Fé', code: 'NSF'},
  {name: 'Oeste Arenoso', code: 'OAR'},
  {name: 'Oeste', code: 'OES'},
  {name: 'Patagonia', code: 'PAT'},
  {name: 'Semiárida', code: 'SAR'},
  {name: 'Santa Fé Centro', code: 'SFC'},
  {name: 'Sur de Santa Fé', code: 'SSF'},
  {name: 'Sudeste', code: 'SDE'},
  {name: 'Sudoeste', code: 'SUO'},
  {name: 'Valles Cordilleranos', code: 'VAC'},
]
// --- END GROGRAPHIC ---