import Icon from '@/components/ui/Icon'

const CARDS = [
  { icon: 'bolt',    t: 'Скорость',     d: 'Спринт-демо на 3-й день. Релиз в стор за 4–6 недель.' },
  { icon: 'shield',  t: 'Качество',     d: 'Riverpod, Clean Architecture, ≥80% coverage по бизнес-логике.' },
  { icon: 'layers',  t: 'Полный цикл',  d: 'От FigJam-эскиза до App Store и Google Play, включая CI/CD.' },
  { icon: 'compass', t: 'Прозрачность', d: 'Daily Loom, Linear-доска, прямой Telegram-канал.' },
]

export default function About() {
  return (
    <section id="about" className="pg-section">
      <div className="page">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }} className="grid-2">
          <div>
            <div className="eyebrow">О себе</div>
            <h2 className="sec-title">
              Один разработчик —<br/>
              <span className="accent">скорость продуктовой команды</span>
            </h2>
          </div>
          <div>
            <p style={{ font: '400 20px/1.55 var(--font-sans)', color: 'var(--fg-2)', margin: 0, maxWidth: 620 }}>
              Я <span className="inline-key">Худобин Василий</span>. Делаю мобильные приложения на Flutter 4 года: финтех, маркетплейсы, on-demand сервисы.{' '}
              <span className="inline-lead">В&nbsp;2024 встроил в&nbsp;workflow </span>
              <span className="inline-key">Claude Code, Cursor и&nbsp;Codex</span>
              <span className="inline-lead"> — и&nbsp;теперь беру столько же фич, сколько раньше тянула команда из&nbsp;двух человек.</span>
            </p>
            <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="grid-2">
              {CARDS.map((b, k) => (
                <div key={k} className="card-base lift" style={{ padding: 22 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--color-mist)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon name={b.icon} size={20} color="var(--fg-1)" />
                  </div>
                  <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--fg-1)' }}>{b.t}</div>
                  <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--fg-3)', marginTop: 4 }}>{b.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
