import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller.js";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
