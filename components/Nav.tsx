export default function Nav({ darkHero = true }: { darkHero?: boolean }) {
  return (
    <header className={`nav-bar${darkHero ? ' nav-bar--dark' : ''}`}>
      <div className="page nav-inner">
        <div className="wordmark">
          <span className="wordmark__dot" />
          khudobin<span style={{ opacity: 0.5, fontWeight: 400 }}>/flutter</span>
        </div>
        <nav className="nav-links hide-mobile">
          <a href="#about">О себе</a>
          <a href="#ai">AI-стек</a>
          <a href="#work">Кейсы</a>
          <a href="#process">Процесс</a>
          <a href="#pricing">Тарифы</a>
          <a href="#contact">Контакты</a>
        </nav>
        <a href="#contact" className="btn-pill">Обсудить проект</a>
      </div>
    </header>
  )
}
