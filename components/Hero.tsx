'use client'
import { useState, useEffect } from 'react'
import { IconClaudeCode, IconCursor, IconCodex } from '@/components/ui/AIIcons'

const TOOLS = [
  { name: 'Claude Code', color: '#CC7A3D', Ic: IconClaudeCode },
  { name: 'Cursor',      color: '#1C8ADB', Ic: IconCursor      },
  { name: 'Codex',       color: '#7EE8A2', Ic: IconCodex       },
]

export default function Hero({ dark = true }: { dark?: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % TOOLS.length), 2400)
    return () => clearInterval(id)
  }, [])

  const fg  = dark ? 'var(--fg-on-dark)' : 'var(--fg-1)'
  const fg3 = dark ? 'var(--color-ash)'  : 'var(--fg-3)'
  const acc = dark ? 'rgba(255,255,255,0.5)' : 'var(--fg-4)'

  return (
    <section className="pg-section" style={{ background: dark ? 'var(--bg-dark)' : 'transparent', color: dark ? 'var(--fg-on-dark)' : 'inherit', paddingTop: 32 }}>
      {/* Announcement */}
      <div className="page" style={{ paddingTop: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px 8px 10px', borderRadius: 999, background: dark ? 'rgba(255,255,255,0.06)' : 'var(--bg-card)', border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--border-1)'}`, color: dark ? 'var(--color-ash)' : 'var(--fg-3)', font: '500 13px/1 var(--font-sans)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 999, background: 'var(--color-ember)', color: '#fff', font: '700 11px/1 var(--font-sans)' }}>AI</span>
          <span>
            <span className={dark ? 'inline-lead-on-dark' : 'inline-lead'}>Принимаю проекты на </span>
            <span className={dark ? 'inline-key-on-dark' : 'inline-key'}>июнь–июль</span>
            <span className={dark ? 'inline-lead-on-dark' : 'inline-lead'}> · 2 слота</span>
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="page" style={{ paddingTop: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'end' }} className="grid-2">
          <div>
            {/* Static lines — height never changes */}
            <div style={{ margin: 0, font: '700 72px/0.98 var(--font-sans)', letterSpacing: '-0.03em', color: fg }}>
              Flutter-приложения,<br />построенные
            </div>
            {/* Animated line — all variants stacked, fade between them */}
            <div style={{ position: 'relative', height: 76, marginTop: 6 }}>
              {/* Invisible spacer: reserves width of the longest text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap', visibility: 'hidden', pointerEvents: 'none' }}>
                <span style={{ font: '700 72px/0.98 var(--font-sans)', letterSpacing: '-0.03em' }}>вместе с Claude Code</span>
                <span style={{ width: 60, height: 60, flexShrink: 0 }} />
              </div>
              {/* All three tools absolutely stacked, opacity-crossfade */}
              {TOOLS.map((t, j) => (
                <div key={t.name} style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0,
                  display: 'flex', alignItems: 'center', gap: 16,
                  whiteSpace: 'nowrap',
                  opacity: i === j ? 1 : 0,
                  transition: 'opacity .3s ease',
                  pointerEvents: i === j ? 'auto' : 'none',
                }}>
                  <span style={{ font: '700 72px/0.98 var(--font-sans)', letterSpacing: '-0.03em', color: acc }}>
                    вместе с {t.name}
                  </span>
                  {/* Icon — right of the name */}
                  <div style={{
                    width: 60, height: 60, borderRadius: 18, flexShrink: 0,
                    background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                    border: `1.5px solid ${t.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: t.color,
                  }}>
                    <t.Ic size={30} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingBottom: 12 }}>
            <p style={{ margin: 0, font: '400 18px/1.55 var(--font-sans)', color: fg3, maxWidth: 360 }}>
              Худобин Василий · продуктовый разработчик. Беру идею в&nbsp;FigJam и&nbsp;довожу до публикации в&nbsp;сторах <span className={dark ? 'inline-key-on-dark' : 'inline-key'}>в 2–4 раза быстрее</span> за счёт связки Flutter + Claude Code, Cursor, Codex.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-pill btn-pill--lg">Запросить демо</a>
              <a href="#work" className="btn-outlined btn-outlined--lg">Посмотреть кейсы</a>
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 28, alignItems: 'center', color: fg3, font: '500 13px/1 var(--font-sans)' }}>
              <div style={{ display: 'flex' }}>
                {(['#ff5a00','#1d4ed8','#14532d','#fe45e2'] as const).map((bg, k) => (
                  <div key={k} style={{ width: 28, height: 28, borderRadius: '50%', marginLeft: k === 0 ? 0 : -8, border: `2px solid ${dark ? 'var(--color-obsidian)' : 'var(--bg-canvas)'}`, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 11px/1 var(--font-sans)', color: '#fff' }}>
                    {['S','M','A','K'][k]}
                  </div>
                ))}
              </div>
              <span>
                <span className={dark ? 'inline-key-on-dark' : 'inline-key'}>4.9/5</span>
                <span className={dark ? 'inline-lead-on-dark' : 'inline-lead'}> · 12 founder-команд</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stat bar */}
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--border-1)'}`, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--border-1)'}`, padding: '32px 0' }} className="grid-4">
          {[['6+','проектов на Flutter'],['24h','от идеи до прототипа'],['3×','ускорение AI-pipeline'],['iOS+Android','из одной кодовой базы']].map(([n, l], k) => (
            <div key={k} style={{ paddingLeft: k === 0 ? 0 : 24 }}>
              <div className={`stat-num${dark ? ' stat-num--dark' : ''}`} style={{ fontSize: 40 }}>{n}</div>
              <div className={`stat-label${dark ? ' stat-label--dark' : ''}`}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
