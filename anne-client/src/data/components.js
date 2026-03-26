export const COMPS = [
  // Heroes
  { id:'hero-gradient',   name:'Gradient Hero',        desc:'Animated gradient mesh background with floating elements and hero CTA.', cat:'hero',   price:49, pv:'gh',  tag:'Popular' },
  { id:'hero-shader',     name:'Aurora Shader Hero',   desc:'Mesmerizing aurora borealis CSS animation with deep colour shifts.',     cat:'hero',   price:79, pv:'au',  tag:'Premium' },
  { id:'hero-typewriter', name:'Typewriter Hero',       desc:'Dynamic text cycling animation with multiple headline variants.',        cat:'hero',   price:39, pv:'tw',  tag:'Trending' },
  { id:'hero-particles',  name:'Particle Field Hero',  desc:'Interactive floating particle system reacting to cursor movement.',      cat:'hero',   price:69, pv:'pt',  tag:'Interactive' },
  { id:'hero-3d',         name:'3D Perspective Hero',  desc:'CSS 3D transforms creating depth and parallax on scroll.',              cat:'hero',   price:59, pv:'3d',  tag:'3D' },
  { id:'hero-video',      name:'Video Background Hero',desc:'Cinematic full-screen video backdrop with overlay and scanline effect.', cat:'hero',   price:89, pv:'vh',  tag:'Cinematic' },
  // Buttons
  { id:'btn-glow',        name:'Glow Button Set',      desc:'Neon-glowing CTA buttons with pulse animations in multiple colours.',   cat:'button', price:29, pv:'gl',  tag:'Animated' },
  { id:'btn-neon',        name:'Neon Sign Buttons',    desc:'Retro neon sign effect with flicker animation and glow trails.',        cat:'button', price:35, pv:'ne',  tag:'Retro' },
  { id:'btn-gradient',    name:'Gradient Text CTAs',   desc:'Animated gradient text buttons with shimmer slide effects.',            cat:'button', price:25, pv:'gt',  tag:'Minimal' },
  { id:'btn-fab',         name:'Floating Action Button',desc:'Material-inspired FAB with expandable sub-actions and pulse ring.',    cat:'button', price:29, pv:'fa',  tag:'Mobile' },
  // Sections
  { id:'sec-testimonial', name:'Testimonial Slider',   desc:'Auto-scrolling testimonial carousel with smooth transitions.',          cat:'section',price:45, pv:'ts',  tag:'Social Proof' },
  { id:'sec-pricing',     name:'Pricing Section',      desc:'Animated pricing cards with hover glow, toggle, and feature lists.',   cat:'section',price:49, pv:'pr',  tag:'Business' },
  { id:'sec-marquee',     name:'Scroll Marquee',       desc:'Infinite scrolling marquee for clients, tags, or features.',           cat:'section',price:29, pv:'mq',  tag:'Minimal' },
  { id:'sec-glass',       name:'Glassmorphism Cards',  desc:'Frosted glass card sections with depth layers and gradients.',         cat:'section',price:39, pv:'glc', tag:'Modern' },
  { id:'sec-faq',         name:'FAQ Accordion',        desc:'Expandable accordion FAQ with smooth open/close animations.',          cat:'section',price:35, pv:'fq',  tag:'Utility' },
  { id:'sec-features',    name:'Feature Grid',         desc:'Icon-led feature grid with hover lift and gradient icon backgrounds.',  cat:'section',price:39, pv:'ft',  tag:'SaaS' },
  // Effects
  { id:'fx-particles',    name:'Particle Background',  desc:'Ambient floating particle system as a full-page background.',          cat:'effect', price:55, pv:'pt',  tag:'Ambient' },
  { id:'fx-aurora',       name:'Aurora Background',    desc:'Northern lights animated gradient orbs behind content.',               cat:'effect', price:65, pv:'au',  tag:'Premium' },
  { id:'fx-floating',     name:'Floating Cards Effect',desc:'Elements drift freely with organic motion across the screen.',         cat:'effect', price:49, pv:'fl',  tag:'Organic' },
  // Navigation
  { id:'nav-glass',       name:'Glassmorphism Nav',    desc:'Frosted glass navigation bar with blur and animated links.',           cat:'nav',    price:35, pv:'nv',  tag:'Modern' },
  { id:'nav-animated',    name:'Animated Menu Nav',    desc:'Navigation with staggered animations and hamburger menu.',             cat:'nav',    price:39, pv:'nv',  tag:'Interactive' },
  { id:'nav-breadcrumb',  name:'Breadcrumb Trail',     desc:'Animated breadcrumb navigation with hover effects.',                   cat:'nav',    price:19, pv:'bc',  tag:'Utility' },
  // UI Elements
  { id:'ui-search',       name:'Animated Search Bar',  desc:'Expanding search with live results and focus ring glow.',              cat:'ui',     price:35, pv:'se',  tag:'Functional' },
  { id:'ui-toggle',       name:'Dark/Light Toggle',    desc:'Smooth animated theme toggle with sun/moon icons.',                    cat:'ui',     price:25, pv:'tg',  tag:'UX' },
  { id:'ui-cookie',       name:'Cookie Banner',        desc:'Modern animated cookie consent with sliding entrance.',                cat:'ui',     price:25, pv:'ck',  tag:'Legal' },
  { id:'ui-loader',       name:'Loading Animations',   desc:'Three loader variants — spinner, dots, ring — all animated.',         cat:'ui',     price:29, pv:'ld',  tag:'Micro UI' },
  { id:'ui-social',       name:'Social Links Bar',     desc:'Animated social media icons with hover glow and lift.',               cat:'ui',     price:19, pv:'so',  tag:'Minimal' },
  { id:'ui-notif',        name:'Notification Bell',    desc:'Bell icon with badge counter and dropdown notification list.',         cat:'ui',     price:35, pv:'nb',  tag:'Interactive' },
  { id:'ui-avatar',       name:'Avatar Stack',         desc:'Overlapping user avatar stack with tooltip count badge.',              cat:'ui',     price:25, pv:'av',  tag:'Social' },
  { id:'ui-scroll-prog',  name:'Scroll Progress Bar',  desc:'Animated progress bar tracking user scroll position.',                cat:'ui',     price:19, pv:'sg',  tag:'UX' },
  // Data & Stats
  { id:'data-counter',    name:'Animated Counters',    desc:'Numbers count up from zero on scroll with gradient colours.',         cat:'data',   price:35, pv:'ct',  tag:'Impact' },
  { id:'data-progress',   name:'Skill Progress Bars',  desc:'Animated bars filling on scroll with gradient fills.',                cat:'data',   price:39, pv:'pg',  tag:'Portfolio' },
  { id:'data-stats',      name:'Metrics Dashboard',    desc:'KPI stat boxes with animated number reveals and trends.',             cat:'data',   price:49, pv:'st',  tag:'Business' },
  { id:'data-table',      name:'Animated Data Table',  desc:'Responsive table with hover highlights and status badges.',           cat:'data',   price:45, pv:'tb',  tag:'SaaS' },
  { id:'data-countdown',  name:'Countdown Timer',      desc:'Live countdown with days/hours/minutes/seconds flip animation.',      cat:'data',   price:35, pv:'cd',  tag:'Launch' },
  // Layouts
  { id:'layout-bento',    name:'Bento Grid Layout',    desc:'Editorial bento-box grid with mixed cell sizes and hover reveals.',   cat:'layout', price:55, pv:'bn',  tag:'Trending' },
  { id:'layout-masonry',  name:'Masonry Gallery',      desc:'Pinterest-style masonry grid with hover zoom and overlay.',           cat:'layout', price:49, pv:'ms',  tag:'Visual' },
  { id:'layout-timeline', name:'Timeline Section',     desc:'Vertical animated timeline for history or roadmap sections.',         cat:'layout', price:45, pv:'tl2', tag:'Story' },
  { id:'layout-contact',  name:'Contact Form',         desc:'Styled form with floating labels, focus animations, and validation.', cat:'layout', price:39, pv:'cf',  tag:'Functional' },
];

export const CATS = [
  { k:'hero',    l:'Hero Sections',   i:'🦸' },
  { k:'button',  l:'Buttons & CTAs',  i:'🔘' },
  { k:'section', l:'Page Sections',   i:'📐' },
  { k:'effect',  l:'Visual Effects',  i:'✨' },
  { k:'nav',     l:'Navigation',      i:'🧭' },
  { k:'ui',      l:'UI Elements',     i:'🧩' },
  { k:'data',    l:'Data & Stats',    i:'📊' },
  { k:'layout',  l:'Layouts',         i:'🗂️' },
];
