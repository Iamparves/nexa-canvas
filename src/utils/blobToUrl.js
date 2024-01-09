export const blobToUrl = (blob) => {
  if (!blob) return null;
  return URL.createObjectURL(blob);
};
