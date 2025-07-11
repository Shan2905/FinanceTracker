import React from 'react';
import { Transaction } from '../types';
import { getExpensesByCategory, formatCurrency } from '../utils/calculations';
import { BarChart3, TrendingUp, Calendar, DollarSign, PieChart, Activity, Zap } from 'lucide-react';

interface AnalyticsProps {
  transactions: Transaction[];
}

const Analytics: React.FC<AnalyticsProps> = ({ transactions }) => {
  const expensesByCategory = getExpensesByCategory(transactions);
  const totalExpenses = expensesByCategory.reduce((sum, cat) => sum + cat.amount, 0);
  
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    acc[month][transaction.type] += transaction.amount;
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const monthlyEntries = Object.entries(monthlyData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-6);

  const maxAmount = Math.max(...monthlyEntries.map(([, data]) => Math.max(data.income, data.expense)));

  const categoryColors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600', 
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
    'from-indigo-400 to-indigo-600',
    'from-pink-400 to-pink-600',
    'from-teal-400 to-teal-600'
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Financial Analytics</h2>
              <p className="text-blue-100 text-sm sm:text-base mt-1">
                Insights into your spending patterns and trends
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Spending by Category */}
        <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Spending by Category</h3>
          </div>
          
          {expensesByCategory.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
              </div>
              <p className="text-gray-500 text-base sm:text-lg font-medium">No expense data available</p>
              <p className="text-gray-400 text-sm mt-2">Start adding expenses to see insights</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {expensesByCategory.map((category, index) => {
                const percentage = totalExpenses > 0 ? (category.amount / totalExpenses) * 100 : 0;
                
                return (
                  <div 
                    key={index} 
                    className="group space-y-3 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColors[index % categoryColors.length]}`}></div>
                        <span className="text-sm sm:text-base font-semibold text-gray-700">
                          {category.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold text-gray-900">
                          {formatCurrency(category.amount)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${categoryColors[index % categoryColors.length]} h-full rounded-full transition-all duration-1000 ease-out transform origin-left group-hover:scale-105`}
                          style={{ 
                            width: `${percentage}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Rank #{index + 1}</span>
                      <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${categoryColors[index % categoryColors.length]} text-white font-medium`}>
                        {percentage.toFixed(0)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Monthly Trends */}
        <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Monthly Trends</h3>
          </div>
          
          {monthlyEntries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
              </div>
              <p className="text-gray-500 text-base sm:text-lg font-medium">No monthly data available</p>
              <p className="text-gray-400 text-sm mt-2">Add transactions to see trends</p>
            </div>
          ) : (
            <div className="space-y-6">
              {monthlyEntries.map(([month, data], index) => {
                const incomePercentage = maxAmount > 0 ? (data.income / maxAmount) * 100 : 0;
                const expensePercentage = maxAmount > 0 ? (data.expense / maxAmount) * 100 : 0;
                const netAmount = data.income - data.expense;
                
                return (
                  <div 
                    key={month} 
                    className="group space-y-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm sm:text-base font-bold text-gray-700">{month}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Net: {formatCurrency(netAmount)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Income Bar */}
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-xs text-gray-600 font-medium">Income</div>
                        <div className="flex-1 relative">
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out group-hover:scale-105"
                              style={{ 
                                width: `${incomePercentage}%`,
                                animationDelay: `${index * 200}ms`
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="w-20 text-xs text-right text-gray-700 font-semibold">
                          {formatCurrency(data.income)}
                        </div>
                      </div>
                      
                      {/* Expense Bar */}
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-xs text-gray-600 font-medium">Expense</div>
                        <div className="flex-1 relative">
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-red-400 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out group-hover:scale-105"
                              style={{ 
                                width: `${expensePercentage}%`,
                                animationDelay: `${index * 200 + 100}ms`
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="w-20 text-xs text-right text-gray-700 font-semibold">
                          {formatCurrency(data.expense)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Transactions</p>
                <p className="text-3xl sm:text-4xl font-bold mt-2">{transactions.length}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 translate-x-12"></div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Avg. Monthly Income</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">
                  {formatCurrency(
                    monthlyEntries.length > 0 
                      ? monthlyEntries.reduce((sum, [, data]) => sum + data.income, 0) / monthlyEntries.length
                      : 0
                  )}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 translate-x-12"></div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Avg. Monthly Expense</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">
                  {formatCurrency(
                    monthlyEntries.length > 0 
                      ? monthlyEntries.reduce((sum, [, data]) => sum + data.expense, 0) / monthlyEntries.length
                      : 0
                  )}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 translate-x-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;