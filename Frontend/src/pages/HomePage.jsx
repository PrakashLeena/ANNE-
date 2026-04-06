import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { COMPS, CATS } from '../data/components';
import { getPreviewHTML, PREVIEW_STYLES } from '../data/previews';
import { useCart } from '../context/CartContext';

function ComponentCard({ comp }) {
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
          <span style={{ fontSize:'.58rem', textTransform:'uppercase', letterSpacing:'.06em', background:'rgba(255,122,0,.10)', color:'var(--primary)', padding:'2px 8px', borderRadius:'9999px', whiteSpace:'nowrap', marginLeft:7, flexShrink:0 }}>{comp.tag}</span>
        </div>
        <div style={{ fontSize:'.72rem', color:'var(--outline)', lineHeight:1.55, marginBottom:11, flex:1 }}>{comp.desc}</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontWeight:700, color:'var(--primary)', fontSize:'.88rem' }}>+${comp.price}</span>
          <button onClick={() => toggle(comp.id)} style={{ background: sel ? 'rgba(255,176,0,.12)' : 'rgba(255,122,0,.10)', color: sel ? 'var(--secondary)' : 'var(--primary)', border: sel ? '1px solid rgba(255,176,0,.28)' : '1px solid rgba(255,122,0,.22)', padding:'5px 13px', borderRadius:'9999px', fontFamily:'Inter', fontSize:'.72rem', fontWeight:600, cursor:'pointer', transition:'all .2s' }}>
            {sel ? '✓ Added' : '✦ Select'}
          </button>
        </div>
      </div>
    </div>
  );
}

function counterAnim(el, target, suffix = '') {
  let n = 0;
  const step = Math.ceil(target / 60);
  const iv = setInterval(() => {
    n = Math.min(n + step, target);
    if (el) el.textContent = n + suffix;
    if (n >= target) clearInterval(iv);
  }, 22);
}

