import { formatCurrency } from '../utils/constants'

export default function SummaryCards({ income, expenses, balance }) {
  const cards = [
    { label: 'Total income', value: income, tone: 'income', sign: '+' },
    { label: 'Total expenses', value: expenses, tone: 'expense', sign: '−' },
    { label: 'Current balance', value: balance, tone: 'navy', sign: balance < 0 ? '−' : '' },
  ]

  const toneClasses = {
    income: { bg: 'bg-income-soft', text: 'text-income' },
    expense: { bg: 'bg-expense-soft', text: 'text-expense' },
    navy: { bg: 'bg-navy-soft', text: 'text-navy' },
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((card) => {
        const tone = toneClasses[card.tone]
        return (
          <div key={card.label} className={`rounded-2xl border border-line p-4 ${tone.bg}`}>
            <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">{card.label}</p>
            <p className={`tabular text-2xl font-semibold ${tone.text}`}>
              {card.sign}{formatCurrency(Math.abs(card.value))}
            </p>
          </div>
        )
      })}
    </div>
  )
}
