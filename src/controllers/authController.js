import {
    registerUser,
    loginUser,
    logoutUser
} from "../services/authService.js";
import { createLog } from "../services/logsService.js";

export const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        try {
            await createLog({
            userId: result.id,
            email: result.email,
            action: "REGISTER",
            description: "User account Registered Successfully",
            ipAddress: req.ip,
            userAgent: req.get("user-agent")
        });

        } catch (logError) {
            console.error(
                "Failed to create Register log:",
                logError
            );

        }

        res.status(201).json({
            message: "User registered successfully, check email for verification",
            data: result
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

        try {

            await createLog({
                userId: result.id,
                email: req.body.email,
                action: "LOGIN",
                description: "User account login successfully",
                ipAddress: req.ip,
                userAgent: req.get("user-agent")
            });

        } catch (logError) {

            console.error(
                "Failed to create login log:",
                logError
            );

        }

        return res.status(200).json({
            message: "Login successful",
            data: result.token
        });

    } catch (error) {

        try {

            await createLog({
                userId: null,
                email: req.body.email,
                action: "LOGIN_FAILED",
                description: "Invalid email or password",
                ipAddress: req.ip,
                userAgent: req.get("user-agent")
            });

        } catch (logError) {

            console.error(
                "Failed to create failed login log:",
                logError
            );

        }

        return res.status(400).json({
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {

        await logoutUser({
            userId: req.user.id,
            email: req.user.email,
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