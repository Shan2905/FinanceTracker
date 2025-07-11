import { Transaction, Budget } from '../types';

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateBalance = (transactions: Transaction[]): number => {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
};

export const getExpensesByCategory = (transactions: Transaction[]) => {
  const categoryTotals: { [key: string]: number } = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
  
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export const calculateBudgetProgress = (budget: Budget, transactions: Transaction[]): number => {
  const spent = transactions
    .filter(t => t.type === 'expense' && t.category === budget.category)
    .reduce((sum, t) => sum + t.amount, 0);
  
  return budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};