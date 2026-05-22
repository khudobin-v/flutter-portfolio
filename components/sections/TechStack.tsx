const GROUPS = [
  { label: 'Core',               items: ['Flutter 3.x', 'Dart', 'Riverpod 2', 'go_router', 'freezed', 'drift'] },
  { label: 'Backend & data',     items: ['Firebase', 'Supabase', 'Postgres', 'REST / GraphQL', 'OpenAPI codegen'] },
  { label: 'Платежи & интеграции', items: ['RevenueCat', 'Stripe', 'Yookassa', 'Apple/Google Pay', 'Adapty'] },
  { label: 'DevOps',             items: ['Codemagic', 'Fastlane', 'GitHub Actions', 'Sentry', 'Firebase Crashlytics'] },
  { label: 'AI-инструменты',     items: ['Claude Code', 'Cursor', 'Codex', 'Whisper', 'OpenAI API'] },
]

export default function TechStack() {
  return (
    <section className="pg-section" style={{ background: 'var(--bg-card-muted)' }}>
      <div className="page">
        <div className="eyebrow">Тех. стек</div>
        <h2 className="sec-title" style={{ maxWidth: 720 }}>
          Один разработчик —{' '}<span className="accent">полный стек продакшен-приложения.</span>
        </h2>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {GROUPS.map((g, k) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, alignItems: 'start', borderTop: '1px solid var(--border-2)', paddingTop: 24, paddingBottom: 24, borderBottom: k === GROUPS.length - 1 ? '1px solid var(--border-2)' : 'none' }} className="grid-2">
              <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--fg-1)' }}>{g.label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {g.items.map((it) => <span key={it} className="tech-chip">{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
