import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';

const STATUS_COLORS = {
  pending:     { bg:'rgba(247,151,30,.1)',  color:'#f7971e', label:'Pending' },
  'in-progress':{ bg:'rgba(255,176,0,.12)', color:'var(--secondary)', label:'In Progress' },
  completed:   { bg:'rgba(67,233,123,.1)',  color:'#43e97b', label:'Completed' },
  cancelled:   { bg:'rgba(255,110,132,.1)', color:'#ff6e84', label:'Cancelled' },
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/orders/mine').then(r => setOrders(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => { await logout(); navigate('/'); };

  if (!user) return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <p style={{ color:'var(--outline)' }}>Please log in to view your profile.</p>
      <Link to="/login" className="btn-primary" style={{ textDecoration:'none' }}>Sign In →</Link>
    </div>
  );

  return (
    <div style={{ maxWidth:1000, margin:'0 auto', padding:'56px 32px' }}>
      {/* Profile header */}
      <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'32px', marginBottom:28, display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary),var(--primary-dim))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#000', fontSize:'1.8rem', flexShrink:0 }}>
          {(user.displayName || user.email)?.[0]?.toUpperCase()}
        </div>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:'1.4rem', fontWeight:700, marginBottom:4 }}>{user.displayName || 'User'}</h1>
          <p style={{ color:'var(--outline)', fontSize:'.85rem' }}>{user.email}</p>
          <p style={{ color:'var(--outline)', fontSize:'.72rem', marginTop:4 }}>Member since {new Date(user.metadata?.creationTime).toLocaleDateString('en-US', { month:'long', year:'numeric' })}</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Link to="/builder" className="btn-primary" style={{ textDecoration:'none', padding:'10px 20px' }}>New Order</Link>
          <button className="btn-outline" onClick={handleLogout} style={{ padding:'10px 20px' }}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:32 }}>
        {[
          { label:'Total Orders', value: orders.length },
          { label:'In Progress', value: orders.filter(o => o.status === 'in-progress').length },
          { label:'Completed', value: orders.filter(o => o.status === 'completed').length },
        ].map(s => (
          <div key={s.label} style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'20px 24px' }}>
            <div style={{ fontSize:'2rem', fontWeight:700, color:'var(--primary)', marginBottom:4 }}>{s.value}</div>
            <div style={{ fontSize:'.75rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.06em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Orders */}
      <div>
        <h2 style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:18 }}>Order History</h2>
        {loading ? (
          <div style={{ textAlign:'center', padding:40, color:'var(--outline)' }}>Loading orders…</div>
        ) : orders.length === 0 ? (
          <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'40px', textAlign:'center' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:14 }}>📋</div>
            <p style={{ color:'var(--outline)', marginBottom:16 }}>No orders yet. Start building your website!</p>
            <Link to="/builder" className="btn-primary" style={{ textDecoration:'none' }}>Start Building →</Link>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {orders.map(order => {
              const s = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
              return (
                <div key={order._id} style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'20px 24px', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                      <div style={{ fontSize:'.85rem', fontWeight:600, color:'var(--on-surface)' }}>
                        Order #{order._id?.slice(-8).toUpperCase()}
                      </div>
                      <span style={{ background:s.bg, color:s.color, fontSize:'.65rem', fontWeight:600, padding:'2px 10px', borderRadius:'9999px', textTransform:'uppercase', letterSpacing:'.06em' }}>{s.label}</span>
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:8 }}>
                      {order.components?.slice(0, 4).map(c => (
                        <span key={c.id} style={{ background:'rgba(255,122,0,.09)', color:'var(--primary)', fontSize:'.65rem', padding:'2px 8px', borderRadius:'9999px' }}>{c.name}</span>
                      ))}
                      {order.components?.length > 4 && <span style={{ background:'rgba(255,122,0,.09)', color:'var(--outline)', fontSize:'.65rem', padding:'2px 8px', borderRadius:'9999px' }}>+{order.components.length - 4} more</span>}
                    </div>
                    <div style={{ fontSize:'.72rem', color:'var(--outline)' }}>Submitted {new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--primary)' }}>${order.totalPrice}</div>
                    <div style={{ fontSize:'.65rem', color:'var(--outline)', marginTop:2 }}>Total</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
