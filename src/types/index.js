// Transaction interface structure
export const createTransaction = (id, title, amount, category, type, date, description = '') => ({
  id,
  title,
  amount,
  category,
  type, // 'income' or 'expense'
  date,
  description
});

// Budget interface structure
export const createBudget = (id, category, amount, spent, period) => ({
  id,
  category,
  amount,
  spent,
  period // 'monthly', 'weekly', or 'yearly'
});

// Category interface structure
export const createCategory = (id, name, type, color, icon) => ({
  id,
  name,
  type, // 'income' or 'expense'
  color,
  icon
});