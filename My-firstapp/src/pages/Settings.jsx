import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Trash2, Plus } from 'lucide-react';

export default function Settings() {
  const { categories, addCategory, deleteCategory, theme, setTheme, currency, setCurrency } = useExpenses();
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="page-title">⚙️ Settings</h1>

      <div className="glass-card mb-4">
        <h2 className="mb-3">🗂️ Manage Categories</h2>
        
        <form onSubmit={handleAddCategory} className="flex-between mb-4" style={{ gap: '1rem' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="New Category Name" 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={!newCategory.trim()}>
            <Plus size={20} />
            <span>Add</span>
          </button>
        </form>

        <div className="grid-2">
          {categories.map(cat => (
            <div key={cat} className="flex-between" style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
              <span>{cat}</span>
              <button 
                className="btn-danger" 
                style={{ padding: '0.25rem', border: 'none', background: 'transparent' }}
                onClick={() => deleteCategory(cat)}
                title="Delete Category"
                disabled={categories.length <= 1} // Prevent deleting the last category
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <h2 className="mb-3">🛠️ Preferences</h2>
        <div className="form-group">
          <label className="form-label">Currency</label>
          <select 
            className="form-select" 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
        
        <div className="form-group mt-4">
          <label className="form-label">Theme</label>
          <div className="flex-between" style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            <div 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ 
                width: '40px', 
                height: '20px', 
                backgroundColor: theme === 'dark' ? 'var(--accent-primary)' : '#ccc', 
                borderRadius: 'var(--radius-full)', 
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                right: theme === 'dark' ? '2px' : 'auto', 
                left: theme === 'dark' ? 'auto' : '2px',
                top: '2px', 
                width: '16px', 
                height: '16px', 
                backgroundColor: 'white', 
                borderRadius: '50%',
                transition: 'all 0.3s'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
