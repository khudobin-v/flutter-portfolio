'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import { IconClaudeCode, IconCursor, IconCodex } from '@/components/ui/AIIcons'

// ── Types ──────────────────────────────────────────────────────────────
interface HeroData { name:string; tagline:string; slots:string; announcementText:string; announcementBadge:string; announcementColor:string; stat1n:string; stat1l:string; stat2n:string; stat2l:string; stat3n:string; stat3l:string; stat4n:string; stat4l:string; heroTheme:string }
interface PortfolioItem { id:number; title:string; category:string; sub:string; tags:string; visible:boolean }
interface PricingPlan { id:number; plan:string; price:string; period:string; featured:boolean; visible:boolean }
interface TestimonialItem { id:number; name:string; role:string; quote:string; metric:string; visible:boolean }
interface ContactItem { id:number; name:string; contact:string; project:string; ts:string; status:string }
interface SiteSettings { accent:string; tgHandle:string; siteUrl:string; seoTitle:string; seoDesc:string }
interface Store { hero:HeroData; portfolio:PortfolioItem[]; pricing:PricingPlan[]; testimonials:TestimonialItem[]; contacts:ContactItem[]; settings:SiteSettings }

const STORE_KEY = 'adm_data_v1'

function defaultStore(): Store {
  return {
    hero: { name:'Худобин Василий', tagline:'Flutter-приложения, построенные вместе с', slots:'2 слота · июнь–июль', announcementText:'2 слота · июнь–июль', announcementBadge:'AI', announcementColor:'#ff5a00', stat1n:'6+', stat1l:'проектов на Flutter', stat2n:'24h', stat2l:'от идеи до прототипа', stat3n:'3×', stat3l:'ускорение AI-pipeline', stat4n:'iOS+Android', stat4l:'из одной кодовой базы', heroTheme:'dark' },
    portfolio: [
      { id:1, title:'Lumen',     category:'Wellness',    sub:'Дневник настроения с AI-разбором за день',          tags:'Riverpod, iOS · Android, OpenAI', visible:true },
      { id:2, title:'Nori',      category:'Marketplace', sub:'Маркетплейс домашних поваров. Подписочная модель.', tags:'Firebase, Yookassa, MapKit',        visible:true },
      { id:3, title:'Ember Run', category:'Fitness',     sub:'Беговой клуб с командными челленджами',             tags:'HealthKit, Strava API, Realtime',   visible:true },
      { id:4, title:'Drift',     category:'Fintech',     sub:'Финтех для тревел-бюджета',                         tags:'KYC, Plaid, Biometrics',            visible:true },
      { id:5, title:'Stoa',      category:'Audio',       sub:'Аудио-курсы по стоицизму. Офлайн-первый плеер.',    tags:'Just-audio, Stripe, Offline',       visible:true },
      { id:6, title:'Kōhī',     category:'Lifestyle',   sub:'Каталог третьей волны кофе с маршрутами.',          tags:'Mapbox, Algolia, Hive',             visible:true },
    ],
    pricing: [
      { id:1, plan:'MVP-спринт', price:'$6 800',  period:'/ 4 нед.',    featured:false, visible:true },
      { id:2, plan:'Production', price:'$14 500', period:'/ 8–10 нед.', featured:true,  visible:true },
      { id:3, plan:'Retainer',   price:'$4 800',  period:'/ мес.',       featured:false, visible:true },
    ],
    testimonials: [
      { id:1, name:'Сергей М.', role:'CEO, fintech startup',      quote:'Худобин выкатил MVP за 5 недель — другая команда оценивала в 3 месяца.', metric:'5 нед. до MVP',   visible:true },
      { id:2, name:'Anna K.',   role:'Product lead, marketplace', quote:'Чувствуется, что Василий не просто кодит — он думает продуктом.',        metric:'+42% retention', visible:true },
      { id:3, name:'Максим Т.', role:'Founder, wellness app',     quote:'Прозрачнее работы у меня не было ни с агентствами, ни с фрилансом.',      metric:'60% NPS',         visible:true },
    ],
    contacts: [
      { id:1, name:'Иван П.',   contact:'@ivan_founder', project:'MVP финтех-приложения с Plaid',    ts:'2026-05-21 14:32', status:'new'  },
      { id:2, name:'Мария С.',  contact:'m.s@startup.ru',project:'Маркетплейс услуг для B2B',        ts:'2026-05-20 09:10', status:'read' },
      { id:3, name:'Dmitry K.', contact:'@dmkuznetsov',  project:'Wellness-приложение с AI',         ts:'2026-05-19 22:45', status:'read' },
    ],
    settings: { accent:'#ff5a00', tgHandle:'@khudobin_v', siteUrl:'khudobin-flutter.ru', seoTitle:'Худобин Василий · Flutter + AI', seoDesc:'Flutter-разработчик, использующий Claude Code, Cursor и Codex.' },
  }
}

