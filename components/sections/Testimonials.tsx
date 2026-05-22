import Icon from '@/components/ui/Icon'

const ITEMS = [
  { name: 'Сергей М.', role: 'CEO, fintech startup',      color: '#1d4ed8', initial: 'С', quote: 'Худобин выкатил MVP за 5 недель — другая команда оценивала в 3 месяца. Подписочный flow, KYC, push-уведомления — всё работало с первого билда.', metric: '5 нед. до MVP' },
  { name: 'Anna K.',   role: 'Product lead, marketplace', color: '#ff5a00', initial: 'A', quote: 'Чувствуется, что Василий не просто кодит — он думает продуктом. Прислал свой план тестов до того, как мы успели сформулировать брокер-флоу.',    metric: '+42% retention' },
  { name: 'Максим Т.', role: 'Founder, wellness app',     color: '#fe45e2', initial: 'М', quote: 'Прозрачнее работы у меня не было ни с агентствами, ни с фрилансом. Daily Loom-ы, открытая Linear, никаких «на следующей неделе покажем».',       metric: '60% NPS' },
]

export default function Testimonials() {
  return (
    <section className="pg-section">
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40, gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow">Отзывы</div>
            <h2 className="sec-title">Что говорят фаундеры,<br/><span className="accent">с которыми мы делали продукты.</span></h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3">
          {ITEMS.map((t) => (
            <div key={t.name} className="t-card lift">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="avatar" style={{ background: t.color }}>{t.initial}</div>
                <div>
                  <div style={{ font: '600 15px/1.3 var(--font-sans)', color: 'var(--fg-1)' }}>{t.name}</div>
                  <div style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--fg-3)' }}>{t.role}</div>
                </div>
              </div>
              <p style={{ font: '400 16px/1.55 var(--font-sans)', color: 'var(--fg-2)', margin: 0, flex: 1 }}>«{t.quote}»</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border-2)' }}>
                <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--fg-1)' }}>{t.metric}</span>
                <Icon name="star" size={16} color="var(--color-ember)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
