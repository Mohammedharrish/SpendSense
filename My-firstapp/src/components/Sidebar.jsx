import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, History, Settings, Wallet, LineChart, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="sidebar animate-slide-right">
      <div className="sidebar-logo">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-glow)', filter: 'blur(8px)' }}></div>
          <Wallet color="var(--accent-primary)" size={28} style={{ position: 'relative', zIndex: 1 }} />
        </div>
        <span className="text-gradient" style={{ letterSpacing: '-0.03em' }}>SpendSense</span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/intelligence" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LineChart size={20} />
          <span>Intelligence</span>
          <div className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>NEW</div>
        </NavLink>
        
        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>
        
        <NavLink to="/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <PlusCircle size={20} />
          <span>Add Expense</span>
        </NavLink>
        
        <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <History size={20} />
          <span>History</span>
        </NavLink>
        
        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>
        
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>

    </div>
  );
}
