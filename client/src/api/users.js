import axios from "axios";

const url = "https://filmsilo.herokuapp.com/users";

export const getUserAPI = (user) => axios.post(url, user);
export const createUserAPI = (newUser) => axios.post(`${url}/new`, newUser);
export const updateUserAPI = (id, updatedUser) =>
  axios.patch(`${url}/${id}`, updatedUser);
