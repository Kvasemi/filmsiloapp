import axios from "axios";

const url = "http://localhost:5000/users";

export const getUserAPI = (user) => axios.post(url, user);
export const createUserAPI = (newUser) => axios.post(url + "/new", newUser);
