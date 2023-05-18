import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [matchedCar, setMatchedCar] = useState(null);

  const onUrlChange = (event) => {
    setImageUrl(event.target.value);
  };


 const onImageSubmit = async () => {
  if (!imageUrl) {
    console.error('No URL provided'); // Removed 'z' character
    return;
  }

  const apiUrl = 'http://localhost:4000/api/compare-image';
  try {
    const response = await axios.post(apiUrl, { imageUrl: imageUrl }, {
      headers: {
        'Prediction-Key': '28311f077cd048a98832fc7d6ff9eed3',
        'Content-Type': 'application/json',
        
      },
    });
    
    console.log('Server response:', response.data);
    // Assuming response.data contains the matched car
    setMatchedCar(response.data.car); // Updated this
    
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
  }
};

  
  return (
    <div>
      <input type="text" onChange={onUrlChange} placeholder="Enter image URL" />
      <button onClick={onImageSubmit}>Submit</button>

      {matchedCar ? (
        <div>
          <h3>Matched Car:</h3>
          {/* Display the matched car's information */}
          <img src={matchedCar.images[0]} alt="Matched car" />
          <p>Make: {matchedCar.make}</p>
          <p>Model: {matchedCar.model}</p>
          <p>Year: {matchedCar.year}</p>
          {/* Add more fields if needed */}
        </div>
      ) : (
        <p>No matched car found.</p>
      )}
    </div>
  );
};

export default ImageUpload;
