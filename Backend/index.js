import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
