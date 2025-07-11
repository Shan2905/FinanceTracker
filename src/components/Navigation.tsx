import React from 'react';
import { Home, Plus, BarChart3, Settings, Wallet, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-purple-500 to-pink-500' },
    { id: 'transactions', label: 'Transactions', icon: Plus, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'budgets', label: 'Budgets', icon: Wallet, gradient: 'from-green-500 to-emerald-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-purple-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FinanceTracker
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Smart Money Management</p>
            </div>
          </div>
          
          <div className="flex space-x-1 sm:space-x-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`group relative flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg shadow-purple-500/25`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-xs sm:text-sm hidden sm:inline">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;