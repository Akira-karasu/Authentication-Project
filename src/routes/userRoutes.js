import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticate, authorize("user"), getUserProfile);

export default router;


