import multer from 'multer';

const storage = multer.memoryStorage(); // for Cloudinary (uses buffer)

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (optional)
});

export default upload;
