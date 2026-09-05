export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', color: '#B5502A' },
  { id: 'transport', label: 'Transport', color: '#946B1F' },
  { id: 'housing', label: 'Housing', color: '#5B4B8A' },
  { id: 'utilities', label: 'Utilities', color: '#2C6E8E' },
  { id: 'entertainment', label: 'Entertainment', color: '#B23A6B' },
  { id: 'health', label: 'Health', color: '#1E8E5A' },
  { id: 'other', label: 'Other', color: '#667169' },
]

export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', color: '#1E8E5A' },
  { id: 'fees', label: 'Fees', color: '#14532D' },
{ id: 'investment', label: 'Investment', color: '#1B2A4A' },
{ id: 'gift', label: 'Gift', color: '#946B1F' },
  { id: 'other', label: 'Other', color: '#667169' },
]

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]

export const STORAGE_KEY = 'ledger.transactions.v1'
export const THEME_KEY = 'ledger.theme.v1'

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)
}

export function categoryFor(id, type) {
  const list = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
  const found = list.find((c) => c.id === id)
  if (found) return found
  return { id, label: id, color: '#667169' }
}
