# Ledger — Expense Tracker

A personal expense tracking app built with React and Tailwind CSS. Log income and expenses, see your balance update instantly, and keep everything stored locally in your browser.

## Features

- Add income and expense transactions with description, amount, category, and date
- Edit or delete any transaction
- Automatic totals for income, expenses, and current balance
- Summary cards with an at-a-glance financial overview
- Search transactions and filter by type (income/expense) or category
- Dark mode, with your preference remembered
- All data persisted to `localStorage` — refresh the page and your transactions are still there
- Fully responsive, from mobile to desktop

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Project structure

```
src/
  components/
    FilterBar.jsx        # search + type/category filters
    SummaryCards.jsx      # income/expense/balance cards
    TransactionForm.jsx    # add/edit transaction form
    TransactionList.jsx     # ledger-style transaction table
  hooks/
    useLocalStorage.js      # generic persisted-state hook
    useTheme.js              # dark/light mode hook
  utils/
    constants.js              # categories, currency formatting, storage keys
  App.jsx
  index.css
  main.jsx
```

## Notes

This app stores data in your browser's `localStorage`, so transactions are private to your device and browser. Clearing your browser data will remove them.
