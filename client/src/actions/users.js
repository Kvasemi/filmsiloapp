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
    return data;
  } catch (error) {
    console.log(error + ": triggered in client actions createUser");
    return false;
  }
};

export const updateUser = async (id, user) => {
  try {
    const { data } = await api.updateUserAPI(id, user);
    return data;
  } catch (error) {
    console.log(error + ": triggered in client actions updateUser");
    return false;
  }
};