// ── Toast ──────────────────────────────────────────────────────────────
function Toast({ msg, onDone }: { msg:string; onDone:()=>void }) {
  useEffect(() => { const id = setTimeout(onDone, 2400); return () => clearTimeout(id) }, [onDone])
  return <div className="adm-toast"><Icon name="check" size={16} color="#4ade80" />{msg}</div>
}

// ── Toggle ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked:boolean; onChange:(v:boolean)=>void }) {
  return (
    <label className="adm-toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="adm-toggle__track" />
      <div className="adm-toggle__thumb" />
    </label>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────
const NAV = [
  { id:'dashboard',    label:'Дашборд',    icon:'grid' },
  { id:'hero',         label:'Hero / Intro',icon:'sparkle' },
  { id:'portfolio',    label:'Кейсы',      icon:'layers' },
  { id:'pricing',      label:'Тарифы',     icon:'dollar-sign' },
  { id:'testimonials', label:'Отзывы',     icon:'star' },
  { id:'contacts',     label:'Заявки',     icon:'message-square', badge:true },
  { id:'settings',     label:'Настройки',  icon:'settings' },
]

function Sidebar({ active, onNav, newCount, onLogout }: { active:string; onNav:(id:string)=>void; newCount:number; onLogout:()=>void }) {
  return (
    <aside className="adm-sidebar">
      <div className="adm-sidebar__logo">
        <div className="adm-sidebar__logo-dot" />
        <div><div className="adm-sidebar__logo-text">khudobin/flutter</div><div className="adm-sidebar__logo-sub">Панель управления</div></div>
      </div>
      <nav className="adm-nav">
        <div className="adm-nav__group">
          <div className="adm-nav__label">Контент</div>
          {NAV.map(item => (
            <button key={item.id} className={`adm-nav__item${active === item.id ? ' active' : ''}`} onClick={() => onNav(item.id)}>
              <Icon name={item.icon} size={16} />
              <span style={{ flex:1 }}>{item.label}</span>
              {item.badge && newCount > 0 && <span style={{ background:'var(--color-ember)', color:'#fff', font:'600 11px/1 var(--font-sans)', padding:'2px 7px', borderRadius:999 }}>{newCount}</span>}
            </button>
          ))}
        </div>
        <div className="adm-nav__group">
          <div className="adm-nav__label">AI-стек</div>
          {[{ C:IconClaudeCode, label:'Claude Code', color:'#CC7A3D' }, { C:IconCursor, label:'Cursor', color:'#1C8ADB' }, { C:IconCodex, label:'Codex', color:'#7EE8A2' }].map(({ C, label, color }) => (
            <div key={label} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 10px', font:'500 13px/1 var(--font-sans)', color:'var(--color-ash)' }}>
              <span style={{ color, flexShrink: 0 }}><C size={16} /></span><span>{label}</span>
              <span style={{ marginLeft:'auto', width:7, height:7, borderRadius:999, background:color, opacity:0.8 }} />
            </div>
          ))}
        </div>
      </nav>
      <div className="adm-sidebar__footer">
        <div className="adm-sidebar__user">
          <div className="adm-sidebar__avatar">В</div>
          <div><div className="adm-sidebar__user-name">Худобин Василий</div><div className="adm-sidebar__user-role">Администратор</div></div>
        </div>
        <button onClick={onLogout} className="adm-nav__item" style={{ marginTop:4, color:'var(--color-steel)' }}>
          <Icon name="log-out" size={15} />Выйти
        </button>
      </div>
    </aside>
  )
}

// ── Dashboard ──────────────────────────────────────────────────────────
function Dashboard({ data }: { data:Store }) {
  const newContacts = data.contacts.filter(c => c.status === 'new').length
  return (
    <>
      <div className="adm-stats">
        {[
          { n:data.portfolio.filter(p=>p.visible).length, l:'Активных кейсов' },
          { n:data.pricing.filter(p=>p.visible).length,   l:'Тарифов' },
          { n:data.testimonials.filter(t=>t.visible).length, l:'Отзывов' },
          { n:newContacts, l:'Новых заявок', badge: newContacts > 0 ? `+${newContacts} сегодня` : '' },
        ].map((s, k) => (
          <div key={k} className="adm-stat">
            <div className="adm-stat__num">{s.n}</div>
            <div className="adm-stat__label">{s.l}</div>
            {s.badge && <div className="adm-stat__badge--up">{s.badge}</div>}
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div className="adm-section-card">
          <div className="adm-section-card__header">
            <div className="adm-section-card__title">Последние заявки</div>
            <span style={{ font:'400 12px/1 var(--font-sans)', color:'var(--fg-3)' }}>{data.contacts.length} всего</span>
          </div>
          <div style={{ padding:0 }}>
            {data.contacts.map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 24px', borderBottom:'1px solid var(--border-1)' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--color-obsidian)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', font:'600 13px/1 var(--font-sans)', flexShrink:0 }}>{c.name.charAt(0)}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ font:'500 14px/1 var(--font-sans)', color:'var(--fg-1)', marginBottom:3 }}>{c.name}</div>
                  <div style={{ font:'400 12px/1.3 var(--font-sans)', color:'var(--fg-3)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.project}</div>
                </div>
                <span className={`adm-status adm-status--${c.status}`}>{c.status === 'new' ? 'Новая' : 'Прочитана'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="adm-section-card">
          <div className="adm-section-card__header"><div className="adm-section-card__title">Быстрые действия</div></div>
          <div className="adm-section-card__body" style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <a href="/" target="_blank" className="btn-pill" style={{ display:'inline-flex', alignItems:'center', gap:8, width:'fit-content' }}><Icon name="eye" size={16} color="#fff" />Открыть сайт</a>
            {[{ icon:'sparkle', label:'Hero-секция', hint:'Текст, слоган, статы' }, { icon:'layers', label:'Кейсы', hint:'6 тайлов приложений' }, { icon:'dollar-sign', label:'Тарифы и цены', hint:'MVP / Production / Retainer' }].map((item,k) => (
              <div key={k} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderRadius:14, background:'var(--bg-card-muted)', cursor:'pointer' }}>
                <div style={{ width:32, height:32, borderRadius:10, background:'var(--bg-card)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name={item.icon} size={16} color="var(--fg-2)" /></div>
                <div><div style={{ font:'500 14px/1 var(--font-sans)', color:'var(--fg-1)' }}>{item.label}</div><div style={{ font:'400 12px/1.3 var(--font-sans)', color:'var(--fg-3)', marginTop:3 }}>{item.hint}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Hero Editor ────────────────────────────────────────────────────────
const STATUS_PRESETS = [
  { label:'Доступен',    badge:'✓',  color:'#16a34a', text:'Принимаю проекты' },
  { label:'Ограничено',  badge:'AI', color:'#ff5a00', text:'2 слота · июнь–июль' },
  { label:'Занят',       badge:'✗',  color:'#dc2626', text:'Занят, вернусь в сентябре' },
]

function HeroEditor({ hero, onChange, onSave }: { hero:HeroData; onChange:(v:HeroData)=>void; onSave:()=>void }) {
  const f = (k: keyof HeroData) => ({ value: hero[k], onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...hero, [k]: e.target.value }), className: 'adm-input' })
  return (
    <>
      {/* ── Статус занятости ── */}
      <div className="adm-section-card">
        <div className="adm-section-card__header"><div className="adm-section-card__title">Статус занятости</div></div>
        <div className="adm-section-card__body">
          {/* Presets */}
          <div style={{ display:'flex', gap:8, marginBottom:20 }}>
            {STATUS_PRESETS.map(p => (
              <button key={p.label}
                onClick={() => onChange({ ...hero, announcementBadge:p.badge, announcementColor:p.color, announcementText:p.text })}
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:10, border:`2px solid ${hero.announcementColor===p.color ? p.color : 'var(--border-2)'}`, background: hero.announcementColor===p.color ? `${p.color}18` : 'var(--bg-card)', cursor:'pointer', font:'500 13px/1 var(--font-sans)', color:'var(--fg-1)' }}>
                <span style={{ width:20, height:20, borderRadius:999, background:p.color, color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', font:'700 10px/1 var(--font-sans)', flexShrink:0 }}>{p.badge}</span>
                {p.label}
              </button>
            ))}
          </div>
          {/* Preview */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'8px 14px 8px 10px', borderRadius:999, background:'var(--color-obsidian)', border:'1px solid rgba(255,255,255,0.12)', marginBottom:20 }}>
            <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:22, height:22, borderRadius:999, background:hero.announcementColor||'#ff5a00', color:'#fff', font:'700 11px/1 var(--font-sans)', flexShrink:0 }}>{hero.announcementBadge||'AI'}</span>
            <span style={{ font:'500 13px/1 var(--font-sans)', color:'var(--color-ash)' }}>{hero.announcementText||'Текст статуса'}</span>
          </div>
          {/* Custom fields */}
          <div style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:12, alignItems:'end' }}>
            <div className="adm-field" style={{ marginBottom:0 }}>
              <label className="adm-label">Иконка / текст</label>
              <input {...f('announcementBadge')} style={{ textAlign:'center' }} maxLength={4} />
            </div>
            <div className="adm-field" style={{ marginBottom:0 }}>
              <label className="adm-label">Текст объявления</label>
              <input {...f('announcementText')} />
            </div>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:12, alignItems:'center' }}>
            <label className="adm-label" style={{ marginBottom:0, minWidth:80 }}>Цвет иконки</label>
            <input type="color" value={hero.announcementColor||'#ff5a00'} onChange={e => onChange({ ...hero, announcementColor:e.target.value })} className="adm-color-swatch" style={{ width:36, height:36 }} />
            <input {...f('announcementColor')} style={{ maxWidth:110 }} />
          </div>
        </div>
      </div>

      <div className="adm-section-card">
        <div className="adm-section-card__header">
          <div className="adm-section-card__title">Hero — основной текст</div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span style={{ font:'400 12px/1 var(--font-sans)', color:'var(--fg-3)' }}>Тема:</span>
            {(['dark','light'] as const).map(v => (
              <button key={v} onClick={() => onChange({ ...hero, heroTheme:v })} style={{ padding:'5px 12px', borderRadius:8, border:'1px solid var(--border-2)', font:'500 12px/1 var(--font-sans)', cursor:'pointer', background: hero.heroTheme===v ? 'var(--color-obsidian)' : 'var(--bg-card)', color: hero.heroTheme===v ? '#fff' : 'var(--fg-2)' }}>{v}</button>
            ))}
          </div>
        </div>
        <div className="adm-section-card__body" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="adm-field"><label className="adm-label">Имя</label><input {...f('name')} /></div>
          <div className="adm-field"><label className="adm-label">Tagline</label><input {...f('tagline')} /></div>
        </div>
      </div>
      <div className="adm-section-card">
        <div className="adm-section-card__header"><div className="adm-section-card__title">Stat bar</div></div>
        <div className="adm-section-card__body" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12 }}>
          {([1,2,3,4] as const).map(i => (
            <div key={i} style={{ display:'contents' }}>
              <div className="adm-field"><label className="adm-label">Стат {i} — число</label><input {...f(`stat${i}n` as keyof HeroData)} /></div>
              <div className="adm-field"><label className="adm-label">Стат {i} — подпись</label><input {...f(`stat${i}l` as keyof HeroData)} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="adm-save-bar"><span className="adm-save-bar__hint">Изменения применяются после сохранения</span><button className="btn-pill" onClick={onSave}>Сохранить</button></div>
    </>
  )
}

// ── Portfolio Editor ───────────────────────────────────────────────────
const BG_CLASSES = ['tile-bg-1','tile-bg-2','tile-bg-3','tile-bg-4','tile-bg-5','tile-bg-6']

function PortfolioEditor({ items, onChange, onSave }: { items:PortfolioItem[]; onChange:(v:PortfolioItem[])=>void; onSave:()=>void }) {
  const [editing, setEditing] = useState<number|null>(null)
  const upd = (id:number, k:keyof PortfolioItem, v: string|boolean) => onChange(items.map(it => it.id===id ? { ...it, [k]:v } : it))
  return (
    <>
      <div className="adm-section-card">
        <div className="adm-section-card__header">
          <div className="adm-section-card__title">Кейсы · {items.length}</div>
          <button className="btn-pill" onClick={() => { const n = { id:Date.now(), title:'Новый кейс', category:'App', sub:'Описание', tags:'Flutter', visible:true }; onChange([...items, n]); setEditing(n.id) }}>+ Добавить</button>
        </div>
        <table className="adm-table">
          <thead><tr><th>Тайл</th><th>Категория</th><th>Описание</th><th>Теги</th><th>Показывать</th><th></th></tr></thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id}>
                <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><div className={BG_CLASSES[idx%6]} style={{ width:36, height:36, borderRadius:10, flexShrink:0 }} /><span style={{ font:'600 14px/1 var(--font-sans)', color:'var(--fg-1)' }}>{item.title}</span></div></td>
                <td><span className="badge badge--dark">{item.category}</span></td>
                <td style={{ maxWidth:220 }}><span style={{ overflow:'hidden', textOverflow:'ellipsis', display:'block', whiteSpace:'nowrap' }}>{item.sub}</span></td>
                <td style={{ color:'var(--fg-3)', fontSize:12 }}>{item.tags}</td>
                <td><Toggle checked={item.visible} onChange={v => upd(item.id,'visible',v)} /></td>
                <td><div style={{ display:'flex', gap:4 }}>
                  <button className="adm-icon-btn" onClick={() => setEditing(item.id===editing ? null : item.id)}><Icon name="edit" size={15} /></button>
                  <button className="adm-icon-btn adm-icon-btn--danger" onClick={() => onChange(items.filter(i => i.id!==item.id))}><Icon name="trash" size={15} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing && (() => {
        const item = items.find(i => i.id===editing); if (!item) return null
        return (
          <div className="adm-section-card">
            <div className="adm-section-card__header"><div className="adm-section-card__title">Редактировать: {item.title}</div><button className="adm-icon-btn" onClick={() => setEditing(null)}><Icon name="minus" size={15}/></button></div>
            <div className="adm-section-card__body" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {(['title','category','sub','tags'] as const).map(k => (
                <div key={k} className="adm-field"><label className="adm-label">{k==='title'?'Название':k==='category'?'Категория':k==='sub'?'Описание':'Теги'}</label><input className="adm-input" value={item[k] as string} onChange={e => upd(item.id,k,e.target.value)} /></div>
              ))}
            </div>
          </div>
        )
      })()}
      <div className="adm-save-bar"><span className="adm-save-bar__hint">{items.filter(i=>i.visible).length} из {items.length} кейсов активны</span><button className="btn-pill" onClick={onSave}>Сохранить</button></div>
    </>
  )
}

