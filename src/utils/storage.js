const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-tracker-transactions',
  BUDGETS: 'finance-tracker-budgets',
  CATEGORIES: 'finance-tracker-categories',
};

export const storage = {
  getTransactions: () => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  saveTransactions: (transactions) => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  getBudgets: () => {
    const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    return data ? JSON.parse(data) : [];
  },

  saveBudgets: (budgets) => {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  },

  getCategories: () => {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : getDefaultCategories();
  },

  saveCategories: (categories) => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },
};

const getDefaultCategories = () => [
  { id: '1', name: 'Food & Dining', type: 'expense', color: '#EF4444', icon: 'UtensilsCrossed' },
  { id: '2', name: 'Transportation', type: 'expense', color: '#F97316', icon: 'Car' },
  { id: '3', name: 'Shopping', type: 'expense', color: '#8B5CF6', icon: 'ShoppingBag' },
  { id: '4', name: 'Entertainment', type: 'expense', color: '#EC4899', icon: 'Film' },
  { id: '5', name: 'Healthcare', type: 'expense', color: '#10B981', icon: 'Heart' },
  { id: '6', name: 'Utilities', type: 'expense', color: '#06B6D4', icon: 'Zap' },
  { id: '7', name: 'Salary', type: 'income', color: '#22C55E', icon: 'Banknote' },
  { id: '8', name: 'Freelance', type: 'income', color: '#3B82F6', icon: 'Briefcase' },
  { id: '9', name: 'Investment', type: 'income', color: '#F59E0B', icon: 'TrendingUp' },
];