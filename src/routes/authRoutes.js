import express from "express";
import {
    register,
    login,
    logout
} from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateAuth.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post(
    "/logout",
    authenticate,
    logout
);

export default router;