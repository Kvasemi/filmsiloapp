import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

import * as api from "../api/reviews.js";

export const getReviews = () => async (dispatch) => {
  try {
    const { data } = await api.fetchReviews();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createReview = (review) => async (dispatch) => {
  try {
    const { data } = await api.createReview(review);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = (id, review) => async (dispatch) => {
  try {
    const { data } = await api.updateReview(id, review);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    await api.deleteReview(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