// ── Pricing Editor ─────────────────────────────────────────────────────
function PricingEditor({ items, onChange, onSave }: { items:PricingPlan[]; onChange:(v:PricingPlan[])=>void; onSave:()=>void }) {
  const upd = (id:number, k:keyof PricingPlan, v: string|boolean) => onChange(items.map(it => it.id===id ? { ...it, [k]:v } : it))
  return (
    <>
      {items.map(item => (
        <div key={item.id} className="adm-section-card">
          <div className="adm-section-card__header">
            <div style={{ display:'flex', alignItems:'center', gap:10 }}><div className="adm-section-card__title">{item.plan}</div>{item.featured && <span className="badge badge--ember">Рекомендуемый</span>}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ font:'400 12px/1 var(--font-sans)', color:'var(--fg-3)' }}>Рекомендуемый</span><Toggle checked={item.featured} onChange={v => upd(item.id,'featured',v)} />
              <span style={{ font:'400 12px/1 var(--font-sans)', color:'var(--fg-3)', marginLeft:8 }}>Показывать</span><Toggle checked={item.visible} onChange={v => upd(item.id,'visible',v)} />
            </div>
          </div>
          <div className="adm-section-card__body" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
            {(['plan','price','period'] as const).map(k => (
              <div key={k} className="adm-field"><label className="adm-label">{k==='plan'?'Название':k==='price'?'Цена':'Период'}</label><input className="adm-input" value={item[k] as string} onChange={e => upd(item.id,k,e.target.value)} /></div>
            ))}
          </div>
        </div>
      ))}
      <div className="adm-save-bar"><span className="adm-save-bar__hint">Изменения применяются после сохранения</span><button className="btn-pill" onClick={onSave}>Сохранить тарифы</button></div>
    </>
  )
}

