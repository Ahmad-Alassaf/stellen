const express = require("express");
const upload = require("../Middleware/uploadMiddleware"); // Import middleware
const {uploadImage}=require('../Controllers/imageController')

const router = express.Router();

// Upload Image Route
router.post("/", upload.single("file"), uploadImage)

module.exports = router;
