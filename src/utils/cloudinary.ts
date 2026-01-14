// Migration: Now using S3 + CloudFront instead of Cloudinary
import { getS3Url, getS3VideoUrl } from './s3';

// Keep original function names for backward compatibility
export const getCloudinaryUrl = getS3Url;
export const getCloudinaryVideoUrl = getS3VideoUrl;
