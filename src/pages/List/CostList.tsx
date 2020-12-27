import { Table } from "antd"
import { update, without } from "ramda"
import { formatAmount, formatMonth } from "../../utils/format"
import Page from "../../components/Page"

const { Column } = Table

const CostList = ({ list }: { list: List }) => {
  const dataSource = list.reduce<Dictionary<number>[]>(
    (acc, { month, content, amount }) => {
      const length = acc.length
      const index = length - 1
      const prev = acc[index]
      const cur = { [content!]: amount }

      return prev?.month === month
        ? update(index, { ...prev, ...cur, amount: prev.amount + amount }, acc)
        : [...acc, { month, ...cur, amount }]
    },
    []
  )

  const columns = without(["month", "amount"], Object.keys(dataSource[0]))

  return (
    <Page title="고정비">
      <Table
        dataSource={dataSource}
        pagination={false}
        size="small"
        rowKey="month"
        scroll={{ x: true }}
      >
        <Column
          dataIndex="month"
          title="날짜"
          render={formatMonth}
          align="center"
        />

        {columns.map((key) => (
          <Column dataIndex={key} title={key} align="center" key={key} />
        ))}

        <Column
          dataIndex="amount"
          title="금액"
          render={formatAmount}
          align="center"
        />
      </Table>
    </Page>
  )
}

export default CostList
