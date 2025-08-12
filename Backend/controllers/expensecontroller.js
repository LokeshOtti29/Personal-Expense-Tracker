import db from "../config/db.js";

// Add Expense
export async function addExpense(req, res) {
  try {
    const user_id = req.user.id;
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const query = `
      INSERT INTO expenses (user_id, amount, category, description, date)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(query, [user_id, amount, category, description, date]);

    res.json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Edit Expense
export async function editExpense(req, res) {
  try {
    const expenseId = req.params.id;
    const user_id = req.user.id;
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const query = `
      UPDATE expenses 
      SET amount = ?, category = ?, description = ?, date = ?
      WHERE id = ? AND user_id = ?
    `;

    const [result] = await db.query(query, [
      amount,
      category,
      description,
      date,
      expenseId,
      user_id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete Expense
export async function deleteExpense(req, res) {
  try {
    const expenseId = req.params.id;
    const user_id = req.user.id;

    const [result] = await db.query(
      "DELETE FROM expenses WHERE id = ? AND user_id = ?",
      [expenseId, user_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getExpenses(req, res) {
  try {
    const user_id = req.user.id;

    const [expenses] = await db.query(
      `SELECT id, amount, category, description, date 
       FROM expenses 
       WHERE user_id = ? 
       ORDER BY date DESC`,
      [user_id]
    );

    const [categoryData] = await db.query(
      `SELECT category, SUM(amount) AS total 
       FROM expenses 
       WHERE user_id = ? 
       GROUP BY category`,
      [user_id]
    );

    const [monthlyData] = await db.query(
      `SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(amount) AS total 
       FROM expenses 
       WHERE user_id = ? 
       GROUP BY month 
       ORDER BY month`,
      [user_id]
    );

    const doughnutData = categoryData.map((row) => ({
      category: row.category,
      total: Number(row.total),
    }));

    const barData = monthlyData.map((row) => ({
      month: row.month,
      total: Number(row.total),
    }));

    res.json({ expenses, dashboard: { doughnutData, barData } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
