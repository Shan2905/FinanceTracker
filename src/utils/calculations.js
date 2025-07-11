export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateBalance = (transactions) => {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
};

export const getExpensesByCategory = (transactions) => {
  const categoryTotals = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
  
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export const calculateBudgetProgress = (budget, transactions) => {
  const spent = transactions
    .filter(t => t.type === 'expense' && t.category === budget.category)
    .reduce((sum, t) => sum + t.amount, 0);
  
  return budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};