export const autogenerateStockMovementHook =
  (assetName: "gateway" | "gps_node" | "pressure_sensor") =>
  async ({ resolvedData, originalItem, item, context, operation }: any) => {
    if (operation !== "update") return;

    if (originalItem?.storage_locationId !== item?.storage_locationId) {
      const newStockMovement: any = {
        date: new Date().toISOString(),
        location_from: originalItem?.storage_locationId
          ? { connect: { id: originalItem?.storage_locationId } }
          : undefined,
        location_to: item?.storage_locationId
          ? { connect: { id: item?.storage_locationId } }
          : undefined,
      };
      newStockMovement[assetName] = { connect: { id: item?.id } };

      const result = await context.query.stock_movement.createOne({
        data: newStockMovement,
        query: `id date location_from {id} location_to {id} ${assetName} {id}`,
      });
      console.log(
        "==========================================================creado"
      );
      console.log(result);
    }
  };
