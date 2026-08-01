export const cloudinaryConfig = {
  cloudName: "wtlx95j4",
  uploadPreset: "ml_default",
};

export const getCloudinaryUrl = (publicId: string, options?: { width?: number; height?: number; crop?: string; quality?: number }) => {
  const { width, height, crop = 'fill', quality = 80 } = options || {};
  let transformations = `q_${quality},f_auto`;
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (crop) transformations += `,c_${crop}`;
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`;
};
