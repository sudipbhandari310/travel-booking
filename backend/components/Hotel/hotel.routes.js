import express from "express";
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "./hotel.controller.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect,createHotel);
router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.put("/:id", protect, updateHotel);
router.delete("/:id", protect, deleteHotel);

export default router;
