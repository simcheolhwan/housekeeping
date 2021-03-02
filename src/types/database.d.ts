interface AccountItem {
  name: string
  balance: number
}

interface Database {
  accounts: AccountItem[]
  annual: Dictionary<Year>
  cost: Dictionary<number>
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
