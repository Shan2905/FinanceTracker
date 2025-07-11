import React, { useState, useEffect } from 'react';
import { storage } from './utils/storage';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetManager from './components/BudgetManager';
import Analytics from './components/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setTransactions(storage.getTransactions());
    setBudgets(storage.getBudgets());
    setCategories(storage.getCategories());
  }, []);

  const handleAddTransaction = (transactionData) => {
    const newTransaction = {
      ...transactionData,
      id: Date.now().toString(),
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  };

  const handleAddBudget = (budgetData) => {
    const newBudget = {
      ...budgetData,
      id: Date.now().toString(),
      spent: 0,
    };
    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    storage.saveBudgets(updatedBudgets);
  };

  const handleDeleteBudget = (id) => {
    const updatedBudgets = budgets.filter(b => b.id !== id);
    setBudgets(updatedBudgets);
    storage.saveBudgets(updatedBudgets);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} budgets={budgets} />;
      case 'transactions':
        return <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />;
      case 'budgets':
        return (
          <BudgetManager
            budgets={budgets}
            transactions={transactions}
            onAddBudget={handleAddBudget}
            onDeleteBudget={handleDeleteBudget}
          />
        );
      case 'analytics':
        return <Analytics transactions={transactions} />;
      default:
        return <Dashboard transactions={transactions} budgets={budgets} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      </main>

      {activeTab === 'transactions' && (
        <TransactionForm onSubmit={handleAddTransaction} categories={categories} />
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
}

export default App;