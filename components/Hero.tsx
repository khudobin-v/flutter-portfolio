'use client'
import { useState, useEffect } from 'react'
import { IconClaudeCode, IconCursor, IconCodex } from '@/components/ui/AIIcons'

const TOOLS = [
  { name: 'Claude Code', color: '#CC7A3D', Ic: IconClaudeCode },
  { name: 'Cursor',      color: '#1C8ADB', Ic: IconCursor      },
  { name: 'Codex',       color: '#7EE8A2', Ic: IconCodex       },
]

const STORE_KEY = 'adm_data_v1'

interface HeroContent {
  text:        string
  badge:       string
  color:       string
  descPre:     string
  descAccent:  string
  descPost:    string
  btnPrimary:  string
  btnSecondary: string
}

const DEFAULTS: HeroContent = {
  text:         '2 слота · июнь–июль',
  badge:        'AI',
  color:        '#ff5a00',
  descPre:      'Худобин Василий · продуктовый разработчик. Беру идею в FigJam и довожу до публикации в сторах ',
  descAccent:   'в 2–4 раза быстрее',
  descPost:     ' за счёт связки Flutter + Claude Code, Cursor, Codex.',
  btnPrimary:   'Запросить демо',
  btnSecondary: 'Посмотреть кейсы',
}

export default function Hero({ dark = true }: { dark?: boolean }) {
  const [i, setI] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [c, setC] = useState<HeroContent>(DEFAULTS)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 880)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % TOOLS.length), 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY) || '')
      if (s?.hero) setC({
        text:         s.hero.announcementText   ?? DEFAULTS.text,
        badge:        s.hero.announcementBadge  ?? DEFAULTS.badge,
        color:        s.hero.announcementColor  ?? DEFAULTS.color,
        descPre:      s.hero.heroDescPre        ?? DEFAULTS.descPre,
        descAccent:   s.hero.heroDescAccent     ?? DEFAULTS.descAccent,
        descPost:     s.hero.heroDescPost       ?? DEFAULTS.descPost,
        btnPrimary:   s.hero.heroBtnPrimary     ?? DEFAULTS.btnPrimary,
        btnSecondary: s.hero.heroBtnSecondary   ?? DEFAULTS.btnSecondary,
      })
    } catch {}
  }, [])

  const fg  = dark ? 'var(--fg-on-dark)' : 'var(--fg-1)'
  const fg3 = dark ? 'var(--color-ash)'  : 'var(--fg-3)'
  const acc = dark ? 'rgba(255,255,255,0.5)' : 'var(--fg-4)'

  // ── Animated tool row (desktop: spacer+overlay; mobile: single crossfade)
  function AnimatedRow() {
    const fontSize = 'clamp(38px, 6vw, 72px)'
    const font = `700 ${fontSize}/0.98 var(--font-sans)`

    if (isMobile) {
      return (
        <div style={{ marginTop: 4 }}>
          {/* "вместе с" static line */}
          <div style={{ font, letterSpacing: '-0.03em', color: acc }}>вместе с</div>
          {/* icon + tool name — always fits on one line */}
          {TOOLS.map((t, j) => (
            <div key={t.name} style={{
              display: i === j ? 'flex' : 'none',
              alignItems: 'center', gap: 12, marginTop: 4,
            }}>
              <div className="hero-icon-badge" style={{
                background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                border: `1.5px solid ${t.color}55`, color: t.color,
              }}>
                <t.Ic size={20} />
              </div>
              <span style={{ font, letterSpacing: '-0.03em', color: acc }}>{t.name}</span>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div style={{ position: 'relative', marginTop: 6 }}>
        {/* Invisible spacer — reserves width of longest text */}
        <div aria-hidden style={{ display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap', visibility: 'hidden', pointerEvents: 'none', font, letterSpacing: '-0.03em' }}>
          <span>вместе с Claude Code</span>
          <span style={{ width: 'clamp(42px,5vw,60px)', height: 'clamp(42px,5vw,60px)', flexShrink: 0 }} />
        </div>
        {/* Stacked overlays — opacity crossfade */}
        {TOOLS.map((t, j) => (
          <div key={t.name} style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap',
            opacity: i === j ? 1 : 0,
            transition: 'opacity .3s ease',
            pointerEvents: i === j ? 'auto' : 'none',
          }}>
            <span style={{ font, letterSpacing: '-0.03em', color: acc }}>{`вместе с ${t.name}`}</span>
            <div className="hero-icon-badge" style={{
              background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
              border: `1.5px solid ${t.color}55`, color: t.color,
            }}>
              <t.Ic size={28} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="pg-section" style={{ background: dark ? 'var(--bg-dark)' : 'transparent', color: dark ? 'var(--fg-on-dark)' : 'inherit', paddingTop: 32 }}>
      {/* Announcement pill */}
      <div className="page" style={{ paddingTop: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px 8px 10px', borderRadius: 999, background: dark ? 'rgba(255,255,255,0.06)' : 'var(--bg-card)', border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--border-1)'}`, color: dark ? 'var(--color-ash)' : 'var(--fg-3)', font: '500 13px/1 var(--font-sans)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 999, background: c.color, color: '#fff', font: '700 11px/1 var(--font-sans)', flexShrink: 0 }}>{c.badge}</span>
          <span>{c.text}</span>
        </div>
      </div>

      {/* Main grid */}
      <div className="page" style={{ paddingTop: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'end' }} className="grid-2">
          {/* LEFT: heading */}
          <div>
            <div className="hero-h1" style={{ color: fg }}>
              Flutter-приложения,<br />построенные
            </div>
            <AnimatedRow />
          </div>

          {/* RIGHT: description + buttons + social proof */}
          <div style={{ paddingBottom: 12 }}>
            <p style={{ margin: 0, font: '400 18px/1.55 var(--font-sans)', color: fg3, maxWidth: 360 }}>
              {c.descPre}
              <span className={dark ? 'inline-key-on-dark' : 'inline-key'}>{c.descAccent}</span>
              {c.descPost}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <a href="#contact" className="btn-pill btn-pill--lg" style={{
                flex: 1, justifyContent: 'center', whiteSpace: 'nowrap',
                ...(dark ? { background: '#fff', color: '#09090b', boxShadow: 'none' } : {}),
              }}>{c.btnPrimary}</a>
              <a href="#work" className="btn-outlined btn-outlined--lg" style={{
                flex: 1, justifyContent: 'center', whiteSpace: 'nowrap',
                ...(dark ? { background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.28)' } : {}),
              }}>{c.btnSecondary}</a>
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
