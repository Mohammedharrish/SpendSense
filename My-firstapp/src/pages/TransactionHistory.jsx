import { useState, useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseCard from '../components/ExpenseCard';
import { Search, Filter } from 'lucide-react';

export default function TransactionHistory() {
  const { expenses, categories } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, amount-desc, amount-asc

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter(e => filterCategory === 'All' || e.category === filterCategory)
      .filter(e => 
        e.note.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [expenses, searchTerm, filterCategory, sortBy]);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="glass-card mb-4 flex-between" style={{ padding: '1.5rem 2rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>📜 Transaction History</h1>
          <p className="text-muted">Browse and filter all your expenses</p>
        </div>
        <img
          src="/dashboard_hero.png"
          alt="History"
          style={{ height: '100px', width: 'auto', objectFit: 'contain', borderRadius: '12px', opacity: 0.85 }}
        />
      </div>

      <div className="glass-card mb-4">
        <div className="grid-3">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Search</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search notes or category..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Category</label>
            <select 
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Sort By</label>
            <select 
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))
        ) : (
          <div className="glass-card text-center" style={{ padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <img src="/empty_state.png" alt="No transactions found" style={{ height: '120px', opacity: 0.6 }} />
            <p className="text-muted">No transactions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
