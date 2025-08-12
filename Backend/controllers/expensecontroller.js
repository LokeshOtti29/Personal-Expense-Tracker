import db from "../config/db.js";

// Add Expense
export async function addExpense(req, res) {
  try {
    const user_id = req.user.id; // get from JWT decoded token
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
    const user_id = req.user.id; // from JWT middleware
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Update only if expense belongs to user (security)
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
    const user_id = req.user.id; // from JWT middleware

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

    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
