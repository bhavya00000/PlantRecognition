import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const plantinfo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [recognizedPlant,setRecognizedPlant] = useState('Tulsi');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {

    axios.get('/get-recognized-plant')
      .then((response) => {
        const recognizedPlant = response.data.plantName;
        setRecognizedPlant(recognizedPlant);
      })
      .catch((error) => {
        console.error('Error fetching recognized plant:', error);
      });
  }, []);

  // const handleUpload = async () => {
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);

  //     try {
  //       const response = await axios.post('/upload', formData);
  //       console.log('Response:', response.data.message);
  //       console.log('Uploaded File:', selectedFile.name);
  //       setMessage(response.data.message);
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //     }
  //   }
  // };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await axios.post('/upload', formData);
        const recognizedPlant = response.data.plantName;
        console.log('Recognized Plant:', recognizedPlant);
  
        setRecognizedPlant(recognizedPlant);
  
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };  

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <h4>Selected File:</h4>
          <p>{selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      {message && (
        <div>
          <h4>Server Response:</h4>
          <p>{message}</p>
        </div>
      )}

      <h2>Scanned Plant is:</h2>
      {recognizedPlant && <>
        {recognizedPlant}
      </>}

      <Link href={`/Plants/${encodeURIComponent(recognizedPlant)}`}>
            More Info
        </Link> 
    </div>
  );
};

export default plantinfo;