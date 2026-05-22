const APPS = [
  { id: 'lumen', title: 'Lumen',     category: 'Wellness',    sub: 'Дневник настроения с AI-разбором за день',          bg: 'tile-bg-1', badges: ['Riverpod', 'iOS · Android', 'OpenAI'] },
  { id: 'nori',  title: 'Nori',      category: 'Marketplace', sub: 'Маркетплейс домашних поваров. Подписочная модель.', bg: 'tile-bg-2', badges: ['Firebase', 'Yookassa', 'MapKit'] },
  { id: 'ember', title: 'Ember Run', category: 'Fitness',     sub: 'Беговой клуб с командными челленджами',             bg: 'tile-bg-3', badges: ['HealthKit', 'Strava API', 'Realtime'] },
  { id: 'drift', title: 'Drift',     category: 'Fintech',     sub: 'Финтех для тревел-бюджета. Карта-конверсия в один тап.', bg: 'tile-bg-4', badges: ['KYC', 'Plaid', 'Biometrics'] },
  { id: 'stoa',  title: 'Stoa',      category: 'Audio',       sub: 'Аудио-курсы по стоицизму. Офлайн-первый плеер.',    bg: 'tile-bg-5', badges: ['Just-audio', 'Stripe', 'Offline'] },
  { id: 'kohi',  title: 'Kōhī',     category: 'Lifestyle',   sub: 'Каталог третьей волны кофе с маршрутами по городам.', bg: 'tile-bg-6', badges: ['Mapbox', 'Algolia', 'Hive'] },
]

function MockShape({ which }: { which: number }) {
  if (which === 0) return (
    <svg viewBox="0 0 200 120" style={{ width: '100%' }}>
      <path d="M10 90 Q40 50 70 65 T130 35 T190 50" stroke="rgba(255,255,255,0.95)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="70" cy="65" r="5" fill="#fff"/><circle cx="130" cy="35" r="5" fill="#fff"/><circle cx="190" cy="50" r="5" fill="#fff"/>
    </svg>
  )
  if (which === 1) return (
    <svg viewBox="0 0 200 120" style={{ width: '100%' }}>
      <rect x="0" y="0" width="200" height="120" fill="rgba(255,255,255,0.04)" rx="12"/>
      <circle cx="60" cy="55" r="6" fill="#fe45e2"/><circle cx="130" cy="40" r="6" fill="#ff5a00"/><circle cx="170" cy="80" r="6" fill="#fff"/>
    </svg>
  )
  if (which === 2) return (
    <svg viewBox="0 0 200 120" style={{ width: '100%' }}>
      {[10,30,55,85,40,70,50].map((h,i) => <rect key={i} x={i*28+8} y={120-h-10} width={18} height={h} rx={6} fill="rgba(255,255,255,0.9)" />)}
    </svg>
  )
  if (which === 3) return (
    <div style={{ width: '82%', aspectRatio: '1.6/1', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))', borderRadius: 14, padding: 14, color: '#0a0a0a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      <div style={{ font: '700 13px/1 var(--font-sans)', letterSpacing: '0.04em' }}>DRIFT</div>
      <div>
        <div style={{ font: '700 18px/1 var(--font-sans)', letterSpacing: '0.1em' }}>•••• 4127</div>
        <div style={{ font: '500 10px/1 var(--font-sans)', marginTop: 8, opacity: 0.6 }}>VALID 12/27</div>
      </div>
    </div>
  )
  if (which === 4) return (
    <svg viewBox="0 0 200 80" style={{ width: '100%' }}>
      {Array.from({ length: 40 }).map((_, i) => {
        const h = 6 + Math.abs(Math.sin(i * 0.6)) * 50 + (i % 5) * 4
        return <rect key={i} x={i*5+2} y={40 - h/2} width="2.5" height={h} rx="1.5" fill="rgba(255,255,255,0.9)"/>
      })}
    </svg>
  )
  return (
    <svg viewBox="0 0 200 120" style={{ width: '100%' }}>
      <circle cx="100" cy="60" r="40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <circle cx="100" cy="60" r="28" fill="rgba(255,255,255,0.9)"/>
      <circle cx="100" cy="60" r="16" fill="rgba(20,83,45,0.85)"/>
    </svg>
  )
}

function Tile({ app, index }: { app: typeof APPS[0]; index: number }) {
  return (
    <div className={`app-tile lift ${app.bg}`}>
      <div className="app-tile__head">
        <span className="app-tile__category">{app.category}</span>
        <span className="app-tile__icon">{app.title.charAt(0)}</span>
      </div>
      <div style={{ position: 'absolute', top: 72, left: 22, right: 22, bottom: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MockShape which={index} />
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 className="app-tile__title">{app.title}</h3>
        <p className="app-tile__sub">{app.sub}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
          {app.badges.map((b) => (
            <span key={b} style={{ font: '500 11px/1 var(--font-sans)', padding: '5px 9px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section id="work" className="pg-section">
      <div className="page" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow">Кейсы</div>
            <h2 className="sec-title">6 продуктов. <span className="accent">Все собраны с&nbsp;AI-стеком.</span></h2>
          </div>
          <a href="#contact" className="btn-outlined">Запросить детальные кейсы</a>
        </div>
      </div>
      <div className="marquee marquee--portfolio">
        <div className="marquee__track" style={{ animationDuration: '60s' }}>
          {[...APPS, ...APPS].map((a, k) => (
            <div key={k} style={{ width: 320, flex: '0 0 320px', height: 420 }}>
              <Tile app={a} index={k % APPS.length} />
            </div>
          ))}
        </div>
      </div>
      <div className="page" style={{ marginTop: 16 }}>
        <p style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--fg-4)', maxWidth: 600, margin: 0 }}>
          * Продукты — иллюстративные тайлы под NDA-кейсы. Реальные ссылки и подробности — после первого созвона.
        </p>
      </div>
    </section>
  )
}
