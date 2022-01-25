export const relationshipRequiredCheckerHook = (relationshipName :string) => ({ addValidationError, resolvedData, item, operation }: any) => {
    const newValueToSet = resolvedData[relationshipName];
    console.log(`NVTS: ${newValueToSet}`);
    console.log(newValueToSet);
    console.log(`operation: ${operation}`);
    if(operation ==='create'){
      if(newValueToSet) return;
    }
    else if(operation ==='update'){
      if(!newValueToSet) return;
      else if(newValueToSet && !newValueToSet.disconnect) return;
    }

    addValidationError(`El campo ${relationshipName} es obligatorio`);
  }