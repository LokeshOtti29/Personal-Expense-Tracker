import express from "express";
import {
  addExpense,
  deleteExpense,
  editExpense,
  getExpenses,
} from "../controllers/expensecontroller.js";
import { authenticateToken } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/add", authenticateToken, addExpense);
router.put("/edit/:id", authenticateToken, editExpense);
router.delete("/delete/:id", authenticateToken, deleteExpense);
router.get("/list", authenticateToken, getExpenses);

export default router;
