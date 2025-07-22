import React, { useEffect, useState } from "react"
import axios from "axios";

const ImageUpload = ({getFile,initialImagePath}) => {
  const [preview, setPreview] = useState(null);
 
  const [image, setImage] = useState(null);
 

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      getFile(file)
      console.log('test from imageUpload Component....')
      console.log(file)
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  }
  useEffect(()=>{
    if(initialImagePath)
      setPreview(initialImagePath)
  },[initialImagePath])
  return (
    <div className="">
      {preview && <img src={preview} alt="Preview"  className="img-fluid d-block border" /> }
      
       <input type="file" name="file" accept="image/*" onChange={handleFileChange} />
    
    </div>
  );
};

export default ImageUpload;
