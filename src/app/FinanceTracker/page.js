'use client';

import { useState, useEffect } from 'react';
import { Plus, DollarSign, TrendingUp, Target, PieChart, BarChart3 } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function FinanceTracker() {
  const [incomes, setIncomes] = useState([{ amount: '', type: 'salary', customType: '' }]);
  const [expenses, setExpenses] = useState([{ amount: '', category: 'groceries', customCategory: '' }]);
  const [isClient, setIsClient] = useState(false);
  const [insights, setInsights] = useState('');
  const [goals, setGoals] = useState("");
  const [incomeMonthly, setIncomeMonthly] = useState('monthly');
  const [expenseMonthly, setExpenseMonthly] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

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

  const handleDollarInput = (index, e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    handleIncomeChange(index, 'amount', value);
  };

  const handleDollarInputExpense = (index, e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    handleExpenseChange(index, 'amount', value);
  };

  const handleIncomeMonthly = (e) => {
    setIncomeMonthly(e.target.value);
  }

  const handleExpenseMonthly = (e) => {
    setExpenseMonthly(e.target.value);
  }

  // Generate chart data
  const generateChartData = () => {
    const totalIncome = incomes.reduce((sum, income) => {
      let amount = parseFloat(income.amount) || 0;
      // Convert to monthly if needed
      if (incomeMonthly === 'weekly') amount *= 4.33;
      else if (incomeMonthly === 'bi-weekly') amount *= 2.17;
      else if (incomeMonthly === 'daily') amount *= 30;
      return sum + amount;
    }, 0);

    const totalExpenses = expenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

    const expensesByCategory = expenses.reduce((acc, expense) => {
      const category = expense.category === 'other' ? expense.customCategory || 'Other' : expense.category;
      const amount = parseFloat(expense.amount) || 0;
      if (amount > 0) {
        acc[category] = (acc[category] || 0) + amount;
      }
      return acc;
    }, {});

    const data = Object.entries(expensesByCategory).map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount,
      percentage: ((amount / totalIncome) * 100).toFixed(1)
    }));

    const remaining = totalIncome - totalExpenses;
    if (remaining > 0) {
      data.push({
        name: 'Remaining/Savings',
        value: remaining,
        percentage: ((remaining / totalIncome) * 100).toFixed(1)
      });
    }

    return data;
  };

  const COLORS = [
    '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', 
    '#EC4899', '#84CC16', '#F97316', '#6366F1', '#14B8A6'
  ];

  const analyzeSpending = async () => {
    setLoading(true);
    try {
      // Generate chart data
      const data = generateChartData();
      setChartData(data);
      setShowChart(true);

      // Simulate API call for insights
      const res = await fetch("http://localhost:8000/analyze-spending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          incomes,
          expenses,
          goals,
          incomeMonthly
        })
      });

      const json = await res.json();
      setInsights(json.analysis);
    } catch (error) {
      console.error('Error analyzing spending:', error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg border border-white/20 shadow-xl">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-purple-300">${data.value.toFixed(2)}</p>
          <p className="text-cyan-300">{data.payload.percentage}% of income</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              FinTrack
            </h1>
          </div>
          <p className="text-slate-400 text-xl">Track your income, expenses, and get AI-driven insights</p>
        </header>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="flex items-center space-x-3 mb-8">
            <PieChart className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold text-white">Add Your Financial Data</h2>
          </div>

          {/* Incomes Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Income Sources</h3>
              </div>
              
              <select
                value={incomeMonthly}
                onChange={handleIncomeMonthly}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"           
              >
                <option value="monthly" className="bg-slate-800 text-white">Monthly Income</option>
                <option value="bi-weekly" className="bg-slate-800 text-white">Bi-Weekly Income</option>
                <option value="weekly" className="bg-slate-800 text-white">Weekly Income</option>
                <option value="daily" className="bg-slate-800 text-white">Daily Income</option>
              </select>
            </div>

            <div className="space-y-4">
              {incomes.map((income, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Income Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={income.amount}
                        onChange={(e) => handleDollarInput(index, e)}
                        placeholder="Enter income amount"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Income Type</label>
                    <select
                      value={income.type}
                      onChange={(e) => handleIncomeChange(index, 'type', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    >
                      <option value="salary" className="bg-slate-800 text-white">Salary (Job)</option>
                      <option value="sideHustle" className="bg-slate-800 text-white">Side Hustle</option>
                      <option value="freelance" className="bg-slate-800 text-white">Freelance</option>
                      <option value="investment" className="bg-slate-800 text-white">Investment</option>
                      <option value="other" className="bg-slate-800 text-white">Other</option>
                    </select>
                    {income.type === 'other' && (
                      <input
                        type="text"
                        value={income.customType}
                        onChange={(e) => handleIncomeChange(index, 'customType', e.target.value)}
                        placeholder="Specify income type"
                        className="mt-3 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addIncome}
              className="w-full mt-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white py-3 px-6 rounded-xl hover:from-green-700/80 hover:to-emerald-700/80 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 backdrop-blur-sm border border-green-500/20"
            >
              <Plus className="w-5 h-5" />
              <span>Add Income Source</span>
            </button>
          </div>

          {/* Expenses Section */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
              <h3 className="text-xl font-semibold text-white">Monthly Expenses</h3>
            </div>

            <div className="space-y-4">
              {expenses.map((expense, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Expense Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={expense.amount}
                        onChange={(e) => handleDollarInputExpense(index, e)}
                        placeholder="Enter expense amount"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Expense Category</label>
                    <select
                      value={expense.category}
                      onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    >
                      <option value="groceries" className="bg-slate-800 text-white">Groceries</option>
                      <option value="entertainment" className="bg-slate-800 text-white">Entertainment</option>
                      <option value="utilities" className="bg-slate-800 text-white">Utilities</option>
                      <option value="transportation" className="bg-slate-800 text-white">Transportation</option>
                      <option value="rent" className="bg-slate-800 text-white">Rent</option>
                      <option value="debt payments" className="bg-slate-800 text-white">Debt Payments</option>
                      <option value="other" className="bg-slate-800 text-white">Other</option>
                    </select>
                    {expense.category === 'other' && (
                      <input
                        type="text"
                        value={expense.customCategory}
                        onChange={(e) => handleExpenseChange(index, 'customCategory', e.target.value)}
                        placeholder="Specify expense category"
                        className="mt-3 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addExpense}
              className="w-full mt-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600/80 to-pink-600/80 text-white py-3 px-6 rounded-xl hover:from-red-700/80 hover:to-pink-700/80 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 backdrop-blur-sm border border-red-500/20"
            >
              <Plus className="w-5 h-5" />
              <span>Add Expense</span>
            </button>
          </div>

          {/* Goals Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Financial Goals</h3>
            </div>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Example: I want to save $500 this month, I want to pay off my debts, etc."
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none"
            />
          </div>

          {/* Analyze Button */}
          <button 
            onClick={analyzeSpending}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Analyze Spending</span>
              </div>
            )}
          </button>
        </div>

        {/* Chart Section */}
        {showChart && chartData.length > 0 && (
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl mb-8 animate-fade-in">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Spending Breakdown</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">${item.value.toFixed(2)}</div>
                      <div className="text-slate-400 text-sm">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Section */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white">AI-Driven Insights</h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500/30 border-b-cyan-500 rounded-full animate-spin animate-reverse"></div>
                </div>
              </div>
            ) : insights ? (
              <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                <p className="text-white leading-relaxed">{insights}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-2xl border border-orange-500/20 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white">Your spending on groceries is 25% higher than last month. Consider budgeting better.</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/20 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white">You saved 15% more this month compared to last month. Great job!</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white">Your income is stable, but your entertainment expenses have increased by 30%.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 py-8 text-center space-y-4">
          <p className="text-slate-400">© Created by Chris Alpuerto</p>
          <a 
            href="https://github.com/chrisalpuerto/FinTrack.git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
          </a>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}