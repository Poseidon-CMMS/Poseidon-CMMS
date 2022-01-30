// --- ASSETS ---
export const assetTypes = [
  { name: "Gateway" },
  { name: "Nodo GPS" },
  { name: "Sensor de Presión" }
];

export const componentTypes = [
  { name: "GTW_BAT" },
  { name: "GTW_LED" },
  { name: "GTW_MODEM" },
  { name: "GTW_PCB" },
  { name: "GTW_PCB_FW" },
  { name: "GTW_WIFI" },
  { name: "SGPS_ANTGPS" },
  { name: "SGPS_BAT" },
  { name: "SGPS_FW" },
  { name: "SGPS_LORA" },
  { name: "SGPS_Panel" },
  { name: "SGPS_PCB" },
  { name: "SPRES_CONEC" },
  { name: "SPRES_SENSOR" },
];

export const pressureSensorTypes = [
  { name: "GPT230 0-6bar" },
  { name: "FST800-211A 0-6" },
  { name: "Sensor viejo 0-4" },
  { name: "GPT230 0-10bar" },
];

export const nodeFirmwareVersions = [
  { version: "2.4(Sodaq)" },
  { version: "3.2.4" },
  { version: "3.3.0" },
  { version: "3.2.3" },
  { version: "3.5" },
];

export const nodeHardwareVersions = [
  { version: "SODAQ" },
  { version: "NODO PONCE 2.3" },
  { version: "NODO PONCE 2.2" },
];

export const solarPanelTypes = [
  { name: "Seeed - 1w 100x80 (viejo)" },
  { name: "Huaxu Energy - 1.1W 5V 110x80" },
  { name: "Monarca - 5v 1.25w 110x80" },
  { name: "Norics - 5v 1 w 110x70" },
];

export const batteryTypes = [
  { name: "LiPo - GNucleo" },
  { name: "Li Ion - GeB China" },
];

export const loraAntennaTypes = [
  { name: "Dipolo (Sodaq)" },
  { name: "Antena SMA 2.5dB 0°" },
  { name: "Antena SMA 2.5dB 90°" },
  { name: "Antena SMA 3dB 90°" },
  { name: "Hongsense - SMA 2.5dB 0°" },
  { name: "Hongsense - SMA 2.5dB 90°" },
];

export const gpsAntennaTypes = [
  { name: "GPS ufl MINI" },
  { name: "GPS ufl" },
  { name: "Hongsense - GPS ufl" },
];

export const nodeHousingTypes = [
  { name: "Rotomoldeo v1.0" },
  { name: "Roker" },
];

export const gatewayHousingTypes = [{ name: "Rotomoldeo v1.0" }];

// --- END ASSETS ---

// --- BUSINESS ---

