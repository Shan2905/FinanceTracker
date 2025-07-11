import React from 'react';
import { 
  calculateTotalIncome, 
  calculateTotalExpenses, 
  calculateBalance, 
  formatCurrency,
  getExpensesByCategory 
} from '../utils/calculations';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Zap, Target, Star } from 'lucide-react';

const Dashboard = ({ transactions, budgets }) => {
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const balance = calculateBalance(transactions);
  const expensesByCategory = getExpensesByCategory(transactions);

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance),
      icon: DollarSign,
      color: balance >= 0 ? 'text-emerald-600' : 'text-red-500',
      bgGradient: balance >= 0 ? 'from-emerald-400 to-teal-500' : 'from-red-400 to-pink-500',
      iconBg: balance >= 0 ? 'bg-emerald-100' : 'bg-red-100',
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgGradient: 'from-green-400 to-emerald-500',
      iconBg: 'bg-green-100',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'text-orange-600',
      bgGradient: 'from-orange-400 to-red-500',
      iconBg: 'bg-orange-100',
    },
    {
      title: 'Categories',
      value: expensesByCategory.length.toString(),
      icon: PieChart,
      color: 'text-purple-600',
      bgGradient: 'from-purple-400 to-pink-500',
      iconBg: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 sm:p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-bold">Welcome Back!</h2>
          </div>
          <p className="text-purple-100 text-sm sm:text-base">
            Track your finances with style and stay on top of your financial goals
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="mb-3 sm:mb-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-lg sm:text-2xl font-bold ${stat.color} transition-colors duration-300`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${stat.iconBg} group-hover:bg-gradient-to-r group-hover:${stat.bgGradient} transition-all duration-300`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} group-hover:text-white transition-colors duration-300`} />
                </div>
              </div>
              <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Transactions */}
        <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
                </div>
                <p className="text-gray-500 text-base sm:text-lg font-medium">No transactions yet</p>
                <p className="text-gray-400 text-sm mt-2">Start by adding your first transaction</p>
              </div>
            ) : (
              recentTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="group flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                        : 'bg-gradient-to-r from-orange-400 to-red-500'
                    }`}>
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{transaction.title}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm sm:text-base ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Spending Categories */}
        <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Top Spending Categories</h3>
          </div>
          <div className="space-y-4 sm:space-y-5">
            {expensesByCategory.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                </div>
                <p className="text-gray-500 text-base sm:text-lg font-medium">No expenses yet</p>
                <p className="text-gray-400 text-sm mt-2">Your spending categories will appear here</p>
              </div>
            ) : (
              expensesByCategory.slice(0, 5).map((category, index) => {
                const totalExpenses = expensesByCategory.reduce((sum, cat) => sum + cat.amount, 0);
                const percentage = totalExpenses > 0 ? (category.amount / totalExpenses) * 100 : 0;
                const gradients = [
                  'from-blue-400 to-purple-600',
                  'from-green-400 to-blue-500',
                  'from-yellow-400 to-orange-500',
                  'from-pink-400 to-red-500',
                  'from-indigo-400 to-purple-500'
                ];
                
                return (
                  <div key={index} className="space-y-3" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-semibold text-gray-700">{category.category}</span>
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        {formatCurrency(category.amount)}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${gradients[index % gradients.length]} h-full rounded-full transition-all duration-1000 ease-out transform origin-left`}
                          style={{ 
                            width: `${percentage}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of total expenses</p>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${gradients[index % gradients.length]} text-white`}>
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;