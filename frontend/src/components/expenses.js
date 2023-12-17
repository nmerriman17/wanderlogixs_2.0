import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import './expenses.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from '../components/header.js'; 
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || '/api';

const schema = yup.object().shape({
  date: yup.date().required('Date is required'),
  category: yup.string().required('Category is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive()
    .typeError('Amount must be a number'),
  description: yup.string(),
});

const ExpenseCard = ({ expense }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{expense.category}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{expense.date}</Card.Subtitle>
        <Card.Text>
          {expense.description}
          <br />
          <b>Amount:</b> ${expense.amount}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/expenses`)
         .then(response => setExpenses(response.data))
         .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const expenseData = { ...values };
    axios.post(`${apiUrl}/expenses`, expenseData)
         .then(response => {
           setExpenses([response.data, ...expenses]);
           resetForm();
         })
         .catch(error => console.error('Error submitting expense:', error));
  };

  return (
    <>
      <AppHeader />
      <div className="expense-form-container">
        <div className="expense-header">
          <div className="expense-text">Add Your Expenses</div>
          <div className="underline"></div>
        </div>
        <Formik
          initialValues={{
            date: '',
            category: '',
            amount: '',
            description: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form id="expense-form">
              <div className="inputs">
                <Field name="date" type="date" className="form-control" />
                <Field name="category" as="select" className="form-control">
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="accommodations">Accommodations</option>
                </Field>
                <Field name="amount" type="number" className="form-control" />
                <Field name="description" type="text" className="form-control" />
              </div>
              <button type="submit" className="btn expense-btn-primary">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="expense-display">
        {expenses.map((expense, index) => (
          <ExpenseCard key={index} expense={expense} />
        ))}
      </div>
    </>
  );
};

export default Expenses;
