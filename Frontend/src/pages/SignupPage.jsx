import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const inputStyle = { width:'100%', background:'#141f38', border:'none', borderBottom:'1.5px solid var(--outline)', borderRadius:'.5rem .5rem 0 0', padding:'14px 16px', color:'var(--on-surface)', fontFamily:'Inter', fontSize:'.9rem', outline:'none' };

export default function SignupPage() {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [pass, setPass]     = useState('');
  const [err, setErr]       = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!name.trim()) return setErr('Name is required.');
    if (pass.length < 6) return setErr('Password must be at least 6 characters.');
    try {
      setLoading(true);
      await signup(name.trim(), email, pass);
      navigate('/builder');
    } catch (e) {
      setErr(e.message?.replace('Firebase: ', '') || 'Signup failed.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'90vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div style={{ background:'var(--surface-container)', borderRadius:'1.25rem', padding:'40px 36px', width:'100%', maxWidth:420, position:'relative', overflow:'hidden' }}>
        {/* glow */}
        <div style={{ position:'absolute', top:-80, right:-80, width:200, height:200, borderRadius:'50%', background:'rgba(186,158,255,.08)', filter:'blur(50px)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="pg-txt" style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:4 }}>Create Account</div>
          <p style={{ color:'var(--outline)', fontSize:'.82rem', marginBottom:28 }}>Join Anne and start building dream websites.</p>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <input style={inputStyle} type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
            <input style={inputStyle} type="password" placeholder="Password (6+ chars)" value={pass} onChange={e => setPass(e.target.value)} required />
            {err && <div style={{ fontSize:'.78rem', color:'var(--error)', background:'rgba(255,110,132,.08)', padding:'10px 14px', borderRadius:'.5rem', borderLeft:'3px solid var(--error)' }}>{err}</div>}
            <button type="submit" className="btn-primary" style={{ width:'100%', marginTop:4, justifyContent:'center', opacity: loading ? .7 : 1 }} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>
          <div style={{ margin:'20px 0', borderTop:'1px solid rgba(64,72,93,.3)', position:'relative', textAlign:'center' }}>
            <span style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'var(--surface-container)', padding:'0 12px', fontSize:'.72rem', color:'var(--outline)' }}>OR</span>
          </div>
          <p style={{ textAlign:'center', fontSize:'.82rem', color:'var(--outline)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'var(--primary)', fontWeight:600, textDecoration:'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
