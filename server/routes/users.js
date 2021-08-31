import express from "express";

import { getUser, createUser } from "../controllers/users.js";

const router = express.Router();

router.post("/", getUser);
router.post("/new", createUser);

export default router;
