import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/constants'

export default function FilterBar({ filters, onChange }) {
  const categories = filters.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  return (
    <div className="bg-surface rounded-2xl border border-line p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search transactions..."
          className="w-full bg-page border border-line rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-forest transition-colors"
        />
      </div>

      <div className="flex gap-1 bg-page rounded-lg p-1">
        {['all', 'income', 'expense'].map((t) => (
          <button
            key={t}
            onClick={() => onChange({ ...filters, type: t, category: 'all' })}
            className={`text-xs font-medium px-3 py-1.5 rounded-md capitalize transition-colors ${
              filters.type === t ? 'bg-navy text-white' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        disabled={filters.type === 'all'}
        className="bg-page border border-line rounded-lg px-2.5 py-2 text-sm outline-none focus:border-forest disabled:opacity-50"
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>
    </div>
  )
}
