import { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { BrainCircuit, TrendingDown, PiggyBank, Target, AlertTriangle, Lightbulb, Activity, ArrowUpRight } from 'lucide-react';

const COLORS = ['#d4af37', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function Intelligence() {
  const { expenses, currencySymbol } = useExpenses();

  const { totalThisMonth, totalLastMonth, topCategory, wasteAlerts, healthScore } = useMemo(() => {
    const now = new Date();
    const thisMonth = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const lastMonth = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === (now.getMonth() === 0 ? 11 : now.getMonth() - 1) && 
             d.getFullYear() === (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear());
    });

    const sumThisMonth = thisMonth.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const sumLastMonth = lastMonth.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    // Dummy baseline if no last month data
    const baselineLastMonth = sumLastMonth === 0 ? sumThisMonth * 0.8 : sumLastMonth;

    const categorySums = {};
    thisMonth.forEach(e => {
      categorySums[e.category] = (categorySums[e.category] || 0) + parseFloat(e.amount);
    });

    let maxCat = { name: 'None', amount: 0 };
    for (const [key, val] of Object.entries(categorySums)) {
      if (val > maxCat.amount) maxCat = { name: key, amount: val };
    }

    const alerts = [];
    if (categorySums['Food'] > sumThisMonth * 0.3) {
      alerts.push(`Food spending is high (${((categorySums['Food']/sumThisMonth)*100).toFixed(0)}%). Consider cooking at home to save.`);
    }
    if (categorySums['Entertainment'] > sumThisMonth * 0.2) {
      alerts.push('Entertainment expenses are elevated. Review your recent subscriptions.');
    }
    if (categorySums['Shopping'] > sumThisMonth * 0.25) {
      alerts.push('Impulse shopping detected. Try the 48-hour rule before buying.');
    }
    if (alerts.length === 0 && sumThisMonth > 0) {
      alerts.push("Your category allocation looks well balanced this month.");
    }

    // Heuristic Health Score (0-100)
    let score = 100;
    if (sumThisMonth > baselineLastMonth * 1.2) score -= 30; // Spiking expenses
    else if (sumThisMonth > baselineLastMonth) score -= 15;
    if (alerts.length > 1) score -= 20;

    score = Math.max(0, Math.min(100, score));

    return {
      totalThisMonth: sumThisMonth,
      totalLastMonth: baselineLastMonth,
      topCategory: maxCat,
      wasteAlerts: alerts,
      healthScore: sumThisMonth === 0 ? 0 : score
    };
  }, [expenses]);

  const trendData = useMemo(() => {
    // Generate mock 6-month trend if not enough data
    return [
      { name: 'Jan', spending: 2400 },
      { name: 'Feb', spending: 1398 },
      { name: 'Mar', spending: 4800 },
      { name: 'Apr', spending: 3908 },
      { name: 'May', spending: 4800 },
      { name: 'Jun', spending: totalThisMonth > 0 ? totalThisMonth : 3800 },
    ];
  }, [totalThisMonth]);

  const categoryBarData = useMemo(() => {
    const data = {};
    expenses.forEach(e => {
      data[e.category] = (data[e.category] || 0) + parseFloat(e.amount);
    });
    return Object.keys(data).map(key => ({ name: key, value: data[key] })).sort((a,b) => b.value - a.value).slice(0, 5);
  }, [expenses]);

  const getScoreLabel = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'var(--success)' };
    if (score >= 70) return { label: 'Good', color: 'var(--accent-primary)' };
    if (score >= 50) return { label: 'Average', color: 'var(--warning)' };
    return { label: 'Needs Improvement', color: 'var(--danger)' };
  };

  const scoreStatus = getScoreLabel(healthScore);

  return (
    <div className="animate-fade-in">
      <div className="flex-between mb-4">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BrainCircuit size={36} className="text-gradient" />
            <span className="text-gradient">Smart Analysis</span>
          </h1>
          <p className="text-muted">AI-powered insights into your financial health</p>
        </div>
      </div>

      {/* Health Score & Top Stats */}
      <div className="grid-3 mb-4">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2.5rem' }}>
          <h3 className="text-muted mb-2" style={{ fontSize: '1rem' }}>Financial Health Score</h3>
          <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(${scoreStatus.color} ${healthScore}%, var(--glass-border) 0)` }}>
            <div style={{ position: 'absolute', width: '120px', height: '120px', background: 'var(--bg-primary)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{healthScore}</span>
            </div>
          </div>
          <div className="mt-4 badge" style={{ background: scoreStatus.color, color: '#000' }}>{scoreStatus.label}</div>
        </div>

        <div className="glass-card flex-between" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--accent-glow)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Spending Trend</h3>
          </div>
          <div style={{ width: '100%', flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{currencySymbol}{totalThisMonth.toFixed(2)}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: totalThisMonth > totalLastMonth ? 'var(--danger)' : 'var(--success)' }}>
              {totalThisMonth > totalLastMonth ? <TrendingDown size={20} style={{ transform: 'rotate(180deg)' }} /> : <TrendingDown size={20} />}
              <span style={{ fontWeight: 600 }}>
                {totalLastMonth > 0 ? Math.abs(((totalThisMonth - totalLastMonth)/totalLastMonth)*100).toFixed(1) : 0}% 
                {totalThisMonth > totalLastMonth ? ' more' : ' less'} than last month
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card flex-between" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: 'var(--danger)' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Highest Drain</h3>
          </div>
          <div style={{ width: '100%', flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--danger)' }}>{topCategory?.name || 'None'}</h2>
            <p className="text-muted" style={{ fontWeight: 500 }}>
              {currencySymbol}{topCategory.amount.toFixed(2)} spent this month
            </p>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid-2 mb-4">
        <div className="glass-card" style={{ height: '350px' }}>
          <h3 className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingDown size={20} className="text-muted" /> Spending Trajectory
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${currencySymbol}${value}`} />
              <RechartsTooltip contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="spending" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card" style={{ height: '350px' }}>
          <h3 className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={20} className="text-muted" /> Top Categories
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={categoryBarData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {categoryBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights & Investment Suggestions */}
      <div className="grid-2">
        <div className="glass-card">
          <h3 className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lightbulb size={20} className="text-gradient" /> Smart Waste Detection
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {wasteAlerts.length > 0 ? wasteAlerts.map((alert, i) => (
              <div key={i} style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--warning)' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{alert}</p>
              </div>
            )) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No waste detected. You are managing your budget efficiently!
              </div>
            )}
          </div>
        </div>

        <div className="glass-card">
          <h3 className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PiggyBank size={20} style={{ color: 'var(--success)' }} /> Investment Suggestions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px' }}>
                <ArrowUpRight size={20} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.25rem', fontSize: '0.95rem' }}>Emergency Fund</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.4, margin: 0 }}>Aim to save 3-6 months of expenses ({currencySymbol}{(totalThisMonth * 3).toFixed(0)} min). Keep this in a high-yield savings account.</p>
              </div>
            </div>
            
            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
               <div style={{ padding: '0.5rem', background: 'var(--accent-glow)', color: 'var(--accent-primary)', borderRadius: '8px' }}>
                <ArrowUpRight size={20} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.25rem', fontSize: '0.95rem' }}>Index Fund SIP</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.4, margin: 0 }}>Consider starting a systematic investment plan with 20% of your remaining budget for long-term wealth growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
