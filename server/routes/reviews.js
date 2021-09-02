import express from "express";

import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
