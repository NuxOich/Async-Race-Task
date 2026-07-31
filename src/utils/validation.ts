export const carValidation = (carName: string, maxLength: number) => {
  return carName.trim().length > 0 && carName.trim().length <= maxLength;
}