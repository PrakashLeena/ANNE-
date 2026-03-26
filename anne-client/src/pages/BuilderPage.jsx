import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COMPS, CATS } from '../data/components';
import { getPreviewHTML, PREVIEW_STYLES } from '../data/previews';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

function CompCard({ comp }) {
  const { isSelected, toggle } = useCart();
  const sel = isSelected(comp.id);
  return (
    <div className={`cc ${sel ? 'sel' : ''}`} style={{ display:'flex', flexDirection:'column' }}>
      <div style={{ height:170, background:'#000', position:'relative', overflow:'hidden' }}>
        <style>{PREVIEW_STYLES}</style>
        <div style={{ width:'100%', height:'100%' }} dangerouslySetInnerHTML={{ __html: getPreviewHTML(comp.pv) }} />
      </div>
      <div style={{ padding:'13px', flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:5 }}>
          <div style={{ fontSize:'.85rem', fontWeight:600, color:'var(--on-surface)' }}>{comp.name}</div>
          <span style={{ fontSize:'.55rem', textTransform:'uppercase', background:'rgba(186,158,255,.09)', color:'var(--primary)', padding:'2px 7px', borderRadius:'9999px', whiteSpace:'nowrap', marginLeft:7, flexShrink:0 }}>{comp.tag}</span>
        </div>
        <div style={{ fontSize:'.72rem', color:'var(--outline)', lineHeight:1.5, marginBottom:10, flex:1 }}>{comp.desc}</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontWeight:700, color:'var(--primary)', fontSize:'.85rem' }}>+${comp.price}</span>
          <button onClick={() => toggle(comp.id)} style={{ background: sel ? 'rgba(83,221,252,.1)' : 'rgba(186,158,255,.09)', color: sel ? 'var(--secondary)' : 'var(--primary)', border: sel ? '1px solid rgba(83,221,252,.25)' : '1px solid rgba(186,158,255,.2)', padding:'5px 13px', borderRadius:'9999px', fontSize:'.72rem', fontWeight:600, cursor:'pointer', transition:'all .2s', fontFamily:'Inter' }}>
            {sel ? '✓ Added' : '✦ Select'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const { selected, remove, clear, BASE_PRICE, SETUP_FEE } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const compTotal = [...selected].reduce((acc, id) => {
    const c = COMPS.find(x => x.id === id);
    return acc + (c?.price || 0);
  }, 0);
  const total = BASE_PRICE + compTotal + SETUP_FEE;

  const filteredComps = activeTab === 'all' ? COMPS : COMPS.filter(c => c.cat === activeTab);

  const handleSubmit = async () => {
    if (selected.size === 0) return alert('Select at least one component.');
    const contactEmail = email || user?.email;
    if (!contactEmail) return alert('Please enter your email.');
    try {
      setSubmitting(true);
      const components = [...selected].map(id => {
        const c = COMPS.find(x => x.id === id);
        return { id, name: c?.name, price: c?.price };
      });
      await api.post('/api/orders', { components, totalPrice: total, notes, contactEmail });
      setSubmitted(true);
      clear();
    } catch (e) {
      alert('Order failed. Please try again or contact us directly.');
    } finally { setSubmitting(false); }
  };

  if (submitted) return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:20, padding:'40px 24px', textAlign:'center' }}>
      <div style={{ fontSize:'4rem' }}>🎉</div>
      <h2 style={{ fontSize:'2rem', fontWeight:700 }}>Order Submitted!</h2>
      <p style={{ color:'var(--outline)', maxWidth:400 }}>We'll send you a full proposal within 24 hours. Check your email for confirmation.</p>
      <Link to="/profile" className="btn-primary" style={{ textDecoration:'none', marginTop:10 }}>View Order History →</Link>
    </div>
  );

  return (
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'56px 32px' }}>
      <div style={{ marginBottom:36 }}>
        <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:9 }}>Package Builder</div>
        <h1 style={{ fontSize:'clamp(1.5rem,2.8vw,2rem)', fontWeight:700, letterSpacing:'-.02em', marginBottom:6 }}>Design Your Website</h1>
        <p style={{ color:'var(--outline)', fontSize:'.85rem' }}>Select components below. We'll build and ship a full proposal within 24 hrs.</p>
      </div>

      {/* Category tabs */}
      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:32 }}>
        {[{ k:'all', l:`All (${COMPS.length})` }, ...CATS.map(c => ({ k:c.k, l:c.l }))].map(tab => (
          <button key={tab.k} className={`tp ${activeTab === tab.k ? 'on' : ''}`} onClick={() => setActiveTab(tab.k)}>{tab.l}</button>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:28, alignItems:'start' }}>
        {/* Component grid */}
        <div style={{ display:'flex', flexDirection:'column', gap:36 }}>
          {activeTab === 'all' ? (
            CATS.map(cat => {
              const comps = COMPS.filter(c => c.cat === cat.k);
              return (
                <div key={cat.k}>
                  <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:16 }}>
                    <div style={{ width:32, height:32, borderRadius:'.5rem', background:'rgba(186,158,255,.09)', border:'1px solid rgba(186,158,255,.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.95rem' }}>{cat.i}</div>
                    <span style={{ fontSize:'.95rem', fontWeight:600, color:'var(--on-surface)' }}>{cat.l}</span>
                    <span style={{ fontSize:'.68rem', color:'var(--outline)', background:'var(--surface-high)', padding:'2px 9px', borderRadius:'9999px' }}>{comps.length} styles</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:12 }}>
                    {comps.map(c => <CompCard key={c.id} comp={c} />)}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:12 }}>
              {filteredComps.map(c => <CompCard key={c.id} comp={c} />)}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar-sticky">
          <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:4 }}>Your Package</div>
          <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--on-surface)', marginBottom:18 }}>Selected Components</div>

          {selected.size === 0 ? (
            <div style={{ textAlign:'center', color:'var(--outline)', fontSize:'.78rem', padding:'16px 0' }}>No components yet.<br />Click ✦ to add.</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              {[...selected].map(id => {
                const c = COMPS.find(x => x.id === id);
                if (!c) return null;
                return (
                  <div key={id} style={{ background:'rgba(186,158,255,.07)', border:'1px solid rgba(186,158,255,.18)', borderRadius:'.5rem', padding:'9px 13px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'.78rem' }}>
                    <span style={{ fontWeight:500, color:'var(--on-surface)' }}>{c.name}</span>
                    <button onClick={() => remove(id)} style={{ background:'none', border:'none', color:'var(--outline)', cursor:'pointer', fontSize:'.85rem', transition:'color .2s' }}
                      onMouseEnter={e => e.target.style.color='var(--error)'}
                      onMouseLeave={e => e.target.style.color='var(--outline)'}
                    >✕</button>
                  </div>
                );
              })}
            </div>
          )}

          {selected.size > 0 && (
            <div style={{ marginTop:18, paddingTop:18, borderTop:'1px solid rgba(64,72,93,.2)' }}>
              {[['Base website', `$${BASE_PRICE}`], [`Components (${selected.size})`, `$${compTotal}`], ['Setup & Deploy', `$${SETUP_FEE}`]].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:'.78rem', color:'var(--outline)', marginBottom:6 }}><span>{k}</span><span>{v}</span></div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.95rem', fontWeight:700, color:'var(--on-surface)', marginTop:10, paddingTop:10, borderTop:'1px solid rgba(64,72,93,.2)' }}>
                <span>Total</span><span>${total}</span>
              </div>
            </div>
          )}

          {!user && (
            <input style={{ width:'100%', background:'#141f38', border:'none', borderBottom:'1.5px solid var(--outline)', borderRadius:'.5rem .5rem 0 0', padding:'11px 14px', color:'var(--on-surface)', fontFamily:'Inter', fontSize:'.8rem', outline:'none', marginTop:14 }}
              type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
          )}
          <textarea style={{ width:'100%', background:'#141f38', border:'none', borderBottom:'1.5px solid var(--outline)', borderRadius:'.5rem .5rem 0 0', padding:'11px 14px', color:'var(--on-surface)', fontFamily:'Inter', fontSize:'.8rem', outline:'none', marginTop:10, resize:'vertical', minHeight:72 }}
            placeholder="Notes / requirements (optional)" value={notes} onChange={e => setNotes(e.target.value)} />

          <button onClick={handleSubmit} className="btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:14, opacity: submitting ? .7 : 1 }} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Get Free Quote →'}
          </button>
          <p style={{ fontSize:'.65rem', color:'var(--outline)', textAlign:'center', marginTop:9 }}>No commitment — full proposal sent within 24 hrs.</p>
        </div>
      </div>
    </div>
  );
}
