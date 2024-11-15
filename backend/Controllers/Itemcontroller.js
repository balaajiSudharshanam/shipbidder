const Item = require('../Model/ItemModel');
const asyncHandler = require('express-async-handler');

// Create a new item
const createItem = asyncHandler(async (req, res) => {
  const {
    createdBy,
    pic,
    height,
    length,
    width,
    weight,
    category,
    subCategory,
    isFragile,
    isHazardous,
    description
  } = req.body;

  // Validate required fields
  if (!createdBy || !height || !length || !width || !weight || !category) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Create the item
  const item = await Item.create({
    createdBy,
    pic,
    height,
    length,
    width,
    weight,
    category,
    subCategory,
    isFragile,
    isHazardous,
    description
  });

  if (item) {
    item.populate('createdBy',"name email");
    res.status(201).json(item);
  } else {
    res.status(400);
    throw new Error('Failed to create item');
  }
});

module.exports = { createItem }; // Ensure you're exporting the controller correctly
