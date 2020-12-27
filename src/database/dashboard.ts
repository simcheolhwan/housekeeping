import { selector, selectorFamily } from "recoil"
import { contentsState } from "./database"

export const yearDataQuery = selectorFamily({
  key: "year",
  get: (year: string) => ({ get }) => {
    const { annual } = get(contentsState)
    return annual[year]
  },
})

export const incomeTotalQuery = selectorFamily({
  key: "incomeTotal",
  get: (year: string) => ({ get }) => {
    const { income } = get(yearDataQuery(year))
    return calcTotal(income)
  },
})

export const expenseTotalQuery = selectorFamily({
  key: "expenseTotal",
  get: (year: string) => ({ get }) => {
    const { expense } = get(yearDataQuery(year))
    return calcTotal(expense)
  },
})

export const balanceQuery = selectorFamily({
  key: "balance",
  get: (year: string) => ({ get }) => {
    const income = get(incomeTotalQuery(year))
    const expense = get(expenseTotalQuery(year))
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
const title: Dictionary<string> = {
  salary: "급여",
  bonus: "상여금",
  sale: "판매",
  tax: "세금",
  cost: "고정비",
  consume: "소비",
  invest: "투자",
}

const calcSubtotal = (list: List) =>
  list.reduce((acc, { amount }) => acc + amount, 0)

const parsed = (obj: Record<string, List>) =>
  Object.entries(obj).map(([name, list]) => ({
    title: title[name],
    subtotal: calcSubtotal(list),
  }))

const calcTotal = (obj: Record<string, List>) => {
  const list = parsed(obj)
  const total = list.reduce((acc, { subtotal }) => acc + subtotal, 0)
  return { list, total }
}
