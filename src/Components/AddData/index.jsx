import { useEffect, useState } from 'react';
import axios from 'axios';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import SubmitButton from '../SubmitButton';
import { CircleX } from 'lucide-react';

const AddData = () => {
  useEffect(() => {
    document.title = "Add Data";
  }, []);

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

  const handleSubmit = async (e) => {
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
      const { data } = await axios.post("http://localhost:5000/AddData", formData);
      console.log(data);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images");
    }
  }

  return (
    <>
      <h1>Add Images</h1>
      <p className="mb-7 italic">Add images to the database to be used for similarity detection.</p>
      <div className="grid grid-cols-8 gap-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-center gap-6 col-span-2"
        >
          <div className="flex flex-col justify-center gap-2">
            <Label>Upload Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              name="images"
            />
          </div>
          <SubmitButton />
        </form>

        <div className="flex gap-3 flex-wrap col-span-6">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <div className="inner-image">
                <img src={url} alt={`Preview ${index}`} />                
              </div>
              <button
                className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
                onClick={() => removeImage(index)}
              >
                <CircleX color='white' fill='black'/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default AddData;