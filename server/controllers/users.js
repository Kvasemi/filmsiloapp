import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/users.js";

export const getUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (foundUser) {
    try {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        res.status(200).json(foundUser);
      } else {
        res.json({
          message: "Invalid credentials.",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: error.message + " this error triggered at controllers/getUser",
      });
    }
  } else {
    res.status(404).json({
      message: "there is no such user.",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const newPass = await bcrypt.hash(user.password, 10);
    const newUser = await new User({ ...user, password: newPass });
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({
      message:
        error.message + " this error triggered at controllers/createUser",
    });
  }
};
