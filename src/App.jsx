import { useMemo, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './hooks/useTheme'
import { STORAGE_KEY } from './utils/constants'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import FilterBar from './components/FilterBar'

const SEED_TRANSACTIONS = []

export default function App() {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEY, SEED_TRANSACTIONS)
  const [filters, setFilters] = useState({ search: '', type: 'all', category: 'all' })
  const [editingId, setEditingId] = useState(null)
  const [theme, toggleTheme] = useTheme()

  function addTransaction(tx) {
    if (editingId) {
      setTransactions((prev) => prev.map((t) => (t.id === editingId ? { ...tx, id: editingId } : t)))
      setEditingId(null)
    } else {
      setTransactions((prev) => [tx, ...prev])
    }
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function startEdit(tx) {
    setEditingId(tx.id)
  }

  const editingTx = transactions.find((t) => t.id === editingId) ?? null

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => filters.type === 'all' || t.type === filters.type)
      .filter((t) => filters.category === 'all' || t.category === filters.category)
      .filter((t) => t.description.toLowerCase().includes(filters.search.toLowerCase()))
      .sort((a, b) => new Date(b.date) - new Date(a.date) || b.createdAt - a.createdAt)
  }, [transactions, filters])

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    return { income, expenses, balance: income - expenses }
  }, [transactions])

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 20V10M12 20V4M20 20v-7" strokeLinecap="round"/></svg>
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-semibold text-ink">Ledger</h1>
              <p className="text-xs text-ink-soft">Personal expense tracker</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full border border-line text-ink-soft hover:text-forest hover:border-forest transition-colors"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <SummaryCards income={totals.income} expenses={totals.expenses} balance={totals.balance} />

        {editingId && (
          <div className="flex items-center justify-between bg-navy-soft border border-line rounded-xl px-4 py-2.5">
            <p className="text-sm text-navy font-medium">Editing "{editingTx?.description}"</p>
            <button onClick={() => setEditingId(null)} className="text-xs font-medium text-ink-soft hover:text-ink">
              Cancel
            </button>
          </div>
        )}
        <TransactionForm key={editingId ?? 'new'} onAdd={addTransaction} initial={editingTx} />

        <FilterBar filters={filters} onChange={setFilters} />

        <TransactionList transactions={filtered} onDelete={deleteTransaction} onEdit={startEdit} />
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-xs text-ink-soft">
 
  <span className="mt-1 inline-block">
    Designed &amp; developed by Mahip
<br />
    <a
      href="https://portfolio-bq8v.onrender.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-forest hover:underline"
    >
      Tap Here!!!!!!!!!
    </a>
  </span>
</footer>
    </div>
  )
}
