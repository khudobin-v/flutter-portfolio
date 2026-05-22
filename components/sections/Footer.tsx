export default function Footer() {
  return (
    <footer className="page footer">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div className="wordmark" style={{ color: 'var(--fg-1)' }}>
          <span className="wordmark__dot" />
          khudobin<span style={{ opacity: 0.5, fontWeight: 400 }}>/flutter</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <a href="https://t.me/khudobin_v">@khudobin_v</a>
          <a href="https://khudobin-flutter.ru">khudobin-flutter.ru</a>
        </div>
        <div style={{ color: 'var(--fg-4)', font: '400 12px/1.4 var(--font-sans)' }}>
          © 2026 Худобин В. · Сделано с&nbsp;Claude Code · Cursor · Codex
        </div>
      </div>
    </footer>
  )
}
