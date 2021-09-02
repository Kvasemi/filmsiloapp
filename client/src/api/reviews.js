import axios from "axios";

const url = "http://localhost:5000/reviews";

export const getReviewsAPI = () => axios.get(url);
export const createReviewAPI = (newReview) => axios.post(url, newReview);
export const updateReviewAPI = (id, updatedReview) =>
  axios.patch(`${url}/${id}`, updatedReview);
export const deleteReviewAPI = (id) => axios.delete(`${url}/${id}`);
