import Icon from '@/components/ui/Icon'
import { IconClaudeCode, IconCursor, IconCodex } from '@/components/ui/AIIcons'

const TOOLS = [
  {
    Ic: IconClaudeCode, color: '#CC7A3D', bgFrom: 'rgba(204,122,61,0.12)',
    name: 'Claude Code', role: 'Архитектура & рефакторинг',
    body: "Поднимаю проект, договариваюсь о структуре, прохожусь по слоям. Claude хорошо держит контекст всего модуля — переписывает Riverpod-провайдеры без regression-ов.",
    tasks: ['Архитектурные решения', 'Большие рефакторинги', 'Code review на PR'],
  },
  {
    Ic: IconCursor, color: '#1C8ADB', bgFrom: 'rgba(28,138,219,0.12)',
    name: 'Cursor', role: 'Ежедневный коддинг',
    body: 'Основной редактор. Inline-edit + Composer для multi-file правок. Прогоняю TDD-циклы, дополняю widget-структуры, генерирую freezed-модели и build_runner-конфиги.',
    tasks: ['Tab-completion', 'Composer multi-file', 'Тесты + моки'],
  },
  {
    Ic: IconCodex, color: '#7EE8A2', bgFrom: 'rgba(126,232,162,0.12)',
    name: 'Codex', role: 'Фоновые задачи & автоматизация',
    body: 'Отдаю длинные тикеты в фон: миграции, версионные апдейты Flutter SDK, переписать API под новый OpenAPI. Возвращается PR — я ревью.',
    tasks: ['Async-агенты', 'Миграции SDK', 'Boilerplate-ремесло'],
  },
]

export default function AIStack() {
  return (
    <section id="ai" className="pg-section pg-section--dark">
      <div className="page">
        <div style={{ maxWidth: 720 }}>
          <div className="eyebrow eyebrow--dark">AI-стек</div>
          <h2 className="sec-title sec-title--dark">
            Три инструмента, один разработчик.{' '}
            <span className="accent">Темп — как у&nbsp;команды.</span>
          </h2>
          <p className="sec-lead sec-lead--dark">
            Не «генерирую код кнопкой». Использую AI как со-пилота на каждом этапе: от&nbsp;research до&nbsp;ревью pull request&apos;ов.
          </p>
        </div>

        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3">
          {TOOLS.map((t) => (
            <div key={t.name} className="card-on-dark lift" style={{ background: `linear-gradient(145deg, ${t.bgFrom}, rgba(255,255,255,0.02))`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${t.color}22, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, position: 'relative' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: `1px solid ${t.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: t.color }}>
                  <t.Ic size={26} />
                </div>
                <div>
                  <div style={{ font: '600 18px/1 var(--font-sans)', color: '#fff' }}>{t.name}</div>
                  <div style={{ font: '400 12px/1.4 var(--font-sans)', color: t.color, marginTop: 4 }}>{t.role}</div>
                </div>
              </div>
              <p style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--color-ash)', margin: 0, position: 'relative' }}>{t.body}</p>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
                {t.tasks.map((tk) => (
                  <div key={tk} style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 13px/1.4 var(--font-sans)', color: '#fff' }}>
                    <Icon name="check" size={14} color={t.color} />{tk}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal demo */}
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }} className="grid-2">
          <div>
            <h3 style={{ font: '700 28px/1.2 var(--font-sans)', color: '#fff', letterSpacing: '-0.01em', margin: 0 }}>
              Что это значит на практике?
            </h3>
            <p style={{ font: '400 16px/1.55 var(--font-sans)', color: 'var(--color-ash)', marginTop: 16 }}>
              <span className="inline-lead-on-dark">Типовая фича — экран авторизации с&nbsp;OTP — от&nbsp;спека до&nbsp;merge:</span><br/>
              <span className="inline-key-on-dark">4 часа вместо 2 дней.</span>
            </p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['10 мин',  'Спека и breakdown в Claude — задаём слои, состояния, edge-cases'],
                ['1 час',   'Cursor Composer генерирует виджеты + Riverpod, я правлю детали'],
                ['1.5 часа','Тесты и фиксы — Codex прогоняет flutter test и проверяет lints'],
                ['1 час',   'Я ревью, прогоняю на устройстве, мерж'],
              ].map(([tm, d], i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                  <div style={{ font: '600 14px/1.3 var(--font-sans)', color: '#fff', minWidth: 72 }}>{tm}</div>
                  <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--color-ash)' }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {TOOLS.map((t) => (
                <div key={t.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: `1px solid ${t.color}44`, font: '500 12px/1 var(--font-sans)', color: '#fff' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color }}><t.Ic size={16} /></div>
                  {t.name}
                </div>
              ))}
            </div>
          </div>

          <div className="code-block">
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: '#ff5f57' }}/>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: '#febc2e' }}/>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: '#28c840' }}/>
              <span style={{ marginLeft: 12, color: '#71717a', fontSize: 12 }}>~/projects/flutter-otp</span>
            </div>
            <div><span className="c-prompt">{'>'}</span> <span className="c-key">claude</span> <span className="c-str">&quot;добавь OTP-экран по флоу из tickets/AUTH-12&quot;</span></div>
            <div className="c-comment">› анализирую: lib/features/auth, providers/, theme/</div>
            <div className="c-comment">› план: 4 widget&apos;а, 2 provider&apos;а, 1 use_case</div>
            <div className="c-comment">› применяю изменения в 7 файлах</div>
            <div style={{ marginTop: 10 }}><span className="c-prompt">{'>'}</span> <span className="c-key">flutter test</span></div>
            <div className="c-dim">{'  '}✓ otp_controller_test.dart (4)</div>
            <div className="c-dim">{'  '}✓ otp_widget_test.dart (3)</div>
            <div style={{ marginTop: 10 }}><span className="c-prompt">{'>'}</span> <span className="c-key">git commit</span> -m <span className="c-str">&quot;feat(auth): OTP screen&quot;</span></div>
            <div className="c-dim">{'  '}3min 42s · pushed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
