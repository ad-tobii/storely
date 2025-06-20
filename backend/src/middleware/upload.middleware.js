// backend/middleware/upload.middleware.js

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../lib/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'storely',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
    ],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Increased to 5MB for safety
  },
  fileFilter: (req, file, cb) => {
    // ✅ ADDED LOG: Confirm this filter is being run for each file.
    console.log(`MULTER-FILTER: Checking file: ${file.originalname}, MIME type: ${file.mimetype}`);
    
    if (file.mimetype.startsWith('image/')) {
      console.log(`MULTER-FILTER: PASSED - File is an image. Allowing upload.`);
      cb(null, true);
    } else {
      console.log(`MULTER-FILTER: FAILED - File is not an image.`);
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

export default upload;