import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/calculations';
import { Search, Trash2, Filter, TrendingUp, TrendingDown, Calendar, Tag } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search and Filter Header */}
      <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Search Input */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 sm:gap-3">
            {[
              { type: 'all', label: 'All', icon: Filter, gradient: 'from-gray-500 to-gray-600' },
              { type: 'income', label: 'Income', icon: TrendingUp, gradient: 'from-green-500 to-emerald-600' },
              { type: 'expense', label: 'Expense', icon: TrendingDown, gradient: 'from-red-500 to-pink-600' }
            ].map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.type}
                  onClick={() => setFilterType(filter.type as any)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    filterType === filter.type
                      ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              All Transactions ({filteredTransactions.length})
            </h3>
          </div>
          
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500" />
              </div>
              <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-2">No transactions found</p>
              <p className="text-gray-400 text-sm sm:text-base">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-[1.02] hover:shadow-lg"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    {/* Transaction Icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                        : 'bg-gradient-to-r from-red-400 to-pink-500'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      ) : (
                        <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      )}
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-gray-900 text-base sm:text-lg truncate pr-2">
                          {transaction.title}
                        </h4>
                        <button
                          onClick={() => onDelete(transaction.id)}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transform hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">
                            {transaction.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      {transaction.description && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
                          {transaction.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Amount and Type Badge */}
                  <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className={`text-lg sm:text-xl font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' 
                        : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;