import * as api from "../api/users.js";

export const getUser = async (user) => {
  try {
    const { data } = await api.getUserAPI(user);
    return data;
  } catch (error) {
    console.log(error + ": triggered in client actions getUser");
    return false;
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await api.createUserAPI(user);
    console.log("New user successfully created!");
    return data;
  } catch (error) {
    console.log(error + ": triggered in client actions createUser");
    return false;
  }
};
