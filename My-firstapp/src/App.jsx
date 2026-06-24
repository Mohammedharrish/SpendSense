import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import TransactionHistory from './pages/TransactionHistory';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Intelligence from './pages/Intelligence';
import { ExpenseProvider } from './context/ExpenseContext';

function AppLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <div className="app-container" style={{ flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <AppLayout />
      </Router>
    </ExpenseProvider>
  );
}

export default App;
