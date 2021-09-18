import axios from "axios";

const url = "https://filmsilo.herokuapp.com/reviews";

export const getReviewsAPI = () => axios.get(url);
export const createReviewAPI = (newReview) => axios.post(url, newReview);
export const updateReviewAPI = (id, updatedReview) =>
  axios.patch(`${url}/${id}`, updatedReview);
export const deleteReviewAPI = (id, review) => axios.delete(`${url}/${id}`);
