import { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseCard from '../components/ExpenseCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Wallet, TrendingDown, Calendar } from 'lucide-react';

const COLORS = ['#ffffff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function Dashboard() {
  const { expenses, currencySymbol } = useExpenses();

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  }, [expenses]);

  const thisMonthExpenses = useMemo(() => {
    const now = new Date();
    return expenses.filter(e => {
      const date = new Date(e.date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).reduce((sum, item) => sum + parseFloat(item.amount), 0);
  }, [expenses]);

  const categoryData = useMemo(() => {
    const data = {};
    expenses.forEach(e => {
      data[e.category] = (data[e.category] || 0) + parseFloat(e.amount);
    });
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, [expenses]);

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <div className="glass-card mb-4 flex-between" style={{ padding: '1.5rem 2rem', overflow: 'hidden', position: 'relative' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>📊 Dashboard</h1>
          <p className="text-muted">Track your daily spending at a glance</p>
        </div>
        <img
          src="/dashboard_hero.png"
          alt="Finance Dashboard"
          style={{ height: '110px', width: 'auto', objectFit: 'contain', opacity: 0.9, borderRadius: '12px' }}
        />
      </div>

      <div className="grid-3 mb-4">
        <div className="glass-card flex-between">
          <div>
            <p className="text-muted mb-1">Total Expenses 💰</p>
            <h2 className="text-gradient">{currencySymbol}{totalExpenses.toFixed(2)}</h2>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-primary)' }}>
            <Wallet size={24} />
          </div>
        </div>
        
        <div className="glass-card flex-between">
          <div>
            <p className="text-muted mb-1">This Month 📅</p>
            <h2 className="text-gradient">{currencySymbol}{thisMonthExpenses.toFixed(2)}</h2>
          </div>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: 'var(--radius-full)', color: 'var(--success)' }}>
            <Calendar size={24} />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <p className="text-muted mb-1">Transactions 📉</p>
            <h2 className="text-gradient">{expenses.length}</h2>
          </div>
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: 'var(--radius-full)', color: 'var(--danger)' }}>
            <TrendingDown size={24} />
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="glass-card" style={{ height: '400px' }}>
          <h3 className="mb-3">🍕 Expenses by Category</h3>
          {expenses.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', gap: '1rem' }}>
              <img src="/empty_state.png" alt="No data" style={{ height: '120px', opacity: 0.7 }} />
              <p className="text-muted">No data to display yet</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-3">🕒 Recent Transactions</h3>
          {recentExpenses.length > 0 ? (
            recentExpenses.map(expense => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          ) : (
            <div className="glass-card text-center" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <img src="/empty_state.png" alt="No transactions" style={{ height: '100px', opacity: 0.6 }} />
              <p className="text-muted">No recent transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