export default function HomePage() {
  const sc1 = useRef(), sc2 = useRef(), sc3 = useRef(), sc4 = useRef();
  const { selected } = useCart();

  useEffect(() => {
    const t = setTimeout(() => {
      counterAnim(sc1.current, 39, '+');
      counterAnim(sc2.current, 850, '+');
      counterAnim(sc3.current, 340, '+');
      counterAnim(sc4.current, 8, '+');
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(x => { if (x.isIntersecting) { x.target.classList.add('vis'); obs.unobserve(x.target); } });
    }, { threshold: .1 });
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ position:'relative', minHeight:'88vh', display:'flex', alignItems:'center', padding:'72px 32px 56px', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:580, height:580, borderRadius:'50%', background:'rgba(255,122,0,.07)', filter:'blur(80px)', top:-180, right:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:380, height:380, borderRadius:'50%', background:'rgba(255,176,0,.06)', filter:'blur(70px)', bottom:-80, left:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(64,72,93,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(64,72,93,.07) 1px,transparent 1px)', backgroundSize:'54px 54px', maskImage:'radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1.1fr .9fr', gap:48, alignItems:'center', position:'relative', zIndex:1 }}>
          <div style={{ animation:'fadeUp .8s ease both' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 13px', borderRadius:'9999px', background:'var(--surface-high)', marginBottom:22 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--secondary)', display:'inline-block', animation:'pulse 2s infinite' }} />
              <span style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.07em', fontWeight:600, color:'var(--secondary)' }}>The Digital Architect</span>
            </div>
            <h1 style={{ fontSize:'clamp(2.4rem,5.2vw,4rem)', fontWeight:700, lineHeight:1.07, letterSpacing:'-.03em', marginBottom:18 }}>
              Build Your Digital<br />
              <span className="pg-txt">Masterpiece</span><br />
              with ANNEK.
            </h1>
            <p style={{ fontSize:'1rem', color:'var(--on-surface-var)', lineHeight:1.75, maxWidth:460, marginBottom:32, fontWeight:300 }}>Select, Customize, and Launch. Your dream website, perfectly tailored to your brand's DNA.</p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <a href="#components" className="btn-primary">Browse Components →</a>
              <a href="#packages" className="btn-outline">View Packages</a>
            </div>
            <div style={{ display:'flex', gap:32, marginTop:44, paddingTop:32, borderTop:'1px solid rgba(64,72,93,.2)' }}>
              {[{ ref: sc1, label:'Components' }, { ref: sc2, label:'Happy Clients' }, { ref: sc3, label:'Sites Launched' }, { ref: sc4, label:'Style Packs' }].map(({ ref, label }) => (
                <div key={label}>
                  <div ref={ref} style={{ fontSize:'1.7rem', fontWeight:700, letterSpacing:'-.03em' }}>0</div>
                  <div style={{ fontSize:'.6875rem', color:'var(--outline)', marginTop:2, textTransform:'uppercase', letterSpacing:'.06em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation:'fadeUp .8s .15s ease both', display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:26 }}>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:14 }}>
                <span style={{ color:'var(--secondary)', fontSize:'1.4rem' }}>⚡</span>
                <span style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--outline)', fontWeight:600 }}>Modern Tech Stack</span>
              </div>
              <p style={{ fontSize:'.8rem', color:'var(--on-surface-var)', lineHeight:1.7, marginBottom:18 }}>Powered by React, Node.js, and MongoDB for industrial-grade performance.</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
                {[['REACT.JS','var(--primary)'],['NODE.JS','var(--secondary)'],['MONGODB','var(--on-surface)'],['FIREBASE','var(--outline)']].map(([t,c]) => (
                  <div key={t} style={{ padding:9, borderRadius:'.5rem', background:'var(--surface-high)', textAlign:'center', fontFamily:'monospace', fontSize:'.7rem', color:c, fontWeight:600 }}>{t}</div>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:18 }}>
                <span style={{ fontSize:'1.2rem' }}>🧩</span>
                <div style={{ fontSize:'.82rem', fontWeight:600, margin:'7px 0 3px', color:'var(--on-surface)' }}>39+ Components</div>
                <div style={{ fontSize:'.72rem', color:'var(--outline)' }}>All animated, all ready.</div>
              </div>
              <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:18 }}>
                <span style={{ fontSize:'1.2rem' }}>👁️</span>
                <div style={{ fontSize:'.82rem', fontWeight:600, margin:'7px 0 3px', color:'var(--on-surface)' }}>Live Preview</div>
                <div style={{ fontSize:'.72rem', color:'var(--outline)' }}>See it before you build.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT LIBRARY */}
      <section id="components" style={{ padding:'72px 32px', background:'var(--surface-low)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:36, flexWrap:'wrap', gap:14 }}>
            <div>
              <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:9 }}>Component Library</div>
              <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.1rem)', fontWeight:700, letterSpacing:'-.02em' }}>Pick Your Styles</h2>
              <p style={{ color:'var(--outline)', fontSize:'.8rem', marginTop:5 }}>Click any component to add it to your package.</p>
            </div>
            <Link to="/builder" className="btn-primary" style={{ textDecoration:'none' }}>Open Builder →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:14 }}>
            {COMPS.slice(0, 12).map(c => <ComponentCard key={c.id} comp={c} />)}
          </div>
          <div style={{ textAlign:'center', marginTop:28 }}>
            <Link to="/builder" className="btn-outline" style={{ textDecoration:'none' }}>View All 39 Components →</Link>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section style={{ padding:'72px 32px', background:'var(--surface)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:44, flexWrap:'wrap', gap:14 }}>
            <div>
              <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:9 }}>Architectural Showcase</div>
              <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.1rem)', fontWeight:700, letterSpacing:'-.02em' }}>Built With Precision</h2>
              <p style={{ color:'var(--outline)', fontSize:'.8rem', marginTop:5 }}>Websites crafted on the ANNEK platform.</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
            {[
              { img:'https://lh3.googleusercontent.com/aida-public/AB6AXuA30-6nW55Ffl4Of3dUGlN7MiMNAZ3EWMUkzQLym-b7oL3Dw2UNSTUYPKNqBe8VRPzkUaVSA90yxsUDffuLb65vrcLWMT7wFYI1pMABOI4A5CgJI6ALey8teQn6vGpAF9xj1478kzBnXQInzR0Snpkj09L0LWZ6zsCVW0QKc5Z8Qwgtnn7_x9JpzarlK5CN0KfdG3lKhMr9skpsGANdEGfcqYmy3cSMhrquQ2kb1lABL-K965gW7Q7LNEmUVmbK3Vk3fFE-_Vw1nwJO', title:'Lumina Interiors', cat:'Architecture & Design', mt:0 },
              { img:'https://lh3.googleusercontent.com/aida-public/AB6AXuD6vqRHKenXkZ2uuCYlLTg3cyhdW8FODrwzkv3xIjs9YpK87Wsrkqs8LEFMahvci982IaCpFmmQZia9CeS_VDzN86v5d-bcoc0Jah1qNaQf-0_xkctB8yjeHesdpkpva8BywjMyBqBcVPGJFKeLOY7usxGHiltXYGwugwDLQSWl21vVnWWHHMVsD7ikpunSPLXToiqD9eXiGSlAMkWcRuchOf5_ZdnjIRN90q2991cp-oYsI-tGziPvD-3gpeAjUpGFennf09_Cx493', title:'Ether Commerce', cat:'Digital Retail', mt:28 },
              { img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDREmohY4y8h75cur8A8XpsA4n-u31IXN57dYlachilGX34dcq0Fn4HMu2dxqVpglv3AmzF36eOqcppyAhAcG6M16gZHtkKBXSPBHpDuouB9qn_azfoj97zJhY3dvgcBiEggmkLylheN26lRHbBQVcgk9mJQF04hVlj0JtybXoN0UAF4cNVxQbY_tvGevX5YF9vqQDKXb3VbiRIQF01nUpyz_pefW4aFdGltSfCXZaHvw2snZUeqZChQOBo3iSBorrPuSe9cR8GKV0W', title:'Nova Portfolio', cat:'Creative Agency', mt:0 },
            ].map(s => (
              <div key={s.title} className="rv" style={{ cursor:'pointer', marginTop:s.mt }}>
                <div style={{ height:340, borderRadius:'1rem', overflow:'hidden', background:'var(--surface-high)', marginBottom:14 }}>
                  <img src={s.img} alt={s.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .7s' }}
                    onMouseEnter={e => e.target.style.transform='scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform='scale(1)'} />
                </div>
                <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--on-surface)', marginBottom:3 }}>{s.title}</div>
                <div style={{ fontSize:'.6875rem', color:'var(--outline)', textTransform:'uppercase', letterSpacing:'.1em' }}>{s.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ padding:'72px 32px', background:'var(--surface-low)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:9 }}>Pricing</div>
            <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.1rem)', fontWeight:700, letterSpacing:'-.02em' }}>Simple, Transparent Packages</h2>
            <p style={{ color:'var(--outline)', fontSize:'.8rem', marginTop:6 }}>No hidden fees. Pick a package, add components, launch.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
            {[
              { name:'Starter', price:'$299', sub:'Perfect for personal projects and small businesses.', features:['Up to 5 pages','5 animated components','Mobile responsive','Basic SEO'], cta:'Get Started', featured:false },
              { name:'Pro', price:'$699', sub:'Full-featured website with premium animations.', features:['Up to 15 pages','15 animated components','Custom animations','Advanced SEO','3 revision rounds','Contact form'], cta:'Choose Pro', featured:true },
              { name:'Agency', price:'$1499', sub:'Full-scale solution with custom development.', features:['Unlimited pages','All 39 components','Custom component dev','CMS integration','Unlimited revisions','Source code delivery'], cta:'Contact Us', featured:false },
            ].map(pkg => (
              <div key={pkg.name} className={`pkg rv${pkg.featured ? ' feat' : ''}`}>
                {pkg.featured && <div style={{ display:'inline-block', background:'linear-gradient(135deg,var(--primary),var(--primary-dim))', color:'#000', fontSize:'.65rem', fontWeight:700, padding:'2px 12px', borderRadius:'9999px', marginBottom:14 }}>Most Popular</div>}
                <div style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:7 }}>{pkg.name}</div>
                <div style={{ fontSize:'2.3rem', fontWeight:700, letterSpacing:'-.03em', marginBottom:3 }}>{pkg.price}<span style={{ fontSize:'.9rem', fontWeight:400, color:'var(--outline)' }}>/one-time</span></div>
                <p style={{ color:'var(--outline)', fontSize:'.78rem', lineHeight:1.7, marginBottom:20 }}>{pkg.sub}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:9, marginBottom:24 }}>
                  {pkg.features.map(f => <li key={f} style={{ fontSize:'.78rem', color:'var(--on-surface-var)', display:'flex', alignItems:'center', gap:7 }}><span style={{ color:'var(--secondary)', fontWeight:700 }}>✓</span>{f}</li>)}
                </ul>
                <Link to="/builder" className={pkg.featured ? 'btn-primary' : 'btn-outline'} style={{ display:'block', textAlign:'center', textDecoration:'none', padding:'11px' }}>{pkg.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding:'72px 32px', background:'var(--surface)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:9 }}>How It Works</div>
            <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.1rem)', fontWeight:700, letterSpacing:'-.02em' }}>4 Steps to Launch</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
            {[
              { n:'01', icon:'🎨', title:'Pick Components', desc:'Browse and select animated styles you love.' },
              { n:'02', icon:'📋', title:'Submit Brief', desc:'Tell us about your brand and requirements.' },
              { n:'03', icon:'⚡', title:'We Build It', desc:'Our team crafts your website in 7–14 days.' },
              { n:'04', icon:'🚀', title:'Launch!', desc:'Review, approve, and we deploy live.' },
            ].map(s => (
              <div key={s.n} className="step rv">
                <div className="snum">{s.n}</div>
                <div style={{ fontSize:'1.4rem', marginBottom:12 }}>{s.icon}</div>
                <div style={{ fontSize:'.9rem', fontWeight:600, color:'var(--on-surface)', marginBottom:7 }}>{s.title}</div>
                <div style={{ fontSize:'.78rem', color:'var(--outline)', lineHeight:1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'72px 32px', background:'#000', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:250, background:'rgba(255,122,0,.11)', filter:'blur(80px)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ maxWidth:640, margin:'0 auto', position:'relative', zIndex:1 }}>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, letterSpacing:'-.03em', marginBottom:14 }}>Ready to Architect<br />Your Vision?</h2>
          <p style={{ color:'var(--outline)', fontSize:'.95rem', lineHeight:1.7, marginBottom:32 }}>Join creators pushing the boundaries of what a website can be.</p>
          <Link to="/builder" className="btn-primary" style={{ padding:'15px 38px', fontSize:'1rem', textDecoration:'none' }}>Launch Builder</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'var(--surface)', padding:'44px 32px', borderTop:'1px solid rgba(222,229,255,.05)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:28, marginBottom:36 }}>
          <div>
            <div className="pg-txt" style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:11 }}>ANNEK</div>
            <p style={{ fontSize:'.72rem', color:'var(--outline)', lineHeight:1.7, maxWidth:190 }}>The high-precision instrument for digital creation.</p>
          </div>
          {[
            { title:'Platform', links:[{ lb:'Components', to:'/builder' },{ lb:'Pricing', to:'/#packages' },{ lb:'Process', to:'/#process' }] },
            { title:'Legal', links:[{ lb:'Privacy', to:'#' },{ lb:'Terms', to:'#' }] },
            { title:'Connect', links:[{ lb:'Twitter', to:'#' },{ lb:'LinkedIn', to:'#' },{ lb:'Contact', to:'/contact' }] },
          ].map(col => (
            <div key={col.title}>
              <h5 style={{ fontSize:'.6875rem', color:'var(--primary)', textTransform:'uppercase', letterSpacing:'.08em', fontWeight:600, marginBottom:18 }}>{col.title}</h5>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {col.links.map(l => <Link key={l.lb} to={l.to} style={{ fontSize:'.78rem', color:'var(--outline)', textDecoration:'none' }}
                  onMouseEnter={e => e.target.style.color='var(--secondary)'}
                  onMouseLeave={e => e.target.style.color='var(--outline)'}
                >{l.lb}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1280, margin:'0 auto', paddingTop:20, borderTop:'1px solid rgba(222,229,255,.04)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:'.68rem', color:'var(--outline)' }}>© 2026 ANNEK Platform</div>
          <div style={{ fontSize:'.6875rem', color:'var(--outline-var)', textTransform:'uppercase', letterSpacing:'.1em' }}>Designed for Innovation</div>
        </div>
      </footer>
    </>
  );
}
