import multer from 'multer';

const storage = multer.memoryStorage(); // for Cloudinary (uses buffer)

const upload = multer({
  storage:storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

export default upload;
