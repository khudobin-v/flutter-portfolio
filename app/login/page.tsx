'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'

export default function LoginPage() {
  const router = useRouter()
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErr('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const { error } = await res.json()
        setErr(error || 'Неверный пароль')
      }
    } catch {
      setErr('Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adm-login">
      <div className="adm-login__card">
        <div className="adm-login__logo">
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--color-obsidian)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--color-ember)' }} />
          </div>
          <div>
            <div style={{ font: '700 15px/1 var(--font-sans)', color: 'var(--fg-1)' }}>khudobin/flutter</div>
            <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--fg-3)', marginTop: 3 }}>Панель управления</div>
          </div>
        </div>
        <h1 className="adm-login__title">Вход</h1>
        <p className="adm-login__sub">Введите пароль для доступа к&nbsp;сайту.</p>
        <form onSubmit={submit}>
          <div className="adm-field">
            <label className="adm-label">Пароль</label>
            <input
              type="password"
              className="adm-input"
              placeholder="••••••••"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoFocus
              style={err ? { borderColor: '#ef4444' } : {}}
            />
            {err && <span style={{ font: '400 12px/1 var(--font-sans)', color: '#ef4444' }}>{err}</span>}
          </div>
          <button
            type="submit"
            className="btn-pill btn-pill--lg"
            style={{ width: '100%', marginTop: 8, opacity: loading ? 0.6 : 1 }}
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}
