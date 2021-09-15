import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Film Silo!");
});

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://filmsiloadmin:filmsiloansong@cluster0.k4kpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
