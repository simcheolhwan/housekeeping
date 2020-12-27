interface Database {
  accounts: Dictionary<number>
  annual: Dictionary<Year>
}

interface Year {
  income: Dictionary<List>
  expense: Dictionary<List>
}

type Type = "income" | "expense"
type List = Item[]

interface Item {
  month: number
  amount: number
  category?: string
  content?: string
  memo?: string
}