import numeral from "numeral"

export const formatMonth = (value: number) => value + "월"
export const formatAmount = (value: number) => numeral(value).format()
