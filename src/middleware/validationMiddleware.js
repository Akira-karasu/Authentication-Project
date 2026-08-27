export const validateRegister = (req, res, next) => {

    const { username, email, password } = req.body;

    // Required fields
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Username validation
    if (typeof username !== "string") {
        return res.status(400).json({
            message: "Username must be a string"
        });
    }

    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 3) {
        return res.status(400).json({
            message: "Username must be at least 3 characters"
        });
    }

    if (trimmedUsername.length > 30) {
        return res.status(400).json({
            message: "Username must not exceed 30 characters"
        });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
        return res.status(400).json({
            message: "Username can only contain letters, numbers, and underscores"
        });
    }

    // Email validation
    if (typeof email !== "string") {
        return res.status(400).json({
            message: "Invalid email"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    // Password validation
    if (typeof password !== "string") {
        return res.status(400).json({
            message: "Password must be a string"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters"
        });
    }

    if (password.length > 128) {
        return res.status(400).json({
            message: "Password must not exceed 128 characters"
        });
    }

    // Optional password strength requirements
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({
            message: "Password must contain at least one uppercase letter"
        });
    }

    if (!/[a-z]/.test(password)) {
        return res.status(400).json({
            message: "Password must contain at least one lowercase letter"
        });
    }

    if (!/[0-9]/.test(password)) {
        return res.status(400).json({
            message: "Password must contain at least one number"
        });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            message: "Email and password must be valid strings"
        });
    }

    next();
};

export const validateForgot = (req, res, next) =>{
    const { email } = req.body;

    if (!email ){
        return res.status(400).json({
            message: "Email are required"
        });
    }
    next();    
}

export const validateReset = async (req, res, next) => {
    const { email, OTP } = req.body;

    if (!email || OTP ){
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }
    next();
}

export const validateChangePass = async (req, res, next) => {
    const {resetToken, newPassword} = req.body;

    if (!resetToken || newPassword){
        return res.status(400).json({
            message: "reset token and new password are required"
        })
    }
    next();
}

export const validateVerify = async (req, res, next) => {
    const { email } = req.body

    if (!email){
        return res.status(400).json({
            message: "email is required"
        })
    }

}
