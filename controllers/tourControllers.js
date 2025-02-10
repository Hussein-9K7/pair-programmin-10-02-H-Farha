const mongoose = require('mongoose');
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching tours' });
  }
};

exports.createTour = async (req, res) => {
  const { name, info, image, price } = req.body;

  if (!name || !info || !image || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTour = new Tour({
      name,
      info,
      image,
      price,
    });

    await newTour.save();

    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the tour' });
  }
};

exports.getTourById = async (req, res) => {
  const { tourId } = req.params;

  try {
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the tour' });
  }
};

exports.updateTour = async (req, res) => {
  const { tourId } = req.params;


  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  const { name, info, image, price } = req.body;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      { name, info, image, price },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the tour' });
  }
};

exports.deleteTour = async (req, res) => {
  const { tourId } = req.params;


  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  try {
    const deletedTour = await Tour.findByIdAndDelete(tourId);

    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the tour' });
  }
};
