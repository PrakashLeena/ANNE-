import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { selected } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const navLinks = [
    { to: '/#components', label: 'Components' },
    { to: '/builder',     label: 'Builder' },
    { to: '/#packages',   label: 'Packages' },
    { to: '/community',   label: 'Community' },
    { to: '/contact',     label: 'Contact' },
  ];

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(9,19,40,0.95)' : '#091328',
        borderBottom: '1px solid rgba(64,72,93,0.15)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all .3s',
      }}>
        <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 32px', maxWidth:'1280px', margin:'0 auto' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration:'none' }}>
            <span className="pg-txt" style={{ fontSize:'1.3rem', fontWeight:700, letterSpacing:'-.04em' }}>Anne</span>
          </Link>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display:'flex', gap:'24px', alignItems:'center' }}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                color: location.pathname === l.to ? 'var(--primary)' : 'var(--on-surface-var)',
                fontSize:'.875rem', textDecoration:'none', fontWeight:500,
                transition:'color .2s',
                borderBottom: location.pathname === l.to ? '1.5px solid var(--primary)' : 'none',
                paddingBottom:'2px',
              }}
                onMouseEnter={e => e.target.style.color='var(--primary)'}
                onMouseLeave={e => e.target.style.color = location.pathname === l.to ? 'var(--primary)' : 'var(--on-surface-var)'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hide-mobile" style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            {selected.size > 0 && (
              <Link to="/cart" style={{ position:'relative', textDecoration:'none' }}>
                <span style={{ fontSize:'1.2rem' }}>🛒</span>
                <span style={{ position:'absolute', top:'-6px', right:'-6px', width:'16px', height:'16px', borderRadius:'50%', background:'var(--primary)', color:'#000', fontSize:'.5rem', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{selected.size}</span>
              </Link>
            )}
            {user ? (
              <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                {isAdmin && <Link to="/admin" className="btn-outline" style={{ padding:'8px 16px', fontSize:'.78rem', textDecoration:'none', borderRadius:'9999px', color:'var(--secondary)', border:'1px solid rgba(83,221,252,.3)' }}>Admin</Link>}
                <Link to="/profile" style={{ textDecoration:'none' }}>
                  <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#ba9eff,#8455ef)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#000', fontSize:'.85rem' }}>
                    {(user.displayName || user.email)?.[0]?.toUpperCase()}
                  </div>
                </Link>
                <button onClick={handleLogout} className="btn-outline" style={{ padding:'8px 16px', fontSize:'.78rem' }}>Logout</button>
              </div>
            ) : (
              <div style={{ display:'flex', gap:'8px' }}>
                <Link to="/login" className="btn-outline" style={{ padding:'9px 20px', fontSize:'.85rem', textDecoration:'none' }}>Login</Link>
                <Link to="/signup" className="btn-primary" style={{ padding:'9px 20px', fontSize:'.85rem', textDecoration:'none' }}>Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display:'none', background:'none', border:'none', color:'var(--on-surface)', fontSize:'1.5rem', cursor:'pointer' }} className="show-mobile">☰</button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background:'var(--surface-low)', padding:'16px 24px', borderTop:'1px solid rgba(64,72,93,.15)', display:'flex', flexDirection:'column', gap:'12px' }}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{ color:'var(--on-surface-var)', textDecoration:'none', fontSize:'.9rem', fontWeight:500 }}>{l.label}</Link>
            ))}
            <div style={{ display:'flex', gap:'8px', paddingTop:'8px', borderTop:'1px solid rgba(64,72,93,.15)' }}>
              {user ? (
                <button onClick={handleLogout} className="btn-outline" style={{ padding:'9px 20px', fontSize:'.85rem', width:'100%' }}>Logout</button>
              ) : (
                <>
                  <Link to="/login" className="btn-outline" style={{ padding:'9px 20px', fontSize:'.85rem', textDecoration:'none', flex:1, textAlign:'center' }}>Login</Link>
                  <Link to="/signup" className="btn-primary" style={{ padding:'9px 20px', fontSize:'.85rem', textDecoration:'none', flex:1, textAlign:'center' }}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom nav */}
      <div style={{ display:'none', position:'fixed', bottom:0, left:0, width:'100%', zIndex:50, background:'rgba(20,31,56,.85)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(222,229,255,.08)', justifyContent:'space-around', padding:'10px 14px' }} className="mobile-bottom-nav">
        <Link to="/" style={{ display:'flex', flexDirection:'column', alignItems:'center', color:'var(--outline)', textDecoration:'none', fontSize:'.6rem', gap:3 }}><span>🏠</span>Home</Link>
        <Link to="/builder" style={{ display:'flex', flexDirection:'column', alignItems:'center', color:'var(--primary)', textDecoration:'none', fontSize:'.6rem', gap:3 }}><span>🔧</span>Build</Link>
        <Link to="/community" style={{ display:'flex', flexDirection:'column', alignItems:'center', color:'var(--outline)', textDecoration:'none', fontSize:'.6rem', gap:3 }}><span>💬</span>Community</Link>
        <Link to="/profile" style={{ display:'flex', flexDirection:'column', alignItems:'center', color:'var(--outline)', textDecoration:'none', fontSize:'.6rem', gap:3 }}><span>👤</span>Profile</Link>
      </div>
    </>
  );
}
