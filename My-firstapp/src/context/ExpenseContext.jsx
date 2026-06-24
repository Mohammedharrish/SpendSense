import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ExpenseContext = createContext();

export function useExpenses() {
  return useContext(ExpenseContext);
}

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }
    // Default dummy data for showcase
    return [
      { id: uuidv4(), amount: 120.50, category: 'Food', date: new Date().toISOString().split('T')[0], note: 'Groceries' },
      { id: uuidv4(), amount: 55.00, category: 'Transport', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], note: 'Gas' },
      { id: uuidv4(), amount: 300.00, category: 'Shopping', date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], note: 'New shoes' },
      { id: uuidv4(), amount: 15.00, category: 'Entertainment', date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], note: 'Movie ticket' },
    ];
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    return ['Food', 'Transport', 'Shopping', 'Entertainment', 'Housing', 'Utilities', 'Other'];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'INR';
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const addExpense = (expense) => {
    setExpenses(prev => [{ ...expense, id: uuidv4() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const deleteCategory = (category) => {
    setCategories(prev => prev.filter(c => c !== category));
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'INR': return '₹';
      default: return '₹';
    }
  };

  const value = {
    expenses,
    categories,
    theme,
    currency,
    setTheme,
    setCurrency,
    addExpense,
    deleteExpense,
    addCategory,
    deleteCategory,
    currencySymbol: getCurrencySymbol()
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}
