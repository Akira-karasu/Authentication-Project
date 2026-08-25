import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization header"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


export const authorize = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();
    };
};