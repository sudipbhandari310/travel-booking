import express from "express";
import authRoutes from "../components/auth/auth.routes.js";
import userRoutes from "../components/User/user.routes.js";
import hotelRoutes from "../components/Hotel/hotel.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/hotels", hotelRoutes);

export default router;
