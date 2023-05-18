const axios = require('axios');
const Car = require('../models/carsModels');

const predictionEndpoint = "https://new-car-image-resource.cognitiveservices.azure.com/customvision/v3.0/Prediction/97fad980-3444-4557-9cae-3cf29f56d122/classify/iterations/Iteration1/url";
const predictionKey = "28311f077cd048a98832fc7d6ff9eed3";

const processImage = async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;

    const response = await axios.post(predictionEndpoint, {Url: imageUrl}, {
      headers: {
        'Content-Type': 'application/json',
        'Prediction-Key': predictionKey,
      },
    });

    if (response.data.predictions) {
      const uploadedImageTags = response.data.predictions.map(prediction => prediction.tagName);

      const cars = await Car.find().exec();

      let highestSimilarityScore = 0;
      let bestMatchedCar = null;

      for (const car of cars) {
        let dbImageResponse;
        try {
          dbImageResponse = await axios.post(predictionEndpoint, {Url: car.images[0]}, {
            headers: {
              'Content-Type': 'application/json',
              'Prediction-Key': predictionKey,
            },
          });
        } catch (error) {
          console.error('Error processing car image:', car.images[0]);
          continue;
        }

        const dbImageTags = dbImageResponse.data.predictions.map(prediction => prediction.tagName);

        const similarityScore = calculateSimilarity(uploadedImageTags, dbImageTags);

        if (similarityScore > highestSimilarityScore) {
          highestSimilarityScore = similarityScore;
          bestMatchedCar = car;
        }
      }

      const similarityThreshold = 0.4;

      if (highestSimilarityScore >= similarityThreshold) {
        res.status(200).json({ matched: true, car: bestMatchedCar });
      } else {
        res.status(200).json({ matched: false });
      }
    } else {
      throw new Error('Unexpected response from prediction API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the image', details: error.message });
  }
};

const calculateSimilarity = (tags1, tags2) => {
  if (tags1.length === 0 && tags2.length === 0) {
    return 1;
  } else if (tags1.length === 0 || tags2.length === 0) {
    return 0;
  }

  const intersection = tags1.filter(tag => tags2.includes(tag));
  const union = [...new Set([...tags1, ...tags2])];
  return intersection.length / union.length;
};

module.exports = {
  processImage
};
