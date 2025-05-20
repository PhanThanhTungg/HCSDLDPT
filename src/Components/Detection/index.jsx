import { useEffect, useState } from "react"
import axios from "axios";
const Detection = ()=>{
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit =async  (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const {data} = await axios.post("http://127.0.0.1:5000/find_similar", formData);
      console.log(data);
    } catch (error) { 
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
        />
        <button> Filter </button>
      </form>
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '300px' }} />}
    </> 
  )
}

export default Detection;