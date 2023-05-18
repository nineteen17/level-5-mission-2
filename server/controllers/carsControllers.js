const Car = require("../models/carsModels");

// Get all cars with dynamic parameters
exports.getCarsParams = async (req, res) => {
  try {
    const cars = await Car.find(req.query).exec();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching cars' });
  }
};



// Get all cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().exec();
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching cars' });
    }
    }