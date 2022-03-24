import { list } from "@keystone-6/core";

import {
  select,
  timestamp,
  relationship,
  image,
  file,
} from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { isAdmin, isLoggedIn } from "../../utils/accessControl";

export const installUninstallRequest = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: [
        "creation_date",
        "completion_date",
        "close_date",
        "status",
        "irrigator",
      ],
    },
    labelField: "creation_date",
  },
  hooks: {
    validateInput: async ({ addValidationError, resolvedData, item, operation, context }: any) => {
      if( operation !== 'create' ) return;
      const requestType = resolvedData.request_type;
      const activeRequestsOfTheSameType = await context.query.install_uninstall_request.findMany({
        where: {
            status: { not: {equals: 'completed'} },
            request_type: {equals: requestType},
            irrigator: {
              id: {equals: resolvedData.irrigatorId}
          },
        },
        query: "id status",
      });
      if (activeRequestsOfTheSameType.length > 0) {
        addValidationError(`Ya existe una solicitud de este tipo activa para este equipo.`);
      } 

    },
    resolveInput: async ({ resolvedData, item, context, operation }) => {
      //resolvedData es siempre los datos enviados. En caso de operaciones update, item representa el estado previo del item a actualizar
      //generacion de status
      if (
        item &&
        !item?.assigned_technicianId &&
        resolvedData?.assigned_technician?.connect?.id
      ) {
        //caso abierta => asignada
        resolvedData.status = "assigned";
      } else if (resolvedData?.assigned_technician?.disconnect) {
        //caso asignada => in-field
        resolvedData.status = "open";
      } else if (!item?.completion_date && resolvedData?.completion_date) {
        resolvedData.status = "done";
      } else if (!item?.close_date && resolvedData?.close_date) {
        resolvedData.status = "completed";
      }
      return resolvedData;
    },
    afterOperation: async ({
      resolvedData,
      item,
      originalItem,
      context,
      operation,
    }) => {
      //stock & locations update hook
      if (!(operation === "update" && item?.status === "completed")) return;
      const {
        irrigatorId,
        gatewayId,
        gps_nodeId,
        pressure_sensorId,
        assigned_technicianId,
      } = item;

      if (item?.request_type === "install") {
        //irrigator update
        await context.query.irrigator.updateOne({
          // @ts-expect-error
          where: { id: irrigatorId },
          data: {
            status: "installed",
            gateway: { connect: { id: item?.gatewayId } },
            pressure_sensor: { connect: { id: item?.pressure_sensorId } },
            gps_node: { connect: { id: item?.gps_nodeId } },
          },
          query: "id status gateway {id} pressure_sensor {id} gps_node {id}",
        });

        //storage location update
        await context.query.gateway.updateOne({
          //@ts-expect-error
          where: { id: gatewayId },
          data: {
            storage_location: { disconnect: true }, //TODO: null storage location means it's installed on an irrigator
          },
          query: "id storage_location {id}",
        });
        await context.query.gps_node.updateOne({
          //@ts-expect-error
          where: { id: gps_nodeId },
          data: {
            storage_location: { disconnect: true },
          },
          query: "id storage_location {id}",
        });
        await context.query.pressure_sensor.updateOne({
          //@ts-expect-error
          where: { id: pressure_sensorId },
          data: {
            storage_location: { disconnect: true },
          },
          query: "id storage_location {id}",
        });

        //stock movements are created automatically in a hook on each asset
      } else if (item?.request_type === "uninstall") {
        const uninstallerTechnician = await context.query.user.findOne({
          //@ts-expect-error
          where: { id: assigned_technicianId },
          query: "id storage_location {id}",
        });
        const uninstallerTechnicianStorageLocationId =
          uninstallerTechnician.storage_location.id;

        //fetch the irrigator's current assets to move them to the tech's stock
        const irrigatorResult = await context.query.irrigator.findOne({
          // @ts-expect-error
          where: { id: irrigatorId },
          query: "id gateway {id} pressure_sensor {id} gps_node {id}",
        });

        //irrigator update: update status to no telemetry and disconnect all assets
        await context.query.irrigator.updateOne({
          // @ts-expect-error
          where: { id: irrigatorId },
          data: {
            status: "no-telemetry",
            gateway: { disconnect: true },
            pressure_sensor: { disconnect: true },
            gps_node: { disconnect: true },
          },
          query: "id status gateway {id} pressure_sensor {id} gps_node {id}",
        });

        //storage location update: move assets to the tech's stock
        await context.query.gateway.updateOne({
          where: { id: irrigatorResult?.gateway?.id },
          data: {
            storage_location: {
              connect: { id: uninstallerTechnicianStorageLocationId },
            },
          },
          query: "id storage_location {id}",
        });
        await context.query.gps_node.updateOne({
          where: { id: irrigatorResult?.gps_node?.id },
          data: {
            storage_location: {
              connect: { id: uninstallerTechnicianStorageLocationId },
            },
          },
          query: "id storage_location {id}",
        });
        await context.query.pressure_sensor.updateOne({
          where: { id: irrigatorResult?.pressure_sensor?.id },
          data: {
            storage_location: {
              connect: { id: uninstallerTechnicianStorageLocationId },
            },
          },
          query: "id storage_location {id}",
        });

        //stock movements are created automatically in a hook on each asset
      } else throw new Error("undefined request type");
    },
  },
  fields: {
    creation_date: timestamp({
      validation: {
        isRequired: true,
      },
    }), //fecha de creacion de la solicitud
    completion_date: timestamp({
      validation: {
        isRequired: false,
      },
    }), //fecha en la que realmente se hizo lo que habia que hacer (instalar o desinstalar)
    close_date: timestamp({
      validation: {
        isRequired: false,
      },
    }), //fecha en la que fue confirmado que todo se realizó correctamente
    irrigator: relationship({
      ref: "irrigator.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "lat", "long", "status"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    gateway: relationship({
      ref: "gateway.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id"],
      },
      many: false,
      db: {
        foreignKey: true,
      },
    }),
    gps_node: relationship({
      ref: "gps_node.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date"],
      },
      many: false,
      db: {
        foreignKey: true,
      },
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id", "status", "order"],
      },
      many: false,
      db: {
        foreignKey: true,
      },
    }),
    request_type: select({
      validation: { isRequired: true },
      options: [
        { label: "Instalación", value: "install" },
        { label: "Desinstalación", value: "uninstall" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    status: select({
      validation: {
        isRequired: true,
      },
      options: [
        { label: "Abierta", value: "open" },
        { label: "Asignada", value: "assigned" },
        { label: "Realizada", value: "done" },
        { label: "Completada", value: "completed" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    work_order: relationship({
      ref: "work_order.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["work_date", "km_traveled", "comment"],
        inlineConnect: true,
      },
      many: false,
    }),
    gtw_image: image(),
    node_gps_image: image(),
    pressure_sensor_image: image(),
    log: file(),
    assigned_technician: relationship({
      ref: "user.install_uninstall_request",
      ui: {
        displayMode: "select",
      },
      many: false,
    }),
  },
  access: {
    operation: {
      query: isLoggedIn,
      create: isAdmin,
      update: isLoggedIn,
      delete: isAdmin,
    },
    filter: {
      query: ({ session, context, listKey, operation }) => {
        const isAdmin = session?.data?.type === "admin";
        return isAdmin
          ? {}
          : { assigned_technician: { id: { equals: session?.data?.id } } };
      },
    },
    item: {
      update: async ({
        session,
        context,
        listKey,
        operation,
        inputData,
        item,
      }) => {
        //this hook checks whether the work order being associated belongs to the correct technician (the one assigned to the request)
        const isAdmin = session?.data?.type === "admin";
        if (isAdmin) return true;

        const workOrderTechnicianResult =
          await context.query.work_order.findOne({
            //@ts-ignore
            where: { id: inputData.work_order.connect.id },
            query: "technician {id}",
          });
        const technicianId = workOrderTechnicianResult.technician.id;

        const technicianBelongsToWorkOrder = session?.data?.id === technicianId;
        const technicianAssignedToRequest =
          session?.data?.id === item.assigned_technicianId;
        return technicianAssignedToRequest && technicianBelongsToWorkOrder;
      },
    },
  },
});
