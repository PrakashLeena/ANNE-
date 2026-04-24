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
      <div style={{ height:170, background:'var(--surface-high)', position:'relative', overflow:'hidden' }}>
        <style>{PREVIEW_STYLES}</style>
        <div style={{ width:'100%', height:'100%' }} dangerouslySetInnerHTML={{ __html: getPreviewHTML(comp.pv) }} />
      </div>
      <div style={{ padding:'13px', flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:5 }}>
          <div style={{ fontSize:'.85rem', fontWeight:600, color:'var(--on-surface)' }}>{comp.name}</div>
          <span style={{ fontSize:'.58rem', textTransform:'uppercase', letterSpacing:'.06em', background:'rgba(17,101,255,.10)', color:'var(--primary)', padding:'2px 8px', borderRadius:'9999px', whiteSpace:'nowrap', marginLeft:7, flexShrink:0 }}>{comp.tag}</span>
        </div>
        <div style={{ fontSize:'.72rem', color:'var(--outline)', lineHeight:1.55, marginBottom:11, flex:1 }}>{comp.desc}</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontWeight:700, color:'var(--primary)', fontSize:'.88rem' }}>+${comp.price}</span>
          <button onClick={() => toggle(comp.id)} style={{ background: sel ? 'rgba(17,101,255,.12)' : 'rgba(17,101,255,.10)', color: sel ? 'var(--primary)' : 'var(--primary)', border: sel ? '1px solid rgba(17,101,255,.28)' : '1px solid rgba(17,101,255,.22)', padding:'5px 13px', borderRadius:'9999px', fontFamily:'Inter', fontSize:'.72rem', fontWeight:600, cursor:'pointer', transition:'all .2s' }}>
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
      <section style={{ position:'relative', minHeight:'90vh', display:'flex', alignItems:'center', padding:'80px 32px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%)', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:580, height:580, borderRadius:'50%', background:'rgba(255,122,0,.07)', filter:'blur(80px)', top:-180, right:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:380, height:380, borderRadius:'50%', background:'rgba(255,176,0,.06)', filter:'blur(70px)', bottom:-80, left:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(64,72,93,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(64,72,93,.07) 1px,transparent 1px)', backgroundSize:'54px 54px', maskImage:'radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', position:'relative', zIndex:1 }}>
          <div>
            <h1 style={{ fontSize:'clamp(2.5rem, 4vw, 3.5rem)', fontWeight:700, lineHeight:1.1, color:'var(--on-surface)', marginBottom:20 }}>
              The Component Marketplace<br />
              for <span className="pg-txt">Modern Websites</span>
            </h1>
            <p style={{ fontSize:'1.1rem', color:'var(--on-surface-var)', lineHeight:1.6, marginBottom:32 }}>Select, customize, and launch stunning websites with our premium component library. Powered by AI and built for performance.</p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <a href="#components" style={{ background: 'var(--primary)', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s' }}>Browse Components</a>
              <Link to="/builder" style={{ background: 'transparent', color: 'var(--primary)', border: '2px solid var(--primary)', padding: '12px 26px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s' }}>Start Building</Link>
            </div>
            <div style={{ display:'flex', gap:40, marginTop:50, paddingTop:30, borderTop:'1px solid var(--outline)' }}>
              {[{ ref: sc1, label:'Components', val:39 }, { ref: sc2, label:'Happy Clients', val:850 }, { ref: sc3, label:'Sites Launched', val:340 }, { ref: sc4, label:'Style Packs', val:8 }].map(({ ref, label, val }) => (
                <div key={label}>
                  <div ref={ref} style={{ fontSize:'2rem', fontWeight:700, color:'var(--primary)' }}>0</div>
                  <div style={{ fontSize:'.8rem', color:'var(--on-surface-var)', marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ width:'100%', height:400, background:'var(--surface)', borderRadius:'16px', boxShadow:'0 20px 40px rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
              <img src="https://static.wixstatic.com/media/3ae05b_f430ef21a42b48ea8c280487c0a5c8e5~mv2.jpg/v1/fill/w_136,h_137,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/Frame%202147239870.jpg" alt="Component Preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <div style={{ position:'absolute', top:-20, right:-20, width:80, height:80, background:'var(--secondary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem' }}>⚡</div>
          </div>
        </div>
      </section>

      {/* COMPONENT LIBRARY */}
      <section id="components" style={{ padding:'80px 32px', background:'var(--surface)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <h2 style={{ fontSize:'2.5rem', fontWeight:700, color:'var(--on-surface)', marginBottom:16 }}>Choose from 2000+ Components</h2>
            <p style={{ fontSize:'1.1rem', color:'var(--on-surface-var)', lineHeight:1.6 }}>Our free website builder offers 2000+ components, all fully customizable and ready for business.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
            {COMPS.slice(0, 12).map(c => <ComponentCard key={c.id} comp={c} />)}
          </div>
          <div style={{ textAlign:'center', marginTop:40 }}>
            <Link to="/builder" style={{ background: 'var(--primary)', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>View All Components</Link>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section style={{ padding:'80px 32px', background:'var(--surface-low)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <h2 style={{ fontSize:'2.5rem', fontWeight:700, color:'var(--on-surface)', marginBottom:16 }}>Built with Our Components</h2>
            <p style={{ fontSize:'1.1rem', color:'var(--on-surface-var)', lineHeight:1.6 }}>Over 15,000 sites are launched with our component library every day. Dive into our top picks.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))', gap:32 }}>
            {[
              { img:'https://lh3.googleusercontent.com/aida-public/AB6AXuA30-6nW55Ffl4Of3dUGlN7MiMNAZ3EWMUkzQLym-b7oL3Dw2UNSTUYPKNqBe8VRPzkUaVSA90yxsUDffuLb65vrcLWMT7wFYI1pMABOI4A5CgJI6ALey8teQn6vGpAF9xj1478kzBnXQInzR0Snpkj09L0LWZ6zsCVW0QKc5Z8Qwgtnn7_x9JpzarlK5CN0KfdG3lKhMr9skpsGANdEGfcqYmy3cSMhrquQ2kb1lABL-K965gW7Q7LNEmUVmbK3Vk3fFE-_Vw1nwJO', title:'Lumina Interiors', cat:'Architecture & Design' },
              { img:'https://lh3.googleusercontent.com/aida-public/AB6AXuD6vqRHKenXkZ2uuCYlLTg3cyhdW8FODrwzkv3xIjs9YpK87Wsrkqs8LEFMahvci982IaCpFmmQZia9CeS_VDzN86v5d-bcoc0Jah1qNaQf-0_xkctB8yjeHesdpkpva8BywjMyBqBcVPGJFKeLOY7usxGHiltXYGwugwDLQSWl21vVnWWHHMVsD7ikpunSPLXToiqD9eXiGSlAMkWcRuchOf5_ZdnjIRN90q2991cp-oYsI-tGziPvD-3gpeAjUpGFennf09_Cx493', title:'Ether Commerce', cat:'Digital Retail' },
              { img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDREmohY4y8h75cur8A8XpsA4n-u31IXN57dYlachilGX34dcq0Fn4HMu2dxqVpglv3AmzF36eOqcppyAhAcG6M16gZHtkKBXSPBHpDuouB9qn_azfoj97zJhY3dvgcBiEggmkLylheN26lRHbBQVcgk9mJQF04hVlj0JtybXoN0UAF4cNVxQbY_tvGevX5YF9vqQDKXb3VbiRIQF01nUpyz_pefW4aFdGltSfCXZaHvw2snZUeqZChQOBo3iSBorrPuSe9cR8GKV0W', title:'Nova Portfolio', cat:'Creative Agency' },
            ].map(s => (
              <div key={s.title} className="rv" style={{ cursor:'pointer' }}>
                <div style={{ height:300, borderRadius:'12px', overflow:'hidden', background:'var(--surface)', marginBottom:20 }}>
                  <img src={s.img} alt={s.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .3s' }}
                    onMouseEnter={e => e.target.style.transform='scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform='scale(1)'} />
                </div>
                <div style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--on-surface)', marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:'.9rem', color:'var(--on-surface-var)' }}>{s.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'80px 32px', background:'var(--surface)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <h2 style={{ fontSize:'2.5rem', fontWeight:700, color:'var(--on-surface)', marginBottom:16 }}>Everything You Need to Succeed</h2>
            <p style={{ fontSize:'1.1rem', color:'var(--on-surface-var)', lineHeight:1.6 }}>From drag-and-drop building to advanced analytics, we've got your back.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:40 }}>
            {[
              { icon: '🎨', title: 'Drag & Drop Builder', desc: 'Intuitive visual editor with pixel-perfect control.' },
              { icon: '📱', title: 'Mobile Responsive', desc: 'Every component looks great on all devices.' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed and performance.' },
              { icon: '🔒', title: 'Secure & Reliable', desc: 'Enterprise-grade security and 99.9% uptime.' },
              { icon: '📊', title: 'Built-in Analytics', desc: 'Track visitors and conversions effortlessly.' },
              { icon: '🎯', title: 'SEO Optimized', desc: 'Get found on Google with our SEO tools.' },
            ].map(f => (
              <div key={f.title} className="rv" style={{ textAlign:'center' }}>
                <div style={{ fontSize:'3rem', marginBottom:16 }}>{f.icon}</div>
                <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'var(--on-surface)', marginBottom:12 }}>{f.title}</h3>
                <p style={{ fontSize:'1rem', color:'var(--on-surface-var)', lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ padding:'80px 32px', background:'var(--surface)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <h2 style={{ fontSize:'2.5rem', fontWeight:700, color:'var(--on-surface)', marginBottom:16 }}>Simple, Transparent Pricing</h2>
            <p style={{ fontSize:'1.1rem', color:'var(--on-surface-var)', lineHeight:1.6 }}>No hidden fees. Pick a package, add components, launch.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24 }}>
            {[
              { name:'Starter', price:'$299', sub:'Perfect for personal projects and small businesses.', features:['Up to 5 pages','5 animated components','Mobile responsive','Basic SEO'], cta:'Get Started', featured:false },
              { name:'Pro', price:'$699', sub:'Full-featured website with premium animations.', features:['Up to 15 pages','15 animated components','Custom animations','Advanced SEO','3 revision rounds','Contact form'], cta:'Choose Pro', featured:true },
              { name:'Agency', price:'$1499', sub:'Full-scale solution with custom development.', features:['Unlimited pages','All 39 components','Custom component dev','CMS integration','Unlimited revisions','Source code delivery'], cta:'Contact Us', featured:false },
            ].map(pkg => (
              <div key={pkg.name} className={`rv`} style={{ background:'var(--surface)', border: pkg.featured ? '2px solid var(--primary)' : '1px solid var(--outline)', borderRadius:'16px', padding:'32px', position:'relative' }}>
                {pkg.featured && <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', background:'var(--primary)', color:'#fff', fontSize:'.8rem', fontWeight:700, padding:'4px 16px', borderRadius:'20px' }}>Most Popular</div>}
                <div style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:8, color:'var(--on-surface)' }}>{pkg.name}</div>
                <div style={{ fontSize:'3rem', fontWeight:700, color:'var(--primary)', marginBottom:8 }}>{pkg.price}<span style={{ fontSize:'1rem', fontWeight:400, color:'var(--on-surface-var)' }}>/one-time</span></div>
                <p style={{ color:'var(--on-surface-var)', fontSize:'.9rem', lineHeight:1.6, marginBottom:24 }}>{pkg.sub}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
                  {pkg.features.map(f => <li key={f} style={{ fontSize:'.9rem', color:'var(--on-surface)', display:'flex', alignItems:'center', gap:8 }}><span style={{ color:'var(--secondary)', fontSize:'1.2rem' }}>✓</span>{f}</li>)}
                </ul>
                <Link to="/builder" style={{ background: pkg.featured ? 'var(--primary)' : 'transparent', color: pkg.featured ? '#fff' : 'var(--primary)', border: pkg.featured ? 'none' : '2px solid var(--primary)', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', display:'block', textAlign:'center' }}>{pkg.cta}</Link>
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
      <section style={{ padding:'80px 32px', background:'var(--surface-low)', textAlign:'center' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <h2 style={{ fontSize:'2.5rem', fontWeight:700, color:'var(--on-surface)', marginBottom:16 }}>Ready to Build Your Website?</h2>
          <p style={{ fontSize:'1.1rem', color:'var(--on-surface-var)', lineHeight:1.6, marginBottom:32 }}>Start with our component library and create something amazing.</p>
          <Link to="/builder" style={{ background: 'var(--primary)', color: '#fff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Get Started</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'var(--surface)', padding:'60px 32px', borderTop:'1px solid var(--outline)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:40 }}>
          <div>
            <div style={{ fontSize:'1.5rem', fontWeight:700, color:'var(--primary)', marginBottom:16 }}>ANNEK</div>
            <p style={{ fontSize:'.9rem', color:'var(--on-surface-var)', lineHeight:1.6, maxWidth:250 }}>The component marketplace for modern websites. Build faster, launch sooner.</p>
          </div>
          {[
            { title:'Platform', links:[{ lb:'Components', to:'/#components' },{ lb:'Builder', to:'/builder' },{ lb:'Pricing', to:'/#packages' }] },
            { title:'Support', links:[{ lb:'Contact', to:'/contact' },{ lb:'Community', to:'/community' }] },
            { title:'Legal', links:[{ lb:'Privacy', to:'#' },{ lb:'Terms', to:'#' }] },
          ].map(col => (
            <div key={col.title}>
              <h5 style={{ fontSize:'.9rem', color:'var(--on-surface)', fontWeight:600, marginBottom:16 }}>{col.title}</h5>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {col.links.map(l => <Link key={l.lb} to={l.to} style={{ fontSize:'.9rem', color:'var(--on-surface-var)', textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e => e.target.style.color='var(--primary)'}
                  onMouseLeave={e => e.target.style.color='var(--on-surface-var)'}
                >{l.lb}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1200, margin:'0 auto', paddingTop:24, borderTop:'1px solid var(--outline)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:'.8rem', color:'var(--on-surface-var)' }}>© 2026 ANNEK Platform. All rights reserved.</div>
          <div style={{ fontSize:'.8rem', color:'var(--on-surface-var)' }}>Made with ❤️ for creators</div>
        </div>
      </footer>
    </>
  );
}
