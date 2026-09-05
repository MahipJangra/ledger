import { categoryFor, formatCurrency } from '../utils/constants'

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-14 text-ink-soft bg-surface rounded-2xl border border-line">
        <p className="font-display text-lg text-ink mb-1">No transactions yet</p>
        <p className="text-sm">Add your first income or expense above.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-2xl border border-line overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1fr_120px_120px_110px_auto] gap-3 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft border-b border-line">
        <span>Description</span>
        <span>Category</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
        <span></span>
      </div>

      <div className="divide-y divide-line max-h-[560px] overflow-y-auto scrollbar-thin">
        {transactions.map((t) => {
          const cat = categoryFor(t.category, t.type)
          const isIncome = t.type === 'income'
          return (
            <div
              key={t.id}
              className="group grid grid-cols-2 sm:grid-cols-[1fr_120px_120px_110px_auto] gap-2 sm:gap-3 items-center px-5 py-3 hover:bg-page/60 transition-colors"
            >
              <p className="font-medium text-[14px] text-ink truncate col-span-2 sm:col-span-1">{t.description}</p>

              <span
                className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium w-fit"
                style={{ color: cat.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.label}
              </span>

              <span className="hidden sm:block text-[12px] text-ink-soft tabular">{formatDate(t.date)}</span>

              <span className={`tabular text-[14px] font-semibold text-right ${isIncome ? 'text-income' : 'text-expense'}`}>
                {isIncome ? '+' : '−'}{formatCurrency(t.amount)}
              </span>

              <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                <button
                  onClick={() => onEdit(t)}
                  aria-label="Edit transaction"
                  className="p-1.5 rounded-lg text-ink-soft hover:text-forest hover:bg-forest-soft transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  aria-label="Delete transaction"
                  className="p-1.5 rounded-lg text-ink-soft hover:text-expense hover:bg-expense-soft transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"/></svg>
                </button>
              </div>

              <div className="flex sm:hidden items-center justify-between col-span-2 -mt-1">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium" style={{ color: cat.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.label} · {formatDate(t.date)}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => onEdit(t)} aria-label="Edit transaction" className="p-1 text-ink-soft hover:text-forest">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                  </button>
                  <button onClick={() => onDelete(t.id)} aria-label="Delete transaction" className="p-1 text-ink-soft hover:text-expense">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
