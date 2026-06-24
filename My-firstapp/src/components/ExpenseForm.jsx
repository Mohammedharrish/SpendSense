import React, { useState } from 'react';

export default function ExpenseForm({ onAdd, selectedDate }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    
    onAdd({ name, amount, category, date: selectedDate });
    setName('');
    setAmount('');
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors";

  return (
    <div className="bg-white border border-[#D4AF37] rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-100 pb-2">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm text-gray-500 mb-1">Expense Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Coffee"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-white border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(212,175,55,0.15)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.3)]"
        >
          Add to Ledger
        </button>
      </form>
    </div>
  );
}