import { selector } from "recoil"
import { contentsState } from "./database"
import { yearDataQuery } from "./year"

export const incomeTotalQuery = selector({
  key: "incomeTotal",
  get: ({ get }) => {
    const { income } = get(yearDataQuery)
    return calcTotal(income)
  },
})

export const expenseTotalQuery = selector({
  key: "expenseTotal",
  get: ({ get }) => {
    const { expense } = get(yearDataQuery)
    return calcTotal(expense)
  },
})

export const balanceQuery = selector({
  key: "balance",
  get: ({ get }) => {
    const income = get(incomeTotalQuery)
    const expense = get(expenseTotalQuery)
    return income.total - expense.total
  },
})

export const accountsTotalQuery = selector({
  key: "accountsTotal",
  get: ({ get }) => {
    const { accounts } = get(contentsState)
    const total = Object.values(accounts).reduce(
      (acc, balance) => acc + balance,
      0
    )

    const list = Object.entries(accounts).map(([name, balance]) => {
      return { name, balance }
    })

    return { total, list }
  },
})

/* calc */
const calcSubtotal = (list: List) =>
  list.reduce((acc, { amount }) => acc + amount, 0)

const parsed = (obj: Dictionary<List>) =>
  Object.entries(obj)
    .map(([title, list]) => ({ title, subtotal: calcSubtotal(list) }))
    .sort(({ subtotal: a }, { subtotal: b }) => b - a)

const calcTotal = (obj: Record<string, List>) => {
  const list = parsed(obj)
  const total = list.reduce((acc, { subtotal }) => acc + subtotal, 0)
  return { list, total }
}
