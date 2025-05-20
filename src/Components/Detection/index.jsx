import { useEffect, useState } from "react"
import axios from "axios";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const data = [
  "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
]

const Detection = () => {
  useEffect(() => {
    document.title = "Detection";
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const { data } = await axios.post("http://127.0.0.1:5000/find_similar", formData);
      console.log(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  }

  return (
    <>
      <h1>Similarity Detection</h1>
      <p className="mb-7 italic">Upload a face image, and the system will return the 4 images most similar to the one you uploaded, in descending order of similarity.</p>
      <div className="grid grid-cols-6 gap-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-center gap-6 w-[300px] col-span-2"
        >
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            {preview && (
              <div className="inner-image self-center">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>
          <SubmitButton />
        </form>
        <div className="flex flex-col gap-14 col-span-4">
          <Label>Results</Label>
          <div className="flex gap-3">
            {data.map((item, index) => (
              <div className="inner-image" key={index}>
                <img src={item} alt="Preview" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Detection;