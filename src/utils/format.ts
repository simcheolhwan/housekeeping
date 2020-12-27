import numeral from "numeral"

export const formatAmount = (value: number) => numeral(value).format()
export const formatMonth = (value: string | number) => value + "월"
export const getMonth = () => new Date().getMonth() + 1
