import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) return null;

  return (
    <div className="bg-white border border-[#D4AF37] rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Today's Transactions</h2>
      </div>
      
      <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
        {expenses.map((expense) => (
          <div key={expense.id} className="p-4 px-6 flex justify-between items-center hover:bg-[#fbf9f1] transition-colors">
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{expense.name}</span>
              <span className="text-xs text-[#D4AF37] uppercase font-semibold tracking-wider">
                {expense.category}
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold text-gray-900">
                ₹{parseFloat(expense.amount).toLocaleString()}
              </span>
              <button 
                onClick={() => onDelete(expense.id)}
                className="text-gray-300 hover:text-red-500 transition-colors"
                title="Delete Entry"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}