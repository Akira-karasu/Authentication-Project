import {
    registerUser,
    loginUser,
    logoutUser
} from "../services/authService.js";
import { createLog } from "../services/logsService.js";

export const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully, check email for verification",
            data: result
        });

        await createLog({
            userId: result.id,
            action: "REGISTER",
            description: "User account Registered Successfully",
            ipAddress: req.ip,
            userAgent: req.get("user-agent")
        });


    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
            message: "Login successful",
            data: result.token
        });

        await createLog({
            userId: result.id,
            action: "LOGIN",
            description: "User account login successfully",
            ipAddress: req.ip,
            userAgent: req.get("user-agent")
        });

    } catch (error) {

        await createLog({
            userId: null,
            action: "LOGIN_FAILED",
            description: "Invalid email or password",
            ipAddress: req.ip,
            userAgent: req.get("user-agent")
        });

        res.status(400).json({
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {

        await logoutUser({
            userId: req.user.id,
            ipAddress: req.ip,
            userAgent: req.get("user-agent")
        });

        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};