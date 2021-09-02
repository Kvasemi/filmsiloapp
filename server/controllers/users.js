import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users.js";

export const getUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (foundUser) {
    try {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        const token = jwt.sign(
          { id: foundUser._id, email: foundUser.email },
          "test",
          { expiresIn: "1h" }
        );
        res.status(200).json({ res: foundUser, token });
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
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, "test", {
      expiresIn: "1h",
    });
    const result = await newUser.save();
    res.status(201).json({ res: result, token });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(user._id))
    return res.status(404).send("No post with id: ${id}");

  const updatedUser = User.findByIdAndUpdate(
    _id,
    { ...user },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(`Unable to update. Error: ${err}`);
      return res.status(200).send({ message: "Successfully updated!" });
    }
  );
};
