import { userProfile } from "../services/userService.js";

export const getUserProfile = async (req, res) => {
    try {
        const result = await userProfile(req.user);

        res.status(200).json({
            message: "User profile sent successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};