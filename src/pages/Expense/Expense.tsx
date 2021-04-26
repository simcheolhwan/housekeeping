import { useRecoilValue } from "recoil"
import { Space, Table } from "antd"
import { formatAmount } from "../../utils/format"
import { calcSubtotal } from "../../database/dashboard"
import { yearDataQuery } from "../../database/year"
import Page from "../../components/Page"

type ByMonth = Dictionary<number>
type ByYear = ByMonth[]

const { Column } = Table
const months = Array.from({ length: 12 }, (_, i) => i + 1)

const Expense = () => {
  const { expense } = useRecoilValue(yearDataQuery)
  const keys = Object.keys(expense).filter((key) => key !== "세금")

  const collectMonthData = (month: number) =>
    keys.reduce<ByMonth>((acc, key) => {
      const byMonth = expense[key].filter((item) => item.month === month)
      const isLivingCost = ({ content }: Item) => content === "생활비"
      const isNotLivingCost = ({ content }: Item) => content !== "생활비"
      const fixedCost = {
        고정비: calcSubtotal(byMonth.filter(isNotLivingCost)),
        생활비: calcSubtotal(byMonth.filter(isLivingCost)),
      }

      return ["투자", "차량"].includes(key)
        ? acc
        : Object.assign(
            {},
            acc,
            key === "고정비" ? fixedCost : { [key]: calcSubtotal(byMonth) }
          )
    }, {})

  const byYear = months.reduce<ByYear>(
    (acc, month) => [...acc, collectMonthData(month)],
    []
  )

  const data = byYear
    .map((month, index) => {
      const dataSource = Object.entries(month).map(([key, amount]) => {
        return { key, amount }
      })

      const title = index + 1 + "월"
      const total = calcSubtotal(dataSource)

      return { dataSource, title, total }
    })
    .filter(({ total }) => total)

  return (
    <Page>
      <Space align="start" wrap>
        {data.map(({ dataSource, title, total }) => (
          <Table
            dataSource={dataSource}
            pagination={false}
            rowKey="key"
            key={title}
          >
            <Column dataIndex="key" title={title} align="center" />
            <Column
              dataIndex="amount"
              title={formatAmount(total)}
              render={formatAmount}
              align="right"
            />
          </Table>
        ))}
      </Space>
    </Page>
  )
}

export default Expense