export const SLA = [
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

export const diagnosticTypes = [
  { type: "Gateway", name: "Sin datos de GTW", gateway_satellite_power: true },
  { type: "Gateway", name: "Intermitencia satelital - Ubicación", gateway_satellite_power: true, angles: true },
  { type: "Gateway", name: "Intermitencia satelital - Alimentación", packet_202_count: true },
  { type: "Nodo GPS", name: "Pérdida de paquetes LORA - Muerte súbita", battery_2to3: true },
  { type: "Nodo GPS", name: "Posiciones GPS inválidas", positions: true },
  { type: "Nodo GPS", name: "Pérdida de paquetes LORA - Intermitente", lost_packets: true, node_to_gateway_distance_in_meters: true },
  {
    type: "Nodo GPS",
    name: "Pérdida de paquetes LORA - Desde inicio de datos",
    battery_2to3: true,
    gateway_first_data_transmission_date: true
  },
  { 
    type: "Nodo GPS", 
    name: "Pérdida de paquetes LORA - Ubicación", 
    angles: true,
    height_difference_in_meters: true,
    lost_packets: true,
    node_to_gateway_distance_in_meters: true
  },
  { type: "Nodo GPS", name: "Pérdida de paquetes LORA - Horario", to_hour:true, from_hour: true, lost_packets: true },
  { type: "Sensor de Presión", name: "Presión en 0mA (203)", packet_203_count: true },
  { type: "Sensor de Presión", name: "Presiones inválidas (203)", packet_203_count: true },
  { type: "Sensor de Presión", name: "Oscilación de presión", pressure_difference: true },
  { type: "Sensor de Presión", name: "Presión medida distinta de real", pressure_difference:true },
];

export const inspectionTypes = [
  { name: "Alimentación Ext -  Mal conectado en tablero", type: "Gateway" },
  {
    name: "Alimentación Ext - Cable alim. desconectado en placa",
    type: "Gateway",
  },
  {
    name: "Alimentación Ext - Cable alim. desconectado en tablero",
    type: "Gateway",
  },
  { name: "Alimentación Ext - Cable cortado", type: "Gateway" },
  { name: "Alimentación Ext - Jumper mal conectado", type: "Gateway" },
  {
    name: "GTW - Antena LORA mal conectada",
    type: "Gateway",
    lora_power: true,
  },
  { name: "GTW - Dispositivo Faltante / Robo / Extraviado", type: "Gateway" },
  { name: "GTW - Mal emparejado SGPS", type: "Gateway" },
  { name: "GTW - Mal emparejado SGPS -  ID 1", type: "Gateway" },
  { name: "GTW - Mal emparejado SGPS - Distinto de 1", type: "Gateway" },
  { name: "GTW - No recibe mensajes LORA", type: "Gateway" },
  {
    name: "GTW - Otro",
    type: "Gateway",
    pot_sat: true,
    gateway_battery_voltage: true,
    pressure_sensor_signal: true,
  },
  { name: "GTW - Problema con WiFi", type: "Gateway" },
  { name: "GTW_PRESION - Mide con oscilación", type: "Gateway" },
  { name: "GTW_PRESION - Mide señal inválida", type: "Gateway" },
  { name: "GTW_PRESION - No mide la señal del sensor", type: "Gateway" },
  {
    name: "Satelital - Cable antena desconectado",
    type: "Gateway",
    pot_sat: true,
  },
  { name: "Satelital - Conector módem roto", type: "Gateway", pot_sat: true },
  {
    name: "Satelital - Disposición GTW en EQ de riego",
    type: "Gateway",
    pot_sat: true,
  },
  { name: "Satelital - ID Módem distinto al registrado", type: "Gateway" },
  { name: "Satelital - Módem deshabilitado", type: "Gateway" },
  {
    name: "GTW_BAT - Dañada/Muerta",
    type: "Gateway",
    gateway_battery_voltage: true,
  },
  {
    name: "GTW_BAT - Desconectada",
    type: "Gateway",
    gateway_battery_voltage: true,
  },
  {
    name: "GTW_BAT - Placa no carga",
    type: "Gateway",
    gateway_battery_voltage: true,
  },
  { name: "SGPS - Antena GPS desconectada / rota", type: "Nodo GPS" },
  {
    name: "SGPS - Antena LORA mal conectada",
    type: "Nodo GPS",
    lora_power: true,
  },
  {
    name: "SGPS - Batería desconectada",
    type: "Nodo GPS",
    gps_node_battery_voltage: true,
  },
  { name: "SGPS - Dispositivo Faltante / Robo / Extraviado", type: "Nodo GPS" },
  { name: "SGPS - Muerto", type: "Nodo GPS", gps_node_battery_voltage: true },
  {
    name: "SGPS - No carga por panel",
    type: "Nodo GPS",
    gps_node_battery_voltage: true,
  },
  {
    name: "SGPS - Otro",
    type: "Nodo GPS",
    lora_power: true,
    gps_node_battery_voltage: true,
  },
  { name: "SGPS - Señal LORA baja", type: "Nodo GPS", lora_power: true },
  { name: "SGPS - Sensor caído", type: "Nodo GPS", lora_power: true },
  { name: "SGPS - Sensor mal ubicado", type: "Nodo GPS", lora_power: true },
  {
    name: "SPRES - Cable cortado",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "SPRES - Cable mal conectado en placa",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "SPRES - Conector de sensor dañado",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "SPRES - Conector de sensor mal conectado",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "SPRES - Conector de sensor sulfatado",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "SPRES - Dispositivo Faltante / Robo / Extraviado",
    type: "Sensor de Presión",
  },
  {
    name: "SPRES - Otro",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "SPRES - Sensor dañado (señal)",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "SPRES - Sensor pinchado (agua en conector)",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "CLIENTE - Manómetro cliente dañado",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
  {
    name: "CLIENTE - Oscilación en campo (Bomba)",
    type: "Sensor de Presión",
    pressure_sensor_signal: true,
  },
];

export const solutionTypes = [
  {name: "GTW - Alimentación Ext - Reconexión del cable de alimentación"},
  {name: "GTW - Alimentación Ext - Se conecta bien el Jumper Selector"},
  {name: "GTW - Antena LORA - Se conecta bien la antena desconectada"},
  {name: "GTW - Antena SAT - Se conecta bien la antena al módem"},
  {name: "GTW - Se empareja bien el Sensor GPS actual"},
  {name: "GTW - Se cambia la disposición del GTW en el EQ de riego"},
  {name: "GTW - Se conectan correctamente los terminales de batería"},
  {name: "GTW - Se corrige el GTW registrado en App"},
  {name: "SGPS - Se posiciona correctamente el sensor en el EQ de riego"},
  {name: "SGPS - Se conecta el conector de batería suelto"},
  {name: "SPRES - Se conecta correctamente el cable en la placa GTW"},
  {name: "SPRES - Se coloca correctamente el conector del cable en el sensor"},
  {name: "SPRES - Se limpia el conector del sensor"},
];

export const repairTypes = [
  { name: "Cambio de dispositivo", value: "device_change" },
  { name: "Reparación de dispositivo actual", value: "device_repair" },
];

export const autopsyTypes = [
  { 
    name: "Batería GTW - Dañada",
    component: "GTW_BAT",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Batería GTW - Conector dañado",
    component: "GTW_BAT",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "LED - Falla",
    component: "GTW_LED",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "LED - Cable mal conectado",
    component: "GTW_LED",
    asset_type: "Gateway",
    root: "Ensamble"
  },
  { 
    name: "Satelital - Conector MMCX dañado",
    component: "GTW_MODEM",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Satelital - Conector MMCX arrancado",
    component: "GTW_MODEM",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Sin tensión de entrada con fuente externa",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - No responde o se reinicia",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla comunicación con Módem",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Error al detectar placa",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla WiFi en placa",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla alimentación LED",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla sensor de apertura",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla sensor de presencia",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla en entradas auxiliares",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Tensiones de inspección incorrectas",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla circuito de carga",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla comunicación LoRa",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Medición de presión incorrecta",
    component: "GTW_PCB",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "Placa GTW - Falla de FW",
    component: "GTW_PCB_FW",
    asset_type: "Gateway",
    root: "Firmware"
  },
  { 
    name: "Placa GTW - Falla en módulo Wifi",
    component: "GTW_WIFI",
    asset_type: "Gateway",
    root: "Falla componente"
  },
  { 
    name: "SGPS - Antena GPS dañada",
    component: "SGPS_ANTGPS",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SGPS - Falla ESP32",
    component: "SGPS_ANTGPS",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SGPS - Falla módulo GPS",
    component: "SGPS_ANTGPS",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "Batería SGPS - Con fallas",
    component: "SGPS_BAT",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "Batería SGPS - Dañada",
    component: "SGPS_BAT",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "Batería SGPS - Conector sulfatado",
    component: "SGPS_BAT",
    asset_type: "Nodo GPS",
    root: "Humedad"
  },
  { 
    name: "Batería SGPS - Polaridad invertida",
    component: "SGPS_BAT",
    asset_type: "Nodo GPS",
    root: "Ensamble"
  },
  { 
    name: "SGPS - Falla FW",
    component: "SGPS_FW",
    asset_type: "Nodo GPS",
    root: "Firmware"
  },
  { 
    name: "SGPS - Antena LORA dañada",
    component: "SGPS_LORA",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SGPS - Conector LORA dañado",
    component: "SGPS_LORA",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "Panel - Dañado",
    component: "SGPS_Panel",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "Panel - Potencia no nominal",
    component: "SGPS_Panel",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "Panel - Conector sulfatado",
    component: "SGPS_Panel",
    asset_type: "Nodo GPS",
    root: "Humedad"
  },
  { 
    name: "Panel - Polaridad invertida",
    component: "SGPS_Panel",
    asset_type: "Nodo GPS",
    root: "Ensamble"
  },
  { 
    name: "Panel - Cableado roto",
    component: "SGPS_Panel",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SGPS - Polaridad invertida",
    component: "SGPS_PCB",
    asset_type: "Nodo GPS",
    root: "Ensamble"
  },
  { 
    name: "SGPS - Componente dañado en PCB",
    component: "SGPS_PCB",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SGPS - ESP32 no responde",
    component: "SGPS_PCB",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SGPS - Falla circuito de carga",
    component: "SGPS_PCB",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SGPS - Falla módulo LORA",
    component: "SGPS_PCB",
    asset_type: "Nodo GPS",
    root: "Falla componente"
  },
  { 
    name: "SPRES - Cable mal conectado en placa",
    component: "SPRES_CONEC",
    asset_type: "Sensor de Presión",
    root: "Falla componente"
  },
  { 
    name: "SPRES - Cable cortado",
    component: "SPRES_CONEC",
    asset_type: "Sensor de Presión",
    root: "Falla componente"
  },
  { 
    name: "SPRES - Conector de sensor mal conectado",
    component: "SPRES_CONEC",
    asset_type: "Sensor de Presión",
    root: "Falla componente"
  },
  { 
    name: "SPRES - Conector de sensor dañado",
    component: "SPRES_SENSOR",
    asset_type: "Sensor de Presión",
    root: "Falla componente"
  },
  { 
    name: "SPRES - Sensor pinchado (agua en conector)",
    component: "SPRES_SENSOR",
    asset_type: "Sensor de Presión",
    root: "Falla componente"
  },
  { 
    name: "SPRES - Sensor dañado (señal fuera de rango)",
    component: "SPRES_SENSOR",
    asset_type: "Sensor de Presión",
    root: "Falla componente"
  },
  { 
    name: "SPRES - Conector de sensor sulfatado",
    component: "SPRES_SENSOR",
    asset_type: "Sensor de Presión",
    root: "Falla componente"
  }
];

export const autopsyRoots = [
  { name: "Firmware"}, { name: "Falla componente" }, { name: "Ensamble"}, { name: "Humedad" }
]

// --- END OT ---

// --- GEOGRAPHIC ---
export const creaZones = [
  { name: "Centro", code: "CEN" },
  { name: "Chaco Santiagueño", code: "CHS" },
  { name: "Córdoba Norte", code: "COR" },
  { name: "Este", code: "EST" },
  { name: "Litoral Norte", code: "LIN" },
  { name: "Litoral Sur", code: "LIS" },
  { name: "Mar y Sierras", code: "MYS" },
  { name: "Norte de Buenos Aires", code: "NBA" },
  { name: "Noroeste Argentino", code: "CEN" },
  { name: "Norte de Santa Fé", code: "NSF" },
  { name: "Oeste Arenoso", code: "OAR" },
  { name: "Oeste", code: "OES" },
  { name: "Patagonia", code: "PAT" },
  { name: "Semiárida", code: "SAR" },
  { name: "Santa Fé Centro", code: "SFC" },
  { name: "Sur de Santa Fé", code: "SSF" },
  { name: "Sudeste", code: "SDE" },
  { name: "Sudoeste", code: "SUO" },
  { name: "Valles Cordilleranos", code: "VAC" },
];
// --- END GEOGRAPHIC ---


///MOCK DATA for TESTS/DEMOS

export const irrigators = [

];