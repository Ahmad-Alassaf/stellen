const multer = require("multer");
const path = require("path")
const sharp =require('sharp')

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    console.log('test from middleware...')
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename

  },
});

// File Filter - Allow Only Images
const fileFilter =async (req, file, cb) => {
  
  const allowedTypes = /jpeg|jpg|png|gif/ // Define allowed image file types using a regular expression
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
     cb(null, true) // If both checks pass, accept the file (null means no error, true means accept)
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Set Up Multer Middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
