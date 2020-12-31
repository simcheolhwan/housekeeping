import { atom, selector, selectorFamily } from "recoil"
import { format } from "date-fns"
import { contentsState } from "./database"

export const yearState = atom({
  key: "year",
  default:
    new URLSearchParams(window.location.search).get("year") ||
    format(new Date(), "yyyy"),
})

export const yearDataQuery = selector({
  key: "yearData",
  get: ({ get }) => {
    const year = get(yearState)
    const { annual } = get(contentsState)
    return annual[year] ?? { income: {}, expense: {} }
  },
})

export const typeDataQuery = selectorFamily({
  key: "typeData",
  get: (type: Type) => ({ get }) => {
    const { [type]: data } = get(yearDataQuery)
    return data
  },
})
