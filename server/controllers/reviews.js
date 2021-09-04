import mongoose from "mongoose";

import Review from "../models/reviews.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = req.body;
    const newReview = new Review(review);
    const result = await newReview.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  const { id: _id } = req.params;
  const review = req.body;

  if (!mongoose.Types.ObjectId.isValid(review._id))
    return res.status(404).send("No review with id: ${id}");
  try {
    const updatedReview = Review.findByIdAndUpdate(
      _id,
      { ...review },
      { new: true },
      (err, result) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Unable to update. Error: ${err}` });
        return res.status(200).send({ message: "Successfully updated!" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No review with id: ${id}");

  try {
    await Review.findByIdAndRemove(id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
