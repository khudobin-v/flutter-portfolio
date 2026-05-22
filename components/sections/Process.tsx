import Icon from '@/components/ui/Icon'

const STEPS = [
  { n: '01', t: 'Discovery',         d: '30-минутный созвон. Разбираем продукт, цели, ограничения. Получаешь brief и fixed-bid оценку через 24 часа.',           time: '1 день' },
  { n: '02', t: 'Прототип',          d: 'AI-pipeline собирает скелет приложения: навигация, ключевые экраны, моковые данные. Кликабельный билд на TestFlight.',    time: '3–5 дней' },
  { n: '03', t: 'Итерации',          d: 'Daily-демо в Loom, weekly-созвон. Linear доска открыта, ты добавляешь правки прямо в тикеты.',                     time: '2–6 недель' },
  { n: '04', t: 'Релиз & поддержка', d: 'Сборка прод-билдов, заведение в App Store Connect и Play Console, аналитика и crashlytics. Опционально — fixed-fee support.', time: '1 неделя' },
]

export default function Process() {
  return (
    <section id="process" className="pg-section">
      <div className="page">
        <div className="eyebrow">Процесс</div>
        <h2 className="sec-title">
          4 этапа. <span className="accent">Без сюрпризов и&nbsp;тёмных квадратов в&nbsp;тикетах.</span>
        </h2>
        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="grid-4">
          {STEPS.map((s, k) => (
            <div key={s.n} className="card-base lift" style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 280 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="step-num">{s.n}</div>
                <span className="badge badge--dark">{s.time}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="step-title">{s.t}</div>
                <div className="step-text">{s.d}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-4)', font: '500 12px/1 var(--font-sans)' }}>
                <Icon name="arrow-right" size={14} color="var(--fg-4)" />
                {k < STEPS.length - 1 ? 'далее' : 'релиз'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
