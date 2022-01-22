import { list } from "@keystone-6/core";

import { select, timestamp, relationship, image, file } from "@keystone-6/core/fields";
import { relationshipRequiredCheckerHook } from "../../hooks/relationshipRequiredCheckerHook";
import { isAdmin, isLoggedIn } from "../../utils/accessControl";

export const installUninstallRequest = list({
  // TODO: falta definir sus relaciones
  ui: {
    listView: {
      initialColumns: ["creation_date", "completion_date", "close_date", "status", "irrigator"],
    },
  },
  hooks: {
    // validateInput: relationshipRequiredCheckerHook("irrigator"), //TODO: valido para la creacion, nunca para el update
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
    afterOperation: async ({ resolvedData, item, context, operation }) => {
      if (operation === "update" && item?.status === "completed") {
        const irrigatorId = item?.irrigatorId;
        
        await context.query.irrigator.updateOne({
          // @ts-expect-error
          where: { id: irrigatorId },
          data: {
            status: item?.request_type ==="install"? "installed": item?.request_type ==="uninstall"?"no-telemetry":"error",
          },
          query: "id status",
        });
      }
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
        cardFields: ["fabrication_date"],
        inlineEdit: { fields: ["fabrication_date"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["fabrication_date"] },
      },
      many: false,
    }),
    gps_node: relationship({
      ref: "gps_node.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["fabrication_date"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    pressure_sensor: relationship({
      ref: "pressure_sensor.install_uninstall_request",
      ui: {
        displayMode: "cards",
        cardFields: ["integration_id", "status", "order"],
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
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
        linkToItem: true,
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
        const isAdmin = session?.data?.type === 'admin';
        return isAdmin? {} :  { assigned_technician: { id: {equals: session?.data?.id} } };
      },
    },
    item: {
      update: async ({ session, context, listKey, operation, inputData, item }) => {
        const isAdmin = session?.data?.type === 'admin';
        if(isAdmin) return true;

        const workOrderTechnicianResult =
          await context.query.work_order.findOne({
            //@ts-ignore
            where: { id: inputData.work_order.connect.id },
            query: "technician {id}",
          });
        const technicianId = workOrderTechnicianResult.technician.id;

        const technicianBelongsToWorkOrder = session?.data?.id === technicianId;
        const technicianAssignedToRequest = session?.data?.id === item.assigned_technicianId;
        return technicianAssignedToRequest && technicianBelongsToWorkOrder;
      },
    },
  },
});
