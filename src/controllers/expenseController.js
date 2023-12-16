const expenseModel = require('../models/expenseModel.js');

const sendErrorResponse = (res, error) => {
    if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.getAllExpenses();
        res.json(expenses);
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

const getExpenseById = async (req, res) => {
    try {
        const expenseId = req.params.expense_id; 
        const expense = await expenseModel.getExpenseById(expenseId);
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

const createExpense = async (req, res) => {
    try {
        const newExpense = await expenseModel.addExpense(req.body);
        res.status(201).json(newExpense);
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

const updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.expense_id;
        const updatedExpense = await expenseModel.updateExpense(expenseId, req.body);
        if (updatedExpense) {
            res.json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.expense_id;
        const deletedExpense = await expenseModel.deleteExpense(expenseId);
        if (deletedExpense) {
            res.json({ message: 'Expense successfully deleted' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

module.exports = {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};
