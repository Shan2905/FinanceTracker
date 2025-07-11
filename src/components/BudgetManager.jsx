import React, { useState } from 'react';
import { formatCurrency } from '../utils/calculations';
import { Plus, Trash2, Target, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

const BudgetManager = ({ budgets, transactions, onAddBudget, onDeleteBudget }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) return;

    onAddBudget({
      category: formData.category,
      amount: parseFloat(formData.amount),
      period: formData.period,
    });

    setFormData({ category: '', amount: '', period: 'monthly' });
    setShowForm(false);
  };

  const calculateSpent = (budget) => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getProgressColor = (percentage) => {
    if (percentage < 70) return 'from-green-400 to-emerald-500';
    if (percentage < 90) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getStatusIcon = (percentage) => {
    if (percentage < 70) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (percentage < 90) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Budget Management</h2>
                <p className="text-green-100 text-sm sm:text-base mt-1">
                  Track your spending against your budgets
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg flex items-center gap-2 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Add Budget</span>
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      </div>

      {/* Budget Form */}
      {showForm && (
        <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 transform animate-slideDown">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Create New Budget</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                placeholder="e.g., Food & Dining"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full p-3 sm:p-4 pl-10 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                  placeholder="0.00"
                  required
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Period
              </label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105 font-semibold"
              >
                Add Budget
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Budget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {budgets.length === 0 ? (
          <div className="col-span-full bg-white/80 backdrop-blur-lg p-12 sm:p-16 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No Budgets Yet</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Create your first budget to start tracking your spending
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105 font-semibold"
            >
              Create Budget
            </button>
          </div>
        ) : (
          budgets.map((budget, index) => {
            const spent = calculateSpent(budget);
            const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
            const remaining = budget.amount - spent;
            
            return (
              <div 
                key={budget.id} 
                className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${getProgressColor(percentage)}`}>
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{budget.category}</h3>
                      <p className="text-sm text-gray-600 capitalize flex items-center gap-1">
                        <span>{budget.period}</span>
                        {getStatusIcon(percentage)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteBudget(budget.id)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transform hover:scale-110"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress Circle */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${Math.min(percentage, 100) * 3.14} 314`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={percentage < 70 ? '#10B981' : percentage < 90 ? '#F59E0B' : '#EF4444'} />
                        <stop offset="100%" stopColor={percentage < 70 ? '#059669' : percentage < 90 ? '#D97706' : '#DC2626'} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{percentage.toFixed(0)}%</div>
                      <div className="text-xs text-gray-500">Used</div>
                    </div>
                  </div>
                </div>
                
                {/* Budget Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">Spent</span>
                    <span className="font-bold text-gray-900">{formatCurrency(spent)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">Budget</span>
                    <span className="font-bold text-gray-900">{formatCurrency(budget.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className={`font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(remaining)}
                    </span>
                  </div>
                  
                  {percentage > 100 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Over budget by {(percentage - 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BudgetManager;