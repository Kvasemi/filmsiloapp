import * as api from "../api/reviews.js";

export const getReviews = async () => {
  try {
    const { data } = await api.getReviewsAPI();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createReview = async (review) => {
  try {
    const { data } = await api.createReviewAPI(review);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async (id, review) => {
  try {
    const { data } = await api.updateReviewAPI(id, review);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (id, review) => {
  try {
    const res = await api.deleteReviewAPI(id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
