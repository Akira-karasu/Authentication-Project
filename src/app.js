import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import verificationRoutes
    from "./routes/verificationRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(
    "/api/verification",
    verificationRoutes
);


export default app;