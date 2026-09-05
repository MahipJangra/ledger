import { useState } from 'react'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/constants'

const today = () => new Date().toISOString().slice(0, 10)

export default function TransactionForm({ onAdd, initial }) {
  const [type, setType] = useState(initial?.type ?? 'expense')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [amount, setAmount] = useState(initial ? String(initial.amount) : '')
  const [category, setCategory] = useState(initial?.category ?? EXPENSE_CATEGORIES[0].id)
  const [customCategory, setCustomCategory] = useState(
    initial && !['salary', 'fees', 'other'].includes(initial.category) ? initial.category : ''
  )
  const [date, setDate] = useState(initial?.date ?? today())
  const [error, setError] = useState('')

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  function switchType(next) {
    setType(next)
    setCategory((next === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES)[0].id)
    setCustomCategory('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const numericAmount = parseFloat(amount)

    if (!description.trim()) {
      setError('Add a short description for this transaction.')
      return
    }
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Enter an amount greater than zero.')
      return
    }
    if (!date) {
      setError('Choose a date for this transaction.')
      return
    }
    if (category === 'other' && !customCategory.trim()) {
      setError('Type a name for the "Other" category.')
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      type,
      description: description.trim(),
      amount: Math.round(numericAmount * 100) / 100,
      category: category === 'other' ? customCategory.trim() : category,
      date,
      createdAt: Date.now(),
    })

    setDescription('')
    setAmount('')
    setCustomCategory('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-line p-4 sm:p-5">
      <div className="flex gap-1 bg-page rounded-lg p-1 mb-4 w-fit">
        <button
          type="button"
          onClick={() => switchType('expense')}
          className={`text-xs font-semibold px-4 py-1.5 rounded-md transition-colors ${
            type === 'expense' ? 'bg-expense text-white' : 'text-ink-soft hover:text-ink'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => switchType('income')}
          className={`text-xs font-semibold px-4 py-1.5 rounded-md transition-colors ${
            type === 'income' ? 'bg-income text-white' : 'text-ink-soft hover:text-ink'
          }`}
        >
          Income
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          type="text"
          value={description}
          onChange={(e) => { setDescription(e.target.value); if (error) setError('') }}
          placeholder="Description"
          className="bg-page border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-forest transition-colors sm:col-span-2 lg:col-span-1"
        />

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft text-sm">₹</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); if (error) setError('') }}
            placeholder="0.00"
            className="w-full bg-page border border-line rounded-lg pl-6 pr-3 py-2 text-sm tabular outline-none focus:border-forest transition-colors"
          />
        </div>

        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); if (error) setError('') }}
          className="bg-page border border-line rounded-lg px-2.5 py-2 text-sm outline-none focus:border-forest"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-page border border-line rounded-lg px-2.5 py-2 text-sm outline-none focus:border-forest"
        />
      </div>

      {category === 'other' && (
        <input
          type="text"
          value={customCategory}
          onChange={(e) => { setCustomCategory(e.target.value); if (error) setError('') }}
          placeholder="Type category name"
          className="mt-3 w-full bg-page border border-forest rounded-lg px-3 py-2 text-sm outline-none"
        />
      )}

      {error && <p className="mt-3 text-sm text-expense font-medium">{error}</p>}

      <button
        type="submit"
        className="mt-4 w-full sm:w-auto bg-forest hover:opacity-90 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-opacity"
      >
        {initial ? 'Save changes' : 'Add transaction'}
      </button>
    </form>
  )
}