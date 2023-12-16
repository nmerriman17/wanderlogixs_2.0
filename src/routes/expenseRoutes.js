const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Get all expenses
router.get('/', expenseController.getExpenses);

// Get a single expense by ID
router.get('/:expense_id', expenseController.getExpenseById);

// Create a new expense
router.post('/', expenseController.createExpense);

// Update an expense
router.put('/:expense_id', expenseController.updateExpense);

// Delete an expense
router.delete('/:expense_id', expenseController.deleteExpense);

module.exports = router;
