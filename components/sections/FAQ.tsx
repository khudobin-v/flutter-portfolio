'use client'
import { useState } from 'react'
import Icon from '@/components/ui/Icon'

const FAQS = [
  { q: 'Если ты используешь AI, в чём моя роль как заказчика?', a: 'Ты держишь продуктовую сторону: гипотезы, юзер-сценарии, метрики. AI ускоряет ремесло — но решения о том, что делаем, и приёмка остаются за тобой. Я работаю как продакт-инженер: задаю вопросы, спорю, показываю trade-off-ы.' },
  { q: 'Точно ли AI-код безопасен и поддерживаемый?', a: 'Каждая строчка проходит через моё ревью + автотесты + статический анализ. AI не пушит код напрямую — это всегда PR ко мне. Никаких ключей, секретов или PII в промптах. Под NDA работаю с локальными моделями, если это требование.' },
  { q: 'Что если идея потребует Kotlin/Swift native?', a: 'В 95% случаев Flutter закрывает кейс. Если нужен глубокий native — пишу platform-channel или зову проверенного iOS/Android-разработчика на спринт. Это решается на discovery, до подписания брифа.' },
  { q: 'Можешь ли ты поддерживать существующий проект?', a: 'Да, retainer-тариф под это и сделан. Беру код на ревью, фиксирую техдолг, чиню P0, добавляю фичи. Если архитектура совсем сложная — отдельный спринт-аудит за фиксированный прайс.' },
  { q: 'Как считается стоимость?', a: 'Fixed-bid: после discovery я даю фиксированную цену и срок. Если по ходу скоп растёт — обсуждаем change-request заранее, не задним числом. Никаких сюрпризов в инвойсе.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="pg-section" style={{ background: 'var(--bg-card-muted)' }}>
      <div className="page">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }} className="grid-2">
          <div>
            <div className="eyebrow">FAQ</div>
            <h2 className="sec-title">Частые вопросы, <span className="accent">до того как мы созвонимся.</span></h2>
          </div>
          <div>
            {FAQS.map((f, k) => (
              <div key={k} className="faq-item">
                <div className="faq-q" onClick={() => setOpen(open === k ? -1 : k)}>
                  <span>{f.q}</span>
                  <Icon name={open === k ? 'minus' : 'plus'} size={20} color="var(--fg-1)" />
                </div>
                {open === k && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
