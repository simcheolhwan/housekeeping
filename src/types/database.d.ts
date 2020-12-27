interface Database {
  accounts: Dictionary<number>
  annual: Dictionary<Year>
}

interface Year {
  income: {
    salary: List
    bonus: List
    sale: List
  }
  expense: {
    tax: List
    cost: List
    consume: List
    invest: List
  }
}

type List = Item[]
interface Item {
  M: number
  amount: number
}
