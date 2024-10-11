import express from "express";
import { generateExpense } from "./ganerator.js";
const app = express();
app.use(express.json()); 

let expenses = [];

app.get("/expenses", (req, res) => {
    res.json(expenses);
});

app.get("/expenses/:id", (req, res) => {
    const expense = expenses.find(e => e.id === Number(req.params.id));
    if (expense) {
        res.json(expense);
    } else {
        res.status(404).json({ error: "Expense not found" });
    }
});

app.post("/expenses", (req, res) => {
    const newExpense = generateExpense(expenses.length + 1);
    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.put("/expenses/:id", (req, res) => {
    const expenseIndex = expenses.findIndex(e => e.id === Number(req.params.id));
    if (expenseIndex !== -1) {
        expenses[expenseIndex] = { ...req.body, id: Number(req.params.id) };
        res.json(expenses[expenseIndex]);
    } else {
        res.status(404).json({ error: "Expense not found" });
    }
});

app.patch("/expenses/:id", (req, res) => {
    const expense = expenses.find(e => e.id === Number(req.params.id));
    if (expense) {
        Object.assign(expense, req.body); 
        res.json(expense);
    } else {
        res.status(404).json({ error: "Expense not found" });
    }
});

app.delete("/expenses/:id", (req, res) => {
    const expenseIndex = expenses.findIndex(e => e.id === Number(req.params.id));
    if (expenseIndex !== -1) {
        const deletedExpense = expenses.splice(expenseIndex, 1); 
        res.json(deletedExpense[0]);
    } else {
        res.status(404).json({ error: "Expense not found" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});