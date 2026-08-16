import app from "./src/app.js";
import dotenv from "dotenv";
import { testConnection } from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

testConnection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});