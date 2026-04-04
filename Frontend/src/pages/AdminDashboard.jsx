import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const STATUS_OPTIONS = ['pending','in-progress','completed','cancelled'];
const STATUS_COLORS = {
  pending:     { bg:'rgba(247,151,30,.1)',   color:'#f7971e' },
  'in-progress':{ bg:'rgba(83,221,252,.1)',  color:'#53ddfc' },
  completed:   { bg:'rgba(67,233,123,.1)',   color:'#43e97b' },
  cancelled:   { bg:'rgba(255,110,132,.1)',  color:'#ff6e84' },
};

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user && !isAdmin) { navigate('/'); return; }
  }, [user, isAdmin]);

  useEffect(() => {
    api.get('/admin/orders').then(r => setOrders(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (e) { alert('Failed to update status.'); }
  };

  const revenue = orders.filter(o => o.status === 'completed').reduce((a, o) => a + o.totalPrice, 0);
  const stats = [
    { label:'Total Orders', val: orders.length, icon:'📋', color:'var(--primary)' },
    { label:'In Progress', val: orders.filter(o => o.status === 'in-progress').length, icon:'⚡', color:'var(--secondary)' },
    { label:'Completed', val: orders.filter(o => o.status === 'completed').length, icon:'✅', color:'#43e97b' },
    { label:'Revenue', val: `$${revenue}`, icon:'💰', color:'#f7971e' },
  ];

  return (
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 32px' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
        <div>
          <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:6 }}>Admin Panel</div>
          <h1 style={{ fontSize:'1.6rem', fontWeight:700 }}>Dashboard</h1>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#ba9eff,#8455ef)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#000' }}>
            {user?.displayName?.[0] || 'A'}
          </div>
          <div>
            <div style={{ fontSize:'.85rem', fontWeight:600 }}>{user?.displayName}</div>
            <div style={{ fontSize:'.65rem', color:'var(--secondary)' }}>Admin</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'20px 24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <div style={{ fontSize:'1.5rem' }}>{s.icon}</div>
            </div>
            <div style={{ fontSize:'1.8rem', fontWeight:700, color:s.color, marginBottom:4 }}>{s.val}</div>
            <div style={{ fontSize:'.72rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.06em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:5, marginBottom:24 }}>
        {['orders','analytics'].map(tab => (
          <button key={tab} className={`tp ${activeTab === tab ? 'on' : ''}`} onClick={() => setActiveTab(tab)} style={{ textTransform:'capitalize' }}>{tab}</button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2 style={{ fontSize:'1rem', fontWeight:700, marginBottom:16 }}>All Orders</h2>
          {loading ? (
            <div style={{ textAlign:'center', padding:40, color:'var(--outline)' }}>Loading orders…</div>
          ) : orders.length === 0 ? (
            <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:40, textAlign:'center', color:'var(--outline)' }}>No orders yet.</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {orders.map(order => {
                const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                return (
                  <div key={order._id} style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'20px 24px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:14 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                          <div style={{ fontSize:'.85rem', fontWeight:600 }}>Order #{order._id?.slice(-8).toUpperCase()}</div>
                          <span style={{ background:sc.bg, color:sc.color, fontSize:'.65rem', padding:'2px 9px', borderRadius:'9999px', fontWeight:600 }}>{order.status}</span>
                        </div>
                        <div style={{ fontSize:'.78rem', color:'var(--outline)', marginBottom:8 }}>📧 {order.contactEmail} • {new Date(order.createdAt).toLocaleDateString()}</div>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:8 }}>
                          {order.components?.map(c => (
                            <span key={c.id} style={{ background:'rgba(186,158,255,.07)', color:'var(--primary)', fontSize:'.62rem', padding:'2px 8px', borderRadius:'9999px' }}>{c.name}</span>
                          ))}
                        </div>
                        {order.notes && <div style={{ fontSize:'.75rem', color:'var(--outline)', fontStyle:'italic', background:'var(--surface-high)', borderRadius:'.5rem', padding:'8px 12px', borderLeft:'2px solid var(--outline-var)' }}>{order.notes}</div>}
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'flex-end' }}>
                        <div style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--primary)' }}>${order.totalPrice}</div>
                        <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}
                          style={{ background:'var(--surface-high)', color:'var(--on-surface)', border:'1px solid rgba(64,72,93,.3)', borderRadius:'.5rem', padding:'6px 12px', fontFamily:'Inter', fontSize:'.75rem', cursor:'pointer', outline:'none' }}>
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'24px' }}>
            <h3 style={{ fontSize:'.95rem', fontWeight:700, marginBottom:16 }}>Orders by Status</h3>
            {STATUS_OPTIONS.map(s => {
              const count = orders.filter(o => o.status === s).length;
              const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
              const sc = STATUS_COLORS[s];
              return (
                <div key={s} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.78rem', marginBottom:5 }}>
                    <span style={{ color:'var(--on-surface-var)', textTransform:'capitalize' }}>{s}</span>
                    <span style={{ color:sc.color }}>{count}</span>
                  </div>
                  <div style={{ height:6, background:'var(--surface-high)', borderRadius:'9999px', overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:sc.color, borderRadius:'9999px', transition:'width .8s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'24px' }}>
            <h3 style={{ fontSize:'.95rem', fontWeight:700, marginBottom:16 }}>Revenue Summary</h3>
            {[
              { label:'Total Revenue', val:`$${orders.reduce((a,o)=>a+o.totalPrice,0)}`, color:'var(--on-surface)' },
              { label:'Collected (Completed)', val:`$${revenue}`, color:'#43e97b' },
              { label:'Pending Revenue', val:`$${orders.filter(o=>o.status==='pending').reduce((a,o)=>a+o.totalPrice,0)}`, color:'#f7971e' },
              { label:'Avg Order Value', val: orders.length ? `$${Math.round(orders.reduce((a,o)=>a+o.totalPrice,0)/orders.length)}` : '$0', color:'var(--primary)' },
            ].map(r => (
              <div key={r.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid rgba(64,72,93,.2)' }}>
                <span style={{ fontSize:'.82rem', color:'var(--outline)' }}>{r.label}</span>
                <span style={{ fontSize:'1rem', fontWeight:700, color:r.color }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
