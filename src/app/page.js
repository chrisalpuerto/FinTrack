'use client';

import { useState, useEffect } from 'react';

export default function FinanceTracker() {
  const [incomes, setIncomes] = useState([{ amount: '', type: 'salary', customType: '' }]);
  const [expenses, setExpenses] = useState([{ amount: '', category: 'groceries', customCategory: '' }]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Handle adding a new income field
  const addIncome = () => {
    setIncomes([...incomes, { amount: '', type: 'salary', customType: '' }]);
  };

  // Handle adding a new expense field
  const addExpense = () => {
    setExpenses([...expenses, { amount: '', category: 'groceries', customCategory: '' }]);
  };

  // Handle income input changes
  const handleIncomeChange = (index, field, value) => {
    const updatedIncomes = [...incomes];
    updatedIncomes[index][field] = value;
    setIncomes(updatedIncomes);
  };

  // Handle expense input changes
  const handleExpenseChange = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">FinTrack</h1>
          <p className="text-gray-600 mt-2">Track your income, expenses, and get AI-driven insights.</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Your Financial Data</h2>

          {/* Incomes Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Incomes</h3>
            {incomes.map((income, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Income Amount</label>
                  <input
                    type="number"
                    value={income.amount}
                    onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
                    placeholder="Enter income amount"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Income Type</label>
                  <select
                    value={income.type}
                    onChange={(e) => handleIncomeChange(index, 'type', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                  >
                    <option value="salary">Salary (Job)</option>
                    <option value="sideHustle">Side Hustle</option>
                    <option value="freelance">Freelance</option>
                    <option value="investment">Investment</option>
                    <option value="other">Other</option>
                  </select>
                  {income.type === 'other' && (
                    <input
                      type="text"
                      value={income.customType}
                      onChange={(e) => handleIncomeChange(index, 'customType', e.target.value)}
                      placeholder="Specify income type"
                      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-50 text-gray-700"
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addIncome}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Income
            </button>
          </div>

          {/* Expenses Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Expenses</h3>
            {expenses.map((expense, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expense Amount</label>
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                    placeholder="Enter expense amount"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expense Category</label>
                  <select
                    value={expense.category}
                    onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                  >
                    <option value="groceries">Groceries</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="transportation">Transportation</option>
                    <option value="rent">Rent</option>
                    <option value="debt payments">Debt Payments</option>
                    <option value="other">Other</option>
                  </select>
                  {expense.category === 'other' && (
                    <input
                      type="text"
                      value={expense.customCategory}
                      onChange={(e) => handleExpenseChange(index, 'customCategory', e.target.value)}
                      placeholder="Specify expense category"
                      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addExpense}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Expense
            </button>
          </div>
          <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4"></h3>


          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What are your financial goals?</h3>
            <textarea
            placeholder="Example: I want to save $500 this month, I want to pay off my debts, etc."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            
            />

          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Analyze Spending
            </button>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI-Driven Insights</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Your spending on groceries is 25% higher than last month. Consider budgeting better.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">You saved 15% more this month compared to last month. Great job!</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Your income is stable, but your entertainment expenses have increased by 30%.</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-gray-200 mt-8 py-6 text-center">
        <p className="text-gray-600">© Created by Chris Alpuerto</p>
        <a href="https://github.com/chrisalpuerto/FinTrack.git" target="blank" rel="noopener noreferrer">

          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github" className="gray-200 inline-block h-6 w-6"/>
        </a>
        
        </footer>
    </div>
  );
}