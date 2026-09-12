import { imageDimensions } from './imageDimensions';

const AWS_CLOUDFRONT_URL = import.meta.env.VITE_AWS_CLOUDFRONT_URL;
const AWS_S3_BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const AWS_REGION = import.meta.env.VITE_AWS_REGION || 'us-east-1';

if (!AWS_CLOUDFRONT_URL && !AWS_S3_BUCKET) {
  console.error('AWS configuration missing in environment variables');
}

export const getS3Url = (localPath: string): string => {
  const cleanPath = localPath.replace(/^\//, '');
  
  // Use CloudFront if available (faster), otherwise direct S3
  if (AWS_CLOUDFRONT_URL) {
    return `${AWS_CLOUDFRONT_URL}/${cleanPath}`;
  }
  
  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${cleanPath}`;
};

export const getS3VideoUrl = (localPath: string): string => {
  const cleanPath = localPath.replace(/^\//, '');
  
  if (AWS_CLOUDFRONT_URL) {
    return `${AWS_CLOUDFRONT_URL}/${cleanPath}`;
  }
  
  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${cleanPath}`;
};

// Get image dimensions for layout preservation
export const getImageDimensions = (localPath: string) => {
  return imageDimensions[localPath] || { width: 'auto', height: 'auto', aspectRatio: '75%' };
};

// Enhanced image props for React components
export const getS3ImageProps = (localPath: string, className: string = '') => {
  const dimensions = getImageDimensions(localPath);
  return {
    src: getS3Url(localPath),
    className: `s3-image ${className}`,
    style: {
      '--aspect-ratio': dimensions.aspectRatio,
      maxWidth: `${dimensions.width}px`,
      maxHeight: `${dimensions.height}px`
    },
    loading: 'lazy' as const,
    decoding: 'async' as const
  };
};

// Backward compatibility - keep same function names
export const getCloudinaryUrl = getS3Url;
export const getCloudinaryVideoUrl = getS3VideoUrl;