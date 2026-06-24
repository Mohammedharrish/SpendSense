import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';

export default function AddExpense() {
  const { addExpense, categories, currencySymbol } = useExpenses();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) return;
    
    addExpense({
      amount: parseFloat(amount),
      category,
      date,
      note
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/history');
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '620px', margin: '0 auto' }}>
      {/* Page Header with Banner Image */}
      <div className="glass-card mb-4 flex-between" style={{ padding: '1.5rem 2rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>💸 Add Expense</h1>
          <p className="text-muted">Record a new spending entry</p>
        </div>
        <img
          src="/add_expense_banner.png"
          alt="Add Expense"
          style={{ height: '100px', width: 'auto', objectFit: 'contain', borderRadius: '12px', opacity: 0.9 }}
        />
      </div>
      
      <div className="glass-card">
        {success ? (
          <div className="flex-between text-center" style={{ flexDirection: 'column', padding: '3rem 0', gap: '1.5rem' }}>
            <img
              src="/success_illustration.png"
              alt="Success"
              style={{ height: '140px', width: 'auto', objectFit: 'contain', margin: '0 auto' }}
            />
            <div>
              <h2>🎉 Expense Added!</h2>
              <p className="text-muted" style={{ marginTop: '0.5rem' }}>Redirecting to history...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Amount ({currencySymbol})</label>
              <input 
                type="number" 
                step="0.01" 
                className="form-input" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required 
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-select" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Note (Optional)</label>
              <input 
                type="text" 
                className="form-input" 
                value={note} 
                onChange={(e) => setNote(e.target.value)}
                placeholder="What was this for?"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Save Expense
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
