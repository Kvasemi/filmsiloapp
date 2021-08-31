import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: String,
  reviews: [Number],
});

const User = mongoose.model("User", userSchema);

export default User;
