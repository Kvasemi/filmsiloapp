import axios from "axios";

const url = "localhost:5000";

export const fetchReviews = () => axios.get(url);
export const createReview = (newReview) => axios.post(url, newReview);
export const updateReview = (id, updatedReview) =>
  axios.patch(`${url}/${id}`, updatedReview);
export const deleteReview = (id) => axios.delete(`${url}/${id}`);
