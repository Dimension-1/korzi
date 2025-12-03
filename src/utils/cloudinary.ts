const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

if (!CLOUDINARY_CLOUD_NAME) {
  console.error('VITE_CLOUDINARY_CLOUD_NAME is not defined in environment variables');
}

export const getCloudinaryUrl = (localPath: string): string => {
  // Use local for ellipse_80.png and ellipse_81.png
  if (localPath.includes('Ellipse80.png') || 
      localPath.includes('Ellipse 81.png') ||
      localPath.includes('Ellipse80.png') ||
      localPath.includes('Ellipse 81.png')) {
    return localPath;
  }
  const cleanPath = localPath.replace(/^\//, '');
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${cleanPath}`;
};

export const getCloudinaryVideoUrl = (localPath: string): string => {
  const cleanPath = localPath.replace(/^\//, '');
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${cleanPath}`;
};
