import { useState } from 'react';
import api from '../lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('sending');
      await api.post('/contact', form);
      setStatus('sent');
      setForm({ name:'', email:'', subject:'', message:'' });
    } catch (err) {
      setStatus('error');
    }
  };

  const inputStyle = { width:'100%', background:'var(--surface)', border:'1px solid var(--outline)', borderRadius:'8px', padding:'13px 16px', color:'var(--on-surface)', fontFamily:'Inter', fontSize:'.875rem', outline:'none', transition:'border-color .2s' };

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'72px 32px' }}>
      <div style={{ textAlign:'center', marginBottom:60 }}>
        <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:9 }}>Get In Touch</div>
        <h1 style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:700, letterSpacing:'-.03em', marginBottom:12 }}>Let's Build Together</h1>
        <p style={{ color:'var(--outline)', fontSize:'.95rem', maxWidth:500, margin:'0 auto' }}>Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:40, alignItems:'start' }}>
        {/* Left info */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {[
            { icon:'📧', title:'Email', val:'kiboxsonleena51@gmail.com', sub:'We reply within 24 hrs' },
            { icon:'💬', title:'Live Chat', val:'Available in-app', sub:'Mon-Fri 9am–6pm IST' },
            { icon:'🌍', title:'Location', val:'Remote-first studio', sub:'Serving clients worldwide' },
          ].map(item => (
            <div key={item.title} style={{ background:'var(--surface)', border:'1px solid var(--outline)', borderRadius:'16px', padding:'20px 24px', display:'flex', gap:16, alignItems:'flex-start' }}>
              <div style={{ width:44, height:44, borderRadius:'.75rem', background:'rgba(17,101,255,.10)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize:'.75rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4 }}>{item.title}</div>
                <div style={{ fontSize:'.9rem', fontWeight:600, color:'var(--on-surface)', marginBottom:2 }}>{item.val}</div>
                <div style={{ fontSize:'.72rem', color:'var(--outline)' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background:'var(--surface)', border:'1px solid var(--outline)', borderRadius:'16px', padding:'32px' }}>
          {status === 'sent' ? (
            <div style={{ textAlign:'center', padding:'40px 0' }}>
              <div style={{ fontSize:'3rem', marginBottom:16 }}>✅</div>
              <h3 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:8 }}>Message Sent!</h3>
              <p style={{ color:'var(--outline)', fontSize:'.875rem' }}>We'll get back to you within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className="btn-primary" style={{ marginTop:20 }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div>
                  <label style={{ fontSize:'.72rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:6 }}>Name</label>
                  <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                </div>
                <div>
                  <label style={{ fontSize:'.72rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:6 }}>Email</label>
                  <input style={inputStyle} type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label style={{ fontSize:'.72rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:6 }}>Subject</label>
                <input style={inputStyle} name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" required />
              </div>
              <div>
                <label style={{ fontSize:'.72rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:6 }}>Message</label>
                <textarea style={{ ...inputStyle, resize:'vertical', minHeight:130 }} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project…" required />
              </div>
              {status === 'error' && (
                <div style={{ fontSize:'.78rem', color:'var(--error)', background:'rgba(255,110,132,.08)', padding:'10px 14px', borderRadius:'.5rem', borderLeft:'3px solid var(--error)' }}>
                  Failed to send. Please email us directly at kiboxsonleena51@gmail.com
                </div>
              )}
              <button type="submit" className="btn-primary" style={{ width:'100%', justifyContent:'center', opacity: status === 'sending' ? .7 : 1 }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
