import express from "express";

import { getUser, createUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.post("/", getUser);
router.post("/new", createUser);
router.patch("/:id", updateUser);

export default router;
