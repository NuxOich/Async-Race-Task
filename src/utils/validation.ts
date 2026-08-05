export const carValidation = (carName: string, maxLength: number) =>
  carName.trim().length > 0 && carName.trim().length <= maxLength;
