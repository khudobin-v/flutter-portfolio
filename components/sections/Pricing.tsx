import Icon from '@/components/ui/Icon'

const PLANS = [
  {
    badge: 'MVP-спринт', dark: false, featured: false,
    price: '$6 800', period: '/ 4 нед.',
    sub: 'Кликабельное приложение + TestFlight/Internal track. Идеально для investor-демо.',
    feats: ['До 8 ключевых экранов', 'iOS + Android из коробки', 'Firebase / Supabase бекенд', 'Один созвон в неделю'],
  },
  {
    badge: 'Production', dark: true, featured: true,
    hint: 'SaaS / маркетплейс',
    price: '$14 500', period: '/ 8–10 нед.',
    sub: 'Прод-релиз в стора. Подписки, аналитика, push-кампании, CI/CD.',
    feats: ['Полный production-релиз', 'RevenueCat / Adapty подписки', 'Auth, KYC, биометрия', 'Codemagic CI/CD', '1 месяц поддержки в подарок'],
  },
  {
    badge: 'Retainer', dark: false, featured: false,
    price: '$4 800', period: '/ мес.',
    sub: 'Для команд с уже живым продуктом. Фичи + bugfix + рост по data-driven roadmap.',
    feats: ['~80 часов в месяц', 'Linear-доска в open mode', 'SLA на P0-баги — 8 часов', 'Без минимального срока'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="pg-section">
      <div className="page">
        <div className="eyebrow">Тарифы</div>
        <h2 className="sec-title">
          Прозрачно. <span className="accent">Без скрытых часов и&nbsp;счетов в&nbsp;конце месяца.</span>
        </h2>
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3">
          {PLANS.map((pl, k) => (
            <div key={k} className={`price-card price-card--${pl.dark ? 'dark' : 'light'} lift`} style={pl.featured ? { transform: 'translateY(-8px)' } : {}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${pl.featured ? 'badge--ember' : 'badge--dark'}`}>{pl.badge}</span>
                {pl.hint && <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--color-ash)' }}>{pl.hint}</span>}
              </div>
              <div>
                <div className="price-amount">{pl.price}<span className="per"> {pl.period}</span></div>
                <div style={{ font: '400 14px/1.5 var(--font-sans)', color: pl.dark ? 'var(--color-ash)' : 'var(--fg-3)', marginTop: 6 }}>{pl.sub}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
                {pl.feats.map((f) => (
                  <div key={f} className="price-feat" style={pl.dark ? { color: '#fff' } : {}}>
                    <Icon name="check" size={16} color={pl.dark ? '#fff' : 'var(--color-obsidian)'} />{f}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }} />
              <a href="#contact" className={pl.dark ? 'btn-pill' : 'btn-outlined'}>Выбрать</a>
            </div>
          ))}
        </div>
        <p style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--fg-3)', marginTop: 24, textAlign: 'center' }}>
          Все тарифы fixed-bid. Оплата 50/50. Расторжение в один клик без штрафов.
        </p>
      </div>
    </section>
  )
}
