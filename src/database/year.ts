import { atom, selector, selectorFamily } from "recoil"
import { contentsState } from "./database"

export const yearState = atom({ key: "year", default: "2020" })

export const yearDataQuery = selector({
  key: "yearData",
  get: ({ get }) => {
    const year = get(yearState)
    const { annual } = get(contentsState)
    return annual[year]
  },
})

export const typeDataQuery = selectorFamily({
  key: "typeData",
  get: (type: Type) => ({ get }) => {
    const { [type]: data } = get(yearDataQuery)
    return data
  },
})