// ── Testimonials Editor ────────────────────────────────────────────────
const T_COLORS = ['#1d4ed8','#ff5a00','#fe45e2','#16a34a','#7c3aed']

function TestimonialsEditor({ items, onChange, onSave }: { items:TestimonialItem[]; onChange:(v:TestimonialItem[])=>void; onSave:()=>void }) {
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ name:'', role:'', quote:'', metric:'' })
  const upd = (id:number, k:keyof TestimonialItem, v: string|boolean) => onChange(items.map(it => it.id===id ? { ...it, [k]:v } : it))
  return (
    <>
      <div className="adm-section-card">
        <div className="adm-section-card__header"><div className="adm-section-card__title">Отзывы · {items.length}</div><button className="btn-pill" onClick={() => setAdding(true)}>+ Добавить</button></div>
        <div className="adm-section-card__body" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
          {items.map((t, idx) => (
            <div key={t.id} style={{ background:'var(--bg-card-muted)', borderRadius:20, padding:20, opacity: t.visible ? 1 : 0.5 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:12 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:T_COLORS[idx%T_COLORS.length], display:'flex', alignItems:'center', justifyContent:'center', font:'700 14px/1 var(--font-sans)', color:'#fff', flexShrink:0 }}>{t.name.charAt(0)}</div>
                  <div>
                    <input className="adm-input" style={{ padding:'4px 8px', borderRadius:8, fontSize:13, fontWeight:600 }} value={t.name} onChange={e => upd(t.id,'name',e.target.value)} />
                    <input className="adm-input" style={{ padding:'3px 8px', borderRadius:8, fontSize:11, marginTop:3 }} value={t.role} onChange={e => upd(t.id,'role',e.target.value)} />
                  </div>
                </div>
                <div style={{ display:'flex', gap:4 }}>
                  <Toggle checked={t.visible} onChange={v => upd(t.id,'visible',v)} />
                  <button className="adm-icon-btn adm-icon-btn--danger" onClick={() => onChange(items.filter(i => i.id!==t.id))}><Icon name="trash" size={13} /></button>
                </div>
              </div>
              <textarea className="adm-input adm-textarea" rows={3} value={t.quote} onChange={e => upd(t.id,'quote',e.target.value)} style={{ fontSize:13 }} />
              <div className="adm-field" style={{ marginTop:8, marginBottom:0 }}>
                <label className="adm-label">Метрика</label>
                <input className="adm-input" style={{ padding:'6px 10px', fontSize:12 }} value={t.metric} onChange={e => upd(t.id,'metric',e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {adding && (
        <div className="adm-modal-overlay" onClick={() => setAdding(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal__title">Новый отзыв</div>
            {(['name','role','quote','metric'] as const).map(k => (
              <div key={k} className="adm-field">
                <label className="adm-label">{k==='name'?'Имя':k==='role'?'Должность':k==='quote'?'Текст отзыва':'Метрика'}</label>
                {k==='quote' ? <textarea className="adm-input adm-textarea" rows={3} value={draft[k]} onChange={e => setDraft(p => ({...p,[k]:e.target.value}))} /> : <input className="adm-input" value={draft[k]} onChange={e => setDraft(p => ({...p,[k]:e.target.value}))} />}
              </div>
            ))}
            <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
              <button className="btn-outlined" onClick={() => setAdding(false)}>Отмена</button>
              <button className="btn-pill" onClick={() => { onChange([...items, { ...draft, id:Date.now(), visible:true }]); setDraft({ name:'',role:'',quote:'',metric:'' }); setAdding(false) }}>Добавить</button>
            </div>
          </div>
        </div>
      )}
      <div className="adm-save-bar"><span className="adm-save-bar__hint">{items.filter(t=>t.visible).length} из {items.length} опубликованы</span><button className="btn-pill" onClick={onSave}>Сохранить</button></div>
    </>
  )
}

// ── Contacts ───────────────────────────────────────────────────────────
function ContactsView({ items, onChange }: { items:ContactItem[]; onChange:(v:ContactItem[])=>void }) {
  const markRead = (id:number) => onChange(items.map(c => c.id===id ? { ...c, status:'read' } : c))
  return (
    <div className="adm-section-card">
      <div className="adm-section-card__header">
        <div className="adm-section-card__title">Заявки с сайта</div>
        <span style={{ font:'400 12px/1 var(--font-sans)', color:'var(--fg-3)' }}>{items.filter(c=>c.status==='new').length} новых · {items.length} всего</span>
      </div>
      {items.length === 0 ? (
        <div className="adm-empty"><div className="adm-empty__icon"><Icon name="message-square" size={22} color="var(--fg-3)"/></div><p className="adm-empty__text">Заявок пока нет</p></div>
      ) : (
        <table className="adm-table">
          <thead><tr><th>Имя</th><th>Контакт</th><th>О продукте</th><th>Дата</th><th>Статус</th><th></th></tr></thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id}>
                <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><div style={{ width:32, height:32, borderRadius:'50%', background:'var(--color-obsidian)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', font:'600 12px/1 var(--font-sans)', flexShrink:0 }}>{c.name.charAt(0)}</div>{c.name}</div></td>
                <td style={{ color:'var(--fg-3)', fontSize:13 }}>{c.contact}</td>
                <td style={{ maxWidth:260 }}><span style={{ overflow:'hidden', textOverflow:'ellipsis', display:'block', whiteSpace:'nowrap' }}>{c.project}</span></td>
                <td style={{ color:'var(--fg-3)', fontSize:12, whiteSpace:'nowrap' }}>{c.ts}</td>
                <td><span className={`adm-status adm-status--${c.status}`}>{c.status==='new'?'Новая':'Прочитана'}</span></td>
                <td>{c.status==='new' && <button className="adm-icon-btn" onClick={() => markRead(c.id)}><Icon name="check" size={15}/></button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// ── Settings ───────────────────────────────────────────────────────────
function SettingsEditor({ settings, onChange, onSave }: { settings:SiteSettings; onChange:(v:SiteSettings)=>void; onSave:()=>void }) {
  const f = (k: keyof SiteSettings) => ({ value: settings[k], onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...settings, [k]: e.target.value }), className: 'adm-input' })
  return (
    <>
      <div className="adm-section-card">
        <div className="adm-section-card__header"><div className="adm-section-card__title">Контакты & ссылки</div></div>
        <div className="adm-section-card__body" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="adm-field"><label className="adm-label">Telegram</label><input {...f('tgHandle')} /></div>
          <div className="adm-field"><label className="adm-label">Сайт</label><input {...f('siteUrl')} /></div>
        </div>
      </div>
      <div className="adm-section-card">
        <div className="adm-section-card__header"><div className="adm-section-card__title">SEO</div></div>
        <div className="adm-section-card__body" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className="adm-field" style={{ marginBottom:0 }}><label className="adm-label">Title</label><input {...f('seoTitle')} /></div>
          <div className="adm-field" style={{ marginBottom:0 }}><label className="adm-label">Description</label><textarea {...f('seoDesc')} className="adm-input adm-textarea" rows={2} /></div>
        </div>
      </div>
      <div className="adm-section-card">
        <div className="adm-section-card__header"><div className="adm-section-card__title">Акцентный цвет</div></div>
        <div className="adm-section-card__body">
          <div className="adm-color-row">
            <input type="color" value={settings.accent} onChange={e => onChange({ ...settings, accent:e.target.value })} className="adm-color-swatch" />
            <input {...f('accent')} style={{ maxWidth:120 }} />
          </div>
          <div style={{ display:'flex', gap:8, marginTop:14 }}>
            {['#ff5a00','#1d4ed8','#16a34a','#7c3aed','#e11d48','#0ea5e9'].map(c => (
              <button key={c} onClick={() => onChange({ ...settings, accent:c })} style={{ width:28, height:28, borderRadius:8, background:c, border: settings.accent===c ? '2px solid var(--fg-1)' : '2px solid transparent', cursor:'pointer' }} />
            ))}
          </div>
        </div>
      </div>
      <div className="adm-save-bar"><span className="adm-save-bar__hint">Настройки применяются после сохранения</span><button className="btn-pill" onClick={onSave}>Сохранить</button></div>
    </>
  )
}

// ── Page titles ────────────────────────────────────────────────────────
const TITLES: Record<string,string> = { dashboard:'Дашборд', hero:'Hero / Intro', portfolio:'Кейсы', pricing:'Тарифы', testimonials:'Отзывы', contacts:'Заявки', settings:'Настройки' }

// ── Main AdminPanel ────────────────────────────────────────────────────
export default function AdminPanel() {
  const router = useRouter()
  const [page, setPage] = useState('dashboard')
  const [data, setData] = useState<Store>(defaultStore)
  const [toast, setToast] = useState<string|null>(null)

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(STORE_KEY) || ''); if (s) setData(s) } catch {}
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }
  function save(msg='Сохранено') { localStorage.setItem(STORE_KEY, JSON.stringify(data)); setToast(msg) }
  function upd<K extends keyof Store>(k: K) { return (v: Store[K]) => setData(d => ({ ...d, [k]: v })) }

  const newContacts = data.contacts.filter(c => c.status==='new').length

  return (
    <div className="adm-shell">
      <Sidebar active={page} onNav={setPage} newCount={newContacts} onLogout={logout} />
      <main className="adm-main">
        <div className="adm-topbar">
          <div className="adm-topbar__title">{TITLES[page]}</div>
          <div className="adm-topbar__actions">
            <a href="/" target="_blank" className="adm-preview-btn"><Icon name="eye" size={14} color="#fff" />Открыть сайт</a>
          </div>
        </div>
        <div className="adm-content">
          {page==='dashboard'    && <Dashboard data={data} />}
          {page==='hero'         && <HeroEditor         hero={data.hero}          onChange={upd('hero')}         onSave={() => save('Hero сохранён')} />}
          {page==='portfolio'    && <PortfolioEditor     items={data.portfolio}    onChange={upd('portfolio')}    onSave={() => save('Кейсы сохранены')} />}
          {page==='pricing'      && <PricingEditor       items={data.pricing}      onChange={upd('pricing')}      onSave={() => save('Тарифы сохранены')} />}
          {page==='testimonials' && <TestimonialsEditor  items={data.testimonials} onChange={upd('testimonials')} onSave={() => save('Отзывы сохранены')} />}
          {page==='contacts'     && <ContactsView        items={data.contacts}     onChange={upd('contacts')} />}
          {page==='settings'     && <SettingsEditor      settings={data.settings}  onChange={upd('settings')}    onSave={() => save('Настройки сохранены')} />}
        </div>
      </main>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
