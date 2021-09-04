import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  movie_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  movie_name: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
  },
  num_stars: {
    type: Number,
    required: true,
    min: 1,
  },
  review_title: {
    type: String,
    required: true,
  },
  review_body: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
