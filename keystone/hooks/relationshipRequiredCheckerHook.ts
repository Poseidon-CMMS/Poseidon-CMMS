export const relationshipRequiredCheckerHook = (relationshipName :string) => ({ addValidationError, resolvedData }: any) => {
    const value = resolvedData[relationshipName];
    if (!value) {
      addValidationError(`El campo ${relationshipName} es obligatorio`);
    }
  }