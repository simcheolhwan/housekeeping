import numeral from "numeral"

export const formatAmount = (value: number) => numeral(value).format()
