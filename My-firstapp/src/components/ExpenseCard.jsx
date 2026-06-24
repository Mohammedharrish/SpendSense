import { ArrowDownRight, Trash2 } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseCard({ expense }) {
  const { deleteExpense, currencySymbol } = useExpenses();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="glass-card flex-between mb-2">
      <div className="flex-between" style={{ gap: '1rem' }}>
        <div 
          style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            padding: '0.75rem', 
            borderRadius: 'var(--radius-full)',
            color: 'var(--danger)'
          }}
        >
          <ArrowDownRight size={20} />
        </div>
        <div>
          <h4 style={{ marginBottom: '0.25rem' }}>{expense.category}</h4>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>{expense.note}</p>
        </div>
      </div>
      
      <div className="text-right">
        <h4 className="text-gradient" style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>
          {currencySymbol}{parseFloat(expense.amount).toFixed(2)}
        </h4>
        <div className="flex-between" style={{ gap: '1rem' }}>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>{formatDate(expense.date)}</p>
          <button 
            className="btn-danger" 
            style={{ padding: '0.25rem', border: 'none', background: 'transparent' }}
            onClick={() => deleteExpense(expense.id)}
            title="Delete Expense"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
