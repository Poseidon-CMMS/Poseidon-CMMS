export const relationshipRequiredCheckerHook = (relationshipName :string) => ({ addValidationError, resolvedData, item, operation }: any) => {
    const newValueToSet = resolvedData[relationshipName];
    if(operation ==='create'){
      if(newValueToSet) return;
    }
    else if(operation ==='update'){
      if(!newValueToSet) return;
      else if(newValueToSet && !newValueToSet.disconnect) return;
    }

    addValidationError(`El campo ${relationshipName} es obligatorio`);
  }