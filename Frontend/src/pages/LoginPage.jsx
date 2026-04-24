import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const inputStyle = { width:'100%', background:'var(--surface)', border:'1px solid var(--outline)', borderRadius:'8px', padding:'14px 16px', color:'var(--on-surface)', fontFamily:'Inter', fontSize:'.9rem', outline:'none', transition:'border-color .2s' };

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [err, setErr]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      setLoading(true);
      await login(email, pass);
      navigate('/profile');
    } catch (e) {
      setErr(e.message?.replace('Firebase: ', '') || 'Login failed. Check your credentials.');
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setErr('');
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/profile');
    } catch (e) {
      setErr(e.message?.replace('Firebase: ', '') || 'Google sign-in failed.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'90vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div style={{ background:'var(--surface)', border:'1px solid var(--outline)', borderRadius:'16px', padding:'40px 36px', width:'100%', maxWidth:420, position:'relative', overflow:'hidden', boxShadow:'0 10px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ position:'absolute', top:-80, left:-80, width:200, height:200, borderRadius:'50%', background:'rgba(17,101,255,.05)', filter:'blur(50px)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:'1.5rem', fontWeight:700, color:'var(--on-surface)', marginBottom:4 }}>Welcome Back</div>
          <p style={{ color:'var(--outline)', fontSize:'.82rem', marginBottom:28 }}>Sign in to your ANNEK account.</p>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
            <input style={inputStyle} type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
            {err && <div style={{ fontSize:'.78rem', color:'var(--error)', background:'rgba(255,110,132,.08)', padding:'10px 14px', borderRadius:'.5rem', borderLeft:'3px solid var(--error)' }}>{err}</div>}
            <button type="submit" className="btn-primary" style={{ width:'100%', marginTop:4, justifyContent:'center', opacity: loading ? .7 : 1 }} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
          <div style={{ margin:'20px 0', borderTop:'1px solid var(--outline)', position:'relative', textAlign:'center' }}>
            <span style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'var(--surface)', padding:'0 12px', fontSize:'.72rem', color:'var(--on-surface-var)' }}>OR</span>
          </div>
          <button type="button" onClick={handleGoogle} style={{ width:'100%', padding:'14px', borderRadius:'8px', background:'var(--surface)', color:'var(--on-surface)', border:'1px solid var(--outline)', fontSize:'.9rem', fontWeight:600, cursor:'pointer', transition:'all .2s', opacity: loading ? .7 : 1 }} disabled={loading}>
            Continue with Google
          </button>
          <p style={{ textAlign:'center', fontSize:'.82rem', color:'var(--outline)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color:'var(--primary)', fontWeight:600, textDecoration:'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
