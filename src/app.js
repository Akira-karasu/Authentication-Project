import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import verificationRoutes
    from "./routes/verificationRoutes.js";
import passwordRoute from "./routes/passwordRoute.js"

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/verification",verificationRoutes);
app.use("/api/password", passwordRoute)


export default app;