import express from "express";
import {
    register,
    login,
    logout
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validateLogin, validateRegister } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post(
    "/logout",
    authenticate,
    logout
);

export default router;