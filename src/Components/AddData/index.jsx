import { useState } from 'react';
import axios from 'axios';
const AddData = () => {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      setImages((prevImages) => [...prevImages, ...filesArray]);

      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const {data} = await axios.post("http://127.0.0.1:5000/AddData", formData);
      console.log(data);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images");
    }
  }

  return (
    <div className="add-data-container">
      <h2>Add Images</h2>

      <div className="image-upload-container">
        <form onSubmit={handleSubmit}>
          <label className="image-upload-label">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload-input"
              name="images"
            />
            <span>Select Images</span>
          </label>
          <button type="submit">
            Upload
          </button>
        </form>

        <div className="image-preview-container">
          {previewUrls.map((url, index) => (
            <div key={index} className="w-[100px] h-auto">
              <img src={url} alt={`Preview ${index}`} className="image-preview" />
              <button
                className="remove-image-btn"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AddData;