'use client'
import { useState, useEffect } from 'react'

const CYCLE = ['Claude Code', 'Cursor', 'Codex']

export default function Hero({ dark = true }: { dark?: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % CYCLE.length), 2400)
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
            <h1 style={{ margin: 0, font: '700 72px/0.98 var(--font-sans)', letterSpacing: '-0.03em', color: fg, textWrap: 'balance' } as React.CSSProperties}>
              Flutter-приложения,<br/>построенные{' '}
              <span style={{ color: acc, display: 'inline-block', minWidth: 380, transition: 'all .35s var(--ease-entrance)' }}>
                вместе с {CYCLE[i]}
              </span>
            </h1>
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
