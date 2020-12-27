import { useEffect } from "react"
import { atom, selector, useSetRecoilState } from "recoil"
import { db } from "../firebase"

const initial = {
  accounts: {},
  annual: {},
}

const init = () => {
  const local = localStorage.getItem("database")
  const parsed: Database = JSON.parse(local!)

  return parsed
    ? { state: "hasValue" as const, contents: parsed }
    : { state: "loading" as const, contents: initial }
}

export const databaseState = atom<Loadable<Database>>({
  key: "database",
  default: init(),
})

export const loadingState = selector({
  key: "loading",
  get: ({ get }) => {
    const { state } = get(databaseState)
    return state === "loading"
  },
})

export const contentsState = selector({
  key: "contents",
  get: ({ get }) => {
    const { contents } = get(databaseState)
    return { ...contents }
  },
})

export const useDatabase = () => {
  const setDatabase = useSetRecoilState(databaseState)

  useEffect(() => {
    db.ref().on("value", (snapshot) => {
      const contents = snapshot.val() || initial
      setDatabase({ state: "hydrated", contents })
      localStorage.setItem("database", JSON.stringify(contents))
    })
  }, [setDatabase])
}

export const setItem = async (
  list: List,
  { year, type, title }: { year: string; type: Type; title: string }
) => await db.ref(`/annual/${year}/${type}/${title}`).set(list)
