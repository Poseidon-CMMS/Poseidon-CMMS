-- CreateTable
CREATE TABLE "asset_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "asset_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autopsy" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "self_diagnostic_file_filesize" INTEGER,
    "self_diagnostic_file_mode" TEXT,
    "self_diagnostic_file_filename" TEXT,
    "pressure_log_filesize" INTEGER,
    "pressure_log_mode" TEXT,
    "pressure_log_filename" TEXT,
    "comments" TEXT NOT NULL DEFAULT E'',
    "user" UUID,
    "hdw_issue" UUID,
    "autopsy_type" UUID,

    CONSTRAINT "autopsy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autopsy_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "asset_type" UUID,
    "component" UUID,
    "root" UUID,

    CONSTRAINT "autopsy_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autopsy_root" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "autopsy_root_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battery_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "battery_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "province" UUID,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "component_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnostic_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "type" UUID,
    "gateway_satellite_power" BOOLEAN NOT NULL DEFAULT false,
    "angles" BOOLEAN NOT NULL DEFAULT false,
    "packet_202_count" BOOLEAN NOT NULL DEFAULT false,
    "battery_2to3" BOOLEAN NOT NULL DEFAULT false,
    "positions" BOOLEAN NOT NULL DEFAULT false,
    "lost_packets" BOOLEAN NOT NULL DEFAULT false,
    "node_to_gateway_distance_in_meters" BOOLEAN NOT NULL DEFAULT false,
    "gateway_first_data_transmission_date" BOOLEAN NOT NULL DEFAULT false,
    "height_difference_in_meters" BOOLEAN NOT NULL DEFAULT false,
    "from_hour" BOOLEAN NOT NULL DEFAULT false,
    "to_hour" BOOLEAN NOT NULL DEFAULT false,
    "packet_203_count" BOOLEAN NOT NULL DEFAULT false,
    "pressure_difference" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "diagnostic_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnostic" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comments" TEXT NOT NULL DEFAULT E'',
    "gateway_satellite_power" DOUBLE PRECISION,
    "angles" TEXT NOT NULL DEFAULT E'',
    "packet_202_count" INTEGER,
    "battery_2to3" BOOLEAN NOT NULL DEFAULT false,
    "positions" TEXT,
    "lost_packets" INTEGER,
    "node_to_gateway_distance_in_meters" DOUBLE PRECISION,
    "gateway_first_data_transmission_date" TIMESTAMP(3),
    "height_difference_in_meters" DOUBLE PRECISION,
    "from_hour" TEXT NOT NULL DEFAULT E'',
    "to_hour" TEXT NOT NULL DEFAULT E'',
    "packet_203_count" INTEGER,
    "pressure_difference" DOUBLE PRECISION,
    "grafana_link" TEXT NOT NULL DEFAULT E'',
    "altimetry_image_filesize" INTEGER,
    "altimetry_image_extension" TEXT,
    "altimetry_image_width" INTEGER,
    "altimetry_image_height" INTEGER,
    "altimetry_image_mode" TEXT,
    "altimetry_image_id" TEXT,
    "user" UUID,
    "hdw_issue" UUID,
    "diagnostic_type" UUID,

    CONSTRAINT "diagnostic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "gate" TEXT NOT NULL DEFAULT E'',
    "phone" TEXT NOT NULL DEFAULT E'',
    "zone" UUID,
    "city" UUID,
    "client" UUID,

    CONSTRAINT "field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gateway" (
    "id" UUID NOT NULL,
    "fabrication_date" TIMESTAMP(3) NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',
    "housing_type" UUID,
    "satellite_modem" UUID,
    "satellite_antenna" UUID,
    "pcb_gateway" UUID,
    "hdw_issue" UUID,
    "lora_antenna_type" UUID,
    "storage_location" UUID,

    CONSTRAINT "gateway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gateway_firmware_version" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "gateway_firmware_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gateway_hardware_version" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "gateway_hardware_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gateway_housing_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "gateway_housing_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gps_antenna_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "gps_antenna_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gps_node" (
    "id" UUID NOT NULL,
    "fabrication_date" TIMESTAMP(3) NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',
    "internal_photo_filesize" INTEGER,
    "internal_photo_extension" TEXT,
    "internal_photo_width" INTEGER,
    "internal_photo_height" INTEGER,
    "internal_photo_mode" TEXT,
    "internal_photo_id" TEXT,
    "external_photo_filesize" INTEGER,
    "external_photo_extension" TEXT,
    "external_photo_width" INTEGER,
    "external_photo_height" INTEGER,
    "external_photo_mode" TEXT,
    "external_photo_id" TEXT,
    "battery_type" UUID,
    "gps_antenna_type" UUID,
    "node_housing_type" UUID,
    "lora_antenna_type" UUID,
    "solar_panel_type" UUID,
    "pcb_node" UUID,
    "storage_location" UUID,
    "hdw_issue" UUID,

    CONSTRAINT "gps_node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hdw_issue" (
    "id" UUID NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "close_date" TIMESTAMP(3),
    "automatic_diagnostic" INTEGER,
    "status" TEXT NOT NULL,
    "assigned_technician" UUID,
    "irrigator" UUID,
    "pressure_sensor" UUID,

    CONSTRAINT "hdw_issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comments" TEXT NOT NULL DEFAULT E'',
    "satellite_power" DOUBLE PRECISION,
    "gateway_battery_voltage" DOUBLE PRECISION,
    "lora_power" DOUBLE PRECISION,
    "gps_node_battery_voltage" DOUBLE PRECISION,
    "pressure_sensor_signal" DOUBLE PRECISION,
    "picture_filesize" INTEGER,
    "picture_extension" TEXT,
    "picture_width" INTEGER,
    "picture_height" INTEGER,
    "picture_mode" TEXT,
    "picture_id" TEXT,
    "log_filesize" INTEGER,
    "log_mode" TEXT,
    "log_filename" TEXT,
    "user" UUID,
    "hdw_issue" UUID,
    "inspection_type" UUID,

    CONSTRAINT "inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "type" UUID,
    "pot_sat" BOOLEAN NOT NULL DEFAULT false,
    "gateway_battery_voltage" BOOLEAN NOT NULL DEFAULT false,
    "gps_node_battery_voltage" BOOLEAN NOT NULL DEFAULT false,
    "lora_power" BOOLEAN NOT NULL DEFAULT false,
    "pressure_sensor_signal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "inspection_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "install_uninstall_request" (
    "id" UUID NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "completion_date" TIMESTAMP(3),
    "close_date" TIMESTAMP(3),
    "irrigator" UUID,
    "gateway" UUID,
    "gps_node" UUID,
    "pressure_sensor" UUID,
    "request_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "work_order" UUID,
    "gtw_image_filesize" INTEGER,
    "gtw_image_extension" TEXT,
    "gtw_image_width" INTEGER,
    "gtw_image_height" INTEGER,
    "gtw_image_mode" TEXT,
    "gtw_image_id" TEXT,
    "node_gps_image_filesize" INTEGER,
    "node_gps_image_extension" TEXT,
    "node_gps_image_width" INTEGER,
    "node_gps_image_height" INTEGER,
    "node_gps_image_mode" TEXT,
    "node_gps_image_id" TEXT,
    "pressure_sensor_image_filesize" INTEGER,
    "pressure_sensor_image_extension" TEXT,
    "pressure_sensor_image_width" INTEGER,
    "pressure_sensor_image_height" INTEGER,
    "pressure_sensor_image_mode" TEXT,
    "pressure_sensor_image_id" TEXT,
    "log_filesize" INTEGER,
    "log_mode" TEXT,
    "log_filename" TEXT,
    "assigned_technician" UUID,

    CONSTRAINT "install_uninstall_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "irrigator" (
    "id" UUID NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',
    "name" TEXT NOT NULL DEFAULT E'',
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "mapped" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT NOT NULL DEFAULT E'',
    "gateway" UUID,
    "gps_node" UUID,
    "field" UUID,
    "pressure_sensor" UUID,
    "contract" UUID,

    CONSTRAINT "irrigator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lora_antenna_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "lora_antenna_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node_firmware_version" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "node_firmware_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node_hardware_version" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "node_hardware_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node_housing_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "node_housing_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcb_gateway" (
    "id" UUID NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',
    "fabrication_date" TIMESTAMP(3) NOT NULL,
    "picture_filesize" INTEGER,
    "picture_extension" TEXT,
    "picture_width" INTEGER,
    "picture_height" INTEGER,
    "picture_mode" TEXT,
    "picture_id" TEXT,
    "status" TEXT NOT NULL,
    "firmware_version" UUID,
    "hardware_version" UUID,

    CONSTRAINT "pcb_gateway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcb_node" (
    "id" UUID NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',
    "fabrication_date" TIMESTAMP(3) NOT NULL,
    "picture_filesize" INTEGER,
    "picture_extension" TEXT,
    "picture_width" INTEGER,
    "picture_height" INTEGER,
    "picture_mode" TEXT,
    "picture_id" TEXT,
    "status" TEXT NOT NULL,
    "firmware_version" UUID,
    "hardware_version" UUID,

    CONSTRAINT "pcb_node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pressure_sensor" (
    "id" UUID NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',
    "status" TEXT NOT NULL,
    "comments" TEXT NOT NULL DEFAULT E'',
    "order" INTEGER,
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_mode" TEXT,
    "image_id" TEXT,
    "pressure_sensor_type" UUID,
    "storage_location" UUID,

    CONSTRAINT "pressure_sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pressure_sensor_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "pressure_sensor_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "province" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repair" (
    "id" UUID NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "real_repair_date" TIMESTAMP(3) NOT NULL,
    "hdw_issue" UUID,
    "repair_type" UUID,
    "solution_type" UUID,
    "new_gateway" UUID,
    "new_gps_node" UUID,
    "new_pressure_sensor" UUID,
    "work_order" UUID,
    "comments" TEXT NOT NULL DEFAULT E'',
    "log_filesize" INTEGER,
    "log_mode" TEXT,
    "log_filename" TEXT,

    CONSTRAINT "repair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repair_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "value" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "repair_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "satellite_modem" (
    "id" UUID NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',
    "shipment_date" TIMESTAMP(3) NOT NULL,
    "is_transmitting" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT NOT NULL DEFAULT E'',
    "satellite_modem_type" UUID,

    CONSTRAINT "satellite_modem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "satellite_modem_type" (
    "id" UUID NOT NULL,
    "reference_number" TEXT NOT NULL DEFAULT E'',
    "version" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "satellite_modem_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "satellite_antenna" (
    "id" UUID NOT NULL,
    "integration_id" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "satellite_antenna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solar_panel_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "solar_panel_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solution_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "solution_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage_location" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "user" UUID,

    CONSTRAINT "storage_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_movement" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location_from" UUID,
    "location_to" UUID,
    "gateway" UUID,
    "gps_node" UUID,
    "pressure_sensor" UUID,
    "author" UUID,

    CONSTRAINT "stock_movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order" (
    "id" UUID NOT NULL,
    "work_date" TIMESTAMP(3) NOT NULL,
    "km_traveled" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL DEFAULT E'',
    "technician" UUID,

    CONSTRAINT "work_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zone" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "code" TEXT NOT NULL DEFAULT E'',
    "is_foreign" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract" (
    "id" UUID NOT NULL,
    "hubspot_id" TEXT NOT NULL DEFAULT E'',
    "creation_date" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "actual_install_date" TIMESTAMP(3),
    "actual_uninstall_date" TIMESTAMP(3),
    "name" TEXT NOT NULL DEFAULT E'',
    "irrigator_quantity" INTEGER,
    "service_level_agreement" UUID,
    "contract_type" TEXT NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_level_agreement" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "service_level_agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_zone" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "asset_type_name_key" ON "asset_type"("name");

-- CreateIndex
CREATE INDEX "autopsy_user_idx" ON "autopsy"("user");

-- CreateIndex
CREATE INDEX "autopsy_hdw_issue_idx" ON "autopsy"("hdw_issue");

-- CreateIndex
CREATE INDEX "autopsy_autopsy_type_idx" ON "autopsy"("autopsy_type");

-- CreateIndex
CREATE UNIQUE INDEX "autopsy_type_name_key" ON "autopsy_type"("name");

-- CreateIndex
CREATE INDEX "autopsy_type_asset_type_idx" ON "autopsy_type"("asset_type");

-- CreateIndex
CREATE INDEX "autopsy_type_component_idx" ON "autopsy_type"("component");

-- CreateIndex
CREATE INDEX "autopsy_type_root_idx" ON "autopsy_type"("root");

-- CreateIndex
CREATE UNIQUE INDEX "autopsy_root_name_key" ON "autopsy_root"("name");

-- CreateIndex
CREATE UNIQUE INDEX "battery_type_name_key" ON "battery_type"("name");

-- CreateIndex
CREATE INDEX "city_province_idx" ON "city"("province");

-- CreateIndex
CREATE UNIQUE INDEX "component_type_name_key" ON "component_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "diagnostic_type_name_key" ON "diagnostic_type"("name");

-- CreateIndex
CREATE INDEX "diagnostic_type_type_idx" ON "diagnostic_type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "diagnostic_hdw_issue_key" ON "diagnostic"("hdw_issue");

-- CreateIndex
CREATE INDEX "diagnostic_user_idx" ON "diagnostic"("user");

-- CreateIndex
CREATE INDEX "diagnostic_diagnostic_type_idx" ON "diagnostic"("diagnostic_type");

-- CreateIndex
CREATE INDEX "field_zone_idx" ON "field"("zone");

-- CreateIndex
CREATE INDEX "field_city_idx" ON "field"("city");

-- CreateIndex
CREATE INDEX "field_client_idx" ON "field"("client");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_integration_id_key" ON "gateway"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_satellite_modem_key" ON "gateway"("satellite_modem");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_satellite_antenna_key" ON "gateway"("satellite_antenna");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_pcb_gateway_key" ON "gateway"("pcb_gateway");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_hdw_issue_key" ON "gateway"("hdw_issue");

-- CreateIndex
CREATE INDEX "gateway_housing_type_idx" ON "gateway"("housing_type");

-- CreateIndex
CREATE INDEX "gateway_lora_antenna_type_idx" ON "gateway"("lora_antenna_type");

-- CreateIndex
CREATE INDEX "gateway_storage_location_idx" ON "gateway"("storage_location");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_firmware_version_version_key" ON "gateway_firmware_version"("version");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_hardware_version_version_key" ON "gateway_hardware_version"("version");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_housing_type_name_key" ON "gateway_housing_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gps_antenna_type_name_key" ON "gps_antenna_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gps_node_integration_id_key" ON "gps_node"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "gps_node_pcb_node_key" ON "gps_node"("pcb_node");

-- CreateIndex
CREATE UNIQUE INDEX "gps_node_hdw_issue_key" ON "gps_node"("hdw_issue");

-- CreateIndex
CREATE INDEX "gps_node_battery_type_idx" ON "gps_node"("battery_type");

-- CreateIndex
CREATE INDEX "gps_node_gps_antenna_type_idx" ON "gps_node"("gps_antenna_type");

-- CreateIndex
CREATE INDEX "gps_node_node_housing_type_idx" ON "gps_node"("node_housing_type");

-- CreateIndex
CREATE INDEX "gps_node_lora_antenna_type_idx" ON "gps_node"("lora_antenna_type");

-- CreateIndex
CREATE INDEX "gps_node_solar_panel_type_idx" ON "gps_node"("solar_panel_type");

-- CreateIndex
CREATE INDEX "gps_node_storage_location_idx" ON "gps_node"("storage_location");

-- CreateIndex
CREATE UNIQUE INDEX "hdw_issue_pressure_sensor_key" ON "hdw_issue"("pressure_sensor");

-- CreateIndex
CREATE INDEX "hdw_issue_assigned_technician_idx" ON "hdw_issue"("assigned_technician");

-- CreateIndex
CREATE INDEX "hdw_issue_irrigator_idx" ON "hdw_issue"("irrigator");

-- CreateIndex
CREATE INDEX "inspection_user_idx" ON "inspection"("user");

-- CreateIndex
CREATE INDEX "inspection_hdw_issue_idx" ON "inspection"("hdw_issue");

-- CreateIndex
CREATE INDEX "inspection_inspection_type_idx" ON "inspection"("inspection_type");

-- CreateIndex
CREATE UNIQUE INDEX "inspection_type_name_key" ON "inspection_type"("name");

-- CreateIndex
CREATE INDEX "inspection_type_type_idx" ON "inspection_type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "install_uninstall_request_gateway_key" ON "install_uninstall_request"("gateway");

-- CreateIndex
CREATE UNIQUE INDEX "install_uninstall_request_gps_node_key" ON "install_uninstall_request"("gps_node");

-- CreateIndex
CREATE UNIQUE INDEX "install_uninstall_request_pressure_sensor_key" ON "install_uninstall_request"("pressure_sensor");

-- CreateIndex
CREATE INDEX "install_uninstall_request_irrigator_idx" ON "install_uninstall_request"("irrigator");

-- CreateIndex
CREATE INDEX "install_uninstall_request_work_order_idx" ON "install_uninstall_request"("work_order");

-- CreateIndex
CREATE INDEX "install_uninstall_request_assigned_technician_idx" ON "install_uninstall_request"("assigned_technician");

-- CreateIndex
CREATE UNIQUE INDEX "irrigator_integration_id_key" ON "irrigator"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "irrigator_gateway_key" ON "irrigator"("gateway");

-- CreateIndex
CREATE UNIQUE INDEX "irrigator_gps_node_key" ON "irrigator"("gps_node");

-- CreateIndex
CREATE UNIQUE INDEX "irrigator_pressure_sensor_key" ON "irrigator"("pressure_sensor");

-- CreateIndex
CREATE INDEX "irrigator_field_idx" ON "irrigator"("field");

-- CreateIndex
CREATE INDEX "irrigator_contract_idx" ON "irrigator"("contract");

-- CreateIndex
CREATE UNIQUE INDEX "lora_antenna_type_name_key" ON "lora_antenna_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "node_firmware_version_version_key" ON "node_firmware_version"("version");

-- CreateIndex
CREATE UNIQUE INDEX "node_hardware_version_version_key" ON "node_hardware_version"("version");

-- CreateIndex
CREATE UNIQUE INDEX "node_housing_type_name_key" ON "node_housing_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pcb_gateway_integration_id_key" ON "pcb_gateway"("integration_id");

-- CreateIndex
CREATE INDEX "pcb_gateway_firmware_version_idx" ON "pcb_gateway"("firmware_version");

-- CreateIndex
CREATE INDEX "pcb_gateway_hardware_version_idx" ON "pcb_gateway"("hardware_version");

-- CreateIndex
CREATE UNIQUE INDEX "pcb_node_integration_id_key" ON "pcb_node"("integration_id");

-- CreateIndex
CREATE INDEX "pcb_node_firmware_version_idx" ON "pcb_node"("firmware_version");

-- CreateIndex
CREATE INDEX "pcb_node_hardware_version_idx" ON "pcb_node"("hardware_version");

-- CreateIndex
CREATE UNIQUE INDEX "pressure_sensor_integration_id_key" ON "pressure_sensor"("integration_id");

-- CreateIndex
CREATE INDEX "pressure_sensor_pressure_sensor_type_idx" ON "pressure_sensor"("pressure_sensor_type");

-- CreateIndex
CREATE INDEX "pressure_sensor_storage_location_idx" ON "pressure_sensor"("storage_location");

-- CreateIndex
CREATE UNIQUE INDEX "pressure_sensor_type_name_key" ON "pressure_sensor_type"("name");

-- CreateIndex
CREATE INDEX "repair_hdw_issue_idx" ON "repair"("hdw_issue");

-- CreateIndex
CREATE INDEX "repair_repair_type_idx" ON "repair"("repair_type");

-- CreateIndex
CREATE INDEX "repair_solution_type_idx" ON "repair"("solution_type");

-- CreateIndex
CREATE INDEX "repair_new_gateway_idx" ON "repair"("new_gateway");

-- CreateIndex
CREATE INDEX "repair_new_gps_node_idx" ON "repair"("new_gps_node");

-- CreateIndex
CREATE INDEX "repair_new_pressure_sensor_idx" ON "repair"("new_pressure_sensor");

-- CreateIndex
CREATE INDEX "repair_work_order_idx" ON "repair"("work_order");

-- CreateIndex
CREATE UNIQUE INDEX "repair_type_name_key" ON "repair_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "repair_type_value_key" ON "repair_type"("value");

-- CreateIndex
CREATE UNIQUE INDEX "satellite_modem_integration_id_key" ON "satellite_modem"("integration_id");

-- CreateIndex
CREATE INDEX "satellite_modem_satellite_modem_type_idx" ON "satellite_modem"("satellite_modem_type");

-- CreateIndex
CREATE UNIQUE INDEX "satellite_modem_type_reference_number_key" ON "satellite_modem_type"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "satellite_modem_type_version_key" ON "satellite_modem_type"("version");

-- CreateIndex
CREATE UNIQUE INDEX "satellite_antenna_integration_id_key" ON "satellite_antenna"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "solar_panel_type_name_key" ON "solar_panel_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "solution_type_name_key" ON "solution_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "storage_location_name_key" ON "storage_location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "storage_location_user_key" ON "storage_location"("user");

-- CreateIndex
CREATE INDEX "stock_movement_location_from_idx" ON "stock_movement"("location_from");

-- CreateIndex
CREATE INDEX "stock_movement_location_to_idx" ON "stock_movement"("location_to");

-- CreateIndex
CREATE INDEX "stock_movement_gateway_idx" ON "stock_movement"("gateway");

-- CreateIndex
CREATE INDEX "stock_movement_gps_node_idx" ON "stock_movement"("gps_node");

-- CreateIndex
CREATE INDEX "stock_movement_pressure_sensor_idx" ON "stock_movement"("pressure_sensor");

-- CreateIndex
CREATE INDEX "stock_movement_author_idx" ON "stock_movement"("author");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "work_order_technician_idx" ON "work_order"("technician");

-- CreateIndex
CREATE UNIQUE INDEX "contract_hubspot_id_key" ON "contract"("hubspot_id");

-- CreateIndex
CREATE INDEX "contract_service_level_agreement_idx" ON "contract"("service_level_agreement");

-- CreateIndex
CREATE UNIQUE INDEX "service_level_agreement_name_key" ON "service_level_agreement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_user_zone_AB_unique" ON "_user_zone"("A", "B");

-- CreateIndex
CREATE INDEX "_user_zone_B_index" ON "_user_zone"("B");

-- AddForeignKey
ALTER TABLE "autopsy" ADD CONSTRAINT "autopsy_autopsy_type_fkey" FOREIGN KEY ("autopsy_type") REFERENCES "autopsy_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autopsy" ADD CONSTRAINT "autopsy_hdw_issue_fkey" FOREIGN KEY ("hdw_issue") REFERENCES "hdw_issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autopsy" ADD CONSTRAINT "autopsy_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autopsy_type" ADD CONSTRAINT "autopsy_type_asset_type_fkey" FOREIGN KEY ("asset_type") REFERENCES "asset_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autopsy_type" ADD CONSTRAINT "autopsy_type_root_fkey" FOREIGN KEY ("root") REFERENCES "autopsy_root"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autopsy_type" ADD CONSTRAINT "autopsy_type_component_fkey" FOREIGN KEY ("component") REFERENCES "component_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_province_fkey" FOREIGN KEY ("province") REFERENCES "province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_type" ADD CONSTRAINT "diagnostic_type_type_fkey" FOREIGN KEY ("type") REFERENCES "asset_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic" ADD CONSTRAINT "diagnostic_diagnostic_type_fkey" FOREIGN KEY ("diagnostic_type") REFERENCES "diagnostic_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic" ADD CONSTRAINT "diagnostic_hdw_issue_fkey" FOREIGN KEY ("hdw_issue") REFERENCES "hdw_issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic" ADD CONSTRAINT "diagnostic_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_city_fkey" FOREIGN KEY ("city") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_client_fkey" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_zone_fkey" FOREIGN KEY ("zone") REFERENCES "zone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_housing_type_fkey" FOREIGN KEY ("housing_type") REFERENCES "gateway_housing_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_hdw_issue_fkey" FOREIGN KEY ("hdw_issue") REFERENCES "hdw_issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_lora_antenna_type_fkey" FOREIGN KEY ("lora_antenna_type") REFERENCES "lora_antenna_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_pcb_gateway_fkey" FOREIGN KEY ("pcb_gateway") REFERENCES "pcb_gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_satellite_modem_fkey" FOREIGN KEY ("satellite_modem") REFERENCES "satellite_modem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_satellite_antenna_fkey" FOREIGN KEY ("satellite_antenna") REFERENCES "satellite_antenna"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_storage_location_fkey" FOREIGN KEY ("storage_location") REFERENCES "storage_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_battery_type_fkey" FOREIGN KEY ("battery_type") REFERENCES "battery_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_gps_antenna_type_fkey" FOREIGN KEY ("gps_antenna_type") REFERENCES "gps_antenna_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_hdw_issue_fkey" FOREIGN KEY ("hdw_issue") REFERENCES "hdw_issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_lora_antenna_type_fkey" FOREIGN KEY ("lora_antenna_type") REFERENCES "lora_antenna_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_node_housing_type_fkey" FOREIGN KEY ("node_housing_type") REFERENCES "node_housing_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_pcb_node_fkey" FOREIGN KEY ("pcb_node") REFERENCES "pcb_node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_solar_panel_type_fkey" FOREIGN KEY ("solar_panel_type") REFERENCES "solar_panel_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gps_node" ADD CONSTRAINT "gps_node_storage_location_fkey" FOREIGN KEY ("storage_location") REFERENCES "storage_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hdw_issue" ADD CONSTRAINT "hdw_issue_irrigator_fkey" FOREIGN KEY ("irrigator") REFERENCES "irrigator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hdw_issue" ADD CONSTRAINT "hdw_issue_pressure_sensor_fkey" FOREIGN KEY ("pressure_sensor") REFERENCES "pressure_sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hdw_issue" ADD CONSTRAINT "hdw_issue_assigned_technician_fkey" FOREIGN KEY ("assigned_technician") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection" ADD CONSTRAINT "inspection_hdw_issue_fkey" FOREIGN KEY ("hdw_issue") REFERENCES "hdw_issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection" ADD CONSTRAINT "inspection_inspection_type_fkey" FOREIGN KEY ("inspection_type") REFERENCES "inspection_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection" ADD CONSTRAINT "inspection_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_type" ADD CONSTRAINT "inspection_type_type_fkey" FOREIGN KEY ("type") REFERENCES "asset_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "install_uninstall_request" ADD CONSTRAINT "install_uninstall_request_gateway_fkey" FOREIGN KEY ("gateway") REFERENCES "gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "install_uninstall_request" ADD CONSTRAINT "install_uninstall_request_gps_node_fkey" FOREIGN KEY ("gps_node") REFERENCES "gps_node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "install_uninstall_request" ADD CONSTRAINT "install_uninstall_request_irrigator_fkey" FOREIGN KEY ("irrigator") REFERENCES "irrigator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "install_uninstall_request" ADD CONSTRAINT "install_uninstall_request_pressure_sensor_fkey" FOREIGN KEY ("pressure_sensor") REFERENCES "pressure_sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "install_uninstall_request" ADD CONSTRAINT "install_uninstall_request_assigned_technician_fkey" FOREIGN KEY ("assigned_technician") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "install_uninstall_request" ADD CONSTRAINT "install_uninstall_request_work_order_fkey" FOREIGN KEY ("work_order") REFERENCES "work_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigator" ADD CONSTRAINT "irrigator_field_fkey" FOREIGN KEY ("field") REFERENCES "field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigator" ADD CONSTRAINT "irrigator_gateway_fkey" FOREIGN KEY ("gateway") REFERENCES "gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigator" ADD CONSTRAINT "irrigator_gps_node_fkey" FOREIGN KEY ("gps_node") REFERENCES "gps_node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigator" ADD CONSTRAINT "irrigator_pressure_sensor_fkey" FOREIGN KEY ("pressure_sensor") REFERENCES "pressure_sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigator" ADD CONSTRAINT "irrigator_contract_fkey" FOREIGN KEY ("contract") REFERENCES "contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcb_gateway" ADD CONSTRAINT "pcb_gateway_firmware_version_fkey" FOREIGN KEY ("firmware_version") REFERENCES "gateway_firmware_version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcb_gateway" ADD CONSTRAINT "pcb_gateway_hardware_version_fkey" FOREIGN KEY ("hardware_version") REFERENCES "gateway_hardware_version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcb_node" ADD CONSTRAINT "pcb_node_firmware_version_fkey" FOREIGN KEY ("firmware_version") REFERENCES "node_firmware_version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcb_node" ADD CONSTRAINT "pcb_node_hardware_version_fkey" FOREIGN KEY ("hardware_version") REFERENCES "node_hardware_version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pressure_sensor" ADD CONSTRAINT "pressure_sensor_pressure_sensor_type_fkey" FOREIGN KEY ("pressure_sensor_type") REFERENCES "pressure_sensor_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pressure_sensor" ADD CONSTRAINT "pressure_sensor_storage_location_fkey" FOREIGN KEY ("storage_location") REFERENCES "storage_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_new_gateway_fkey" FOREIGN KEY ("new_gateway") REFERENCES "gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_new_gps_node_fkey" FOREIGN KEY ("new_gps_node") REFERENCES "gps_node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_hdw_issue_fkey" FOREIGN KEY ("hdw_issue") REFERENCES "hdw_issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_new_pressure_sensor_fkey" FOREIGN KEY ("new_pressure_sensor") REFERENCES "pressure_sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_repair_type_fkey" FOREIGN KEY ("repair_type") REFERENCES "repair_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_solution_type_fkey" FOREIGN KEY ("solution_type") REFERENCES "solution_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_work_order_fkey" FOREIGN KEY ("work_order") REFERENCES "work_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "satellite_modem" ADD CONSTRAINT "satellite_modem_satellite_modem_type_fkey" FOREIGN KEY ("satellite_modem_type") REFERENCES "satellite_modem_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_location" ADD CONSTRAINT "storage_location_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movement" ADD CONSTRAINT "stock_movement_gateway_fkey" FOREIGN KEY ("gateway") REFERENCES "gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movement" ADD CONSTRAINT "stock_movement_gps_node_fkey" FOREIGN KEY ("gps_node") REFERENCES "gps_node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movement" ADD CONSTRAINT "stock_movement_pressure_sensor_fkey" FOREIGN KEY ("pressure_sensor") REFERENCES "pressure_sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movement" ADD CONSTRAINT "stock_movement_location_from_fkey" FOREIGN KEY ("location_from") REFERENCES "storage_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movement" ADD CONSTRAINT "stock_movement_location_to_fkey" FOREIGN KEY ("location_to") REFERENCES "storage_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movement" ADD CONSTRAINT "stock_movement_author_fkey" FOREIGN KEY ("author") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_technician_fkey" FOREIGN KEY ("technician") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_service_level_agreement_fkey" FOREIGN KEY ("service_level_agreement") REFERENCES "service_level_agreement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_zone" ADD FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_zone" ADD FOREIGN KEY ("B") REFERENCES "zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
