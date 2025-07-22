const uploadImage=(req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const imagePath = `uploads/${req.file.filename}`; // Save only image path
  
    res.json({ imagePath }); // Send path to frontend
  }
  module.exports={
    uploadImage
  }