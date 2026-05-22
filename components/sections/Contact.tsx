'use client'
import { useState } from 'react'
import Icon from '@/components/ui/Icon'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', contact: '', project: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <section id="contact" className="pg-section">
      <div className="page">
        <div className="cta-band">
          <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', top: -180, right: -120, background: 'radial-gradient(circle, rgba(254,69,226,0.18), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', bottom: -160, left: -80, background: 'radial-gradient(circle, rgba(255,90,0,0.16), transparent 60%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }} className="grid-2">
            <div>
              <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-ash)' }}>
                Свободно: 2 слота · июнь–июль
              </div>
              <h2 style={{ font: '700 56px/1.05 var(--font-sans)', color: '#fff', letterSpacing: '-0.025em', margin: '16px 0 0', textWrap: 'balance' } as React.CSSProperties}>
                Расскажи о&nbsp;продукте —{' '}
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>оценку пришлю за&nbsp;24&nbsp;часа.</span>
              </h2>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: 'tg', label: 'Telegram', sub: '@khudobin_v', href: 'https://t.me/khudobin_v' },
                  { icon: 'globe', label: 'khudobin-flutter.ru', sub: '', href: 'https://khudobin-flutter.ru' },
                ].map(({ icon, label, sub, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, font: '500 16px/1 var(--font-sans)', color: '#fff' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={icon} size={18} color="#fff" />
                    </div>
                    <span>{label}{sub && <span style={{ opacity: 0.7 }}> · {sub}</span>}</span>
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 28, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {submitted ? (
                <div style={{ padding: '32px 8px', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Icon name="check" size={28} color="#fff" />
                  </div>
                  <div style={{ font: '600 20px/1.3 var(--font-sans)', color: '#fff' }}>Получил, спасибо!</div>
                  <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--color-ash)', marginTop: 8 }}>Отвечу в&nbsp;Telegram в&nbsp;течение 4&nbsp;часов.</div>
                </div>
              ) : (
                <>
                  {(['name','contact','project'] as const).map((k) => (
                    <label key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--color-ash)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        {k === 'name' ? 'Имя' : k === 'contact' ? 'Telegram / email' : 'Пару слов о продукте'}
                      </span>
                      {k === 'project' ? (
                        <textarea rows={3} value={form[k]} onChange={set(k)} placeholder="MVP финтех-приложения, нужно подключение Plaid + KYC..." style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '12px 16px', color: '#fff', font: '400 15px/1.5 var(--font-sans)', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
                      ) : (
                        <input required value={form[k]} onChange={set(k)} placeholder={k === 'contact' ? '@username или mail@...' : ''} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '12px 16px', color: '#fff', font: '400 15px/1 var(--font-sans)', outline: 'none', fontFamily: 'var(--font-sans)' }} />
                      )}
                    </label>
                  ))}
                  <button type="submit" className="btn-pill btn-pill--lg" style={{ background: '#fff', color: '#09090b', marginTop: 4 }}>
                    Прислать оценку за 24 часа
                  </button>
                  <p style={{ font: '400 11px/1.4 var(--font-sans)', color: 'var(--color-ash)', textAlign: 'center', margin: 0 }}>
                    Без NDA до созвона — но можем подписать первым шагом.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
