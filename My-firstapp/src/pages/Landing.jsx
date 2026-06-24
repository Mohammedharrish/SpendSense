import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, PieChart, Brain, Shield, ChevronDown, ArrowRight, CheckCircle2, Star } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const features = [
    { icon: <Wallet size={24} />, title: "Expense Tracking", desc: "Log and categorize every transaction effortlessly." },
    { icon: <TrendingUp size={24} />, title: "Smart Analytics", desc: "Visualize your spending patterns with beautiful charts." },
    { icon: <PieChart size={24} />, title: "Budget Planning", desc: "Set limits and get alerts before you overspend." },
    { icon: <Brain size={24} />, title: "AI Suggestions", desc: "Get intelligent insights to optimize your savings." },
    { icon: <TrendingUp size={24} />, title: "Investment Insights", desc: "Learn how to grow your wealth systematically." },
    { icon: <Shield size={24} />, title: "Bank-grade Security", desc: "Your financial data is encrypted and secure." }
  ];

  const faqs = [
    { q: "Is SpendSense completely free?", a: "We offer a generous free tier with core expense tracking. Premium features like AI suggestions are available on the Pro plan." },
    { q: "Can I connect my bank account?", a: "Currently, SpendSense is a manual tracker focusing on privacy. Auto-sync is planned for our V2 release." },
    { q: "How are the AI insights generated?", a: "Our algorithm analyzes your spending patterns locally to find anomalies and savings opportunities without sharing data." },
    { q: "Is my financial data secure?", a: "Yes, we use industry-standard encryption and prioritize user privacy above all." }
  ];

  const floatingSymbols = ['$', '€', '£', '₹', '¥', '%', '📈', '💰'];

  return (
    <div style={{ width: '100vw', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Sticky Navbar */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
        padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        transition: 'all var(--transition-normal)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: 'var(--accent-glow)', filter: 'blur(8px)' }}></div>
            <Wallet color="var(--accent-primary)" size={28} style={{ position: 'relative', zIndex: 1 }} />
          </div>
          <span className="text-gradient">SpendSense</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color='var(--text-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Features</a>
          <a href="#stats" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color='var(--text-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Stats</a>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Enter App <ArrowRight size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 4rem', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'hidden' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="floating-money"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 15}s`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${1.5 + Math.random() * 2.5}rem`,
                textShadow: '0 0 15px var(--accent-glow)'
              }}
            >
              {floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)]}
            </div>
          ))}
          <img src="/landing_hero_bg.png" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 1, maxWidth: '800px', marginTop: '4rem' }} className="animate-fade-in">
          <div className="badge badge-primary mb-4" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>✨ The Next Generation of Finance</div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
            Master your money with <span className="text-gradient">Intelligence</span>.
          </h1>
          <p className="text-secondary" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
            A premium, AI-driven financial dashboard designed to help you track expenses, detect money waste, and grow your wealth effortlessly.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={() => navigate('/dashboard')}>
              Get Started Free <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              View Features
            </button>
          </div>
          
          {/* Dashboard Preview Mockup */}
          <div className="glass-card animate-slide-right delay-200" style={{ marginTop: '4rem', padding: '0.5rem', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '1000px', transform: 'perspective(1000px) rotateX(5deg)' }}>
            <img src="/dashboard_preview.png" alt="Dashboard Preview" style={{ width: '100%', borderRadius: 'calc(var(--radius-xl) - 0.5rem)', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '8rem 4rem', background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Everything you need to succeed</h2>
          <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Powerful tools wrapped in a beautiful, intuitive interface.</p>
        </div>
        <div className="grid-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {features.map((feature, i) => (
            <div key={i} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
              <p className="text-secondary" style={{ lineHeight: 1.5 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" style={{ padding: '6rem 4rem', background: 'linear-gradient(to right, rgba(212,175,55,0.05), rgba(0,0,0,0))' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: 700, margin: 0 }}>Track and save your expenses</h2>
        </div>
      </section>



      {/* FAQ Section */}
      <section style={{ padding: '8rem 4rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => toggleFaq(i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: 0 }}>{faq.q}</h3>
                  <ChevronDown size={20} style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform var(--transition-fast)' }} />
                </div>
                {activeFaq === i && (
                  <div style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }} className="animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem', background: 'var(--bg-primary)', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <Wallet color="var(--accent-primary)" size={24} />
            <span className="text-gradient">SpendSense</span>
          </div>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>© 2026 SpendSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
