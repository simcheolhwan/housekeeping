import { useRecoilValue } from "recoil"
import { Button, Table } from "antd"
import { last, update, without } from "ramda"
import { formatAmount, formatMonth } from "../../utils/format"
import { contentsState, setItem } from "../../database/database"
import { yearState } from "../../database/year"
import Page from "../../components/Page"

const { Column } = Table

const type = "expense"
const title = "고정비"

type Row = Dictionary<number>

const CostList = ({ list }: { list: List }) => {
  const { cost } = useRecoilValue(contentsState)
  const year = useRecoilValue(yearState)

  const addMonth = async () => {
    const { month } = list[list.length - 1]
    const next = list
      .filter((item) => item.month === month)
      .map((item) => ({ ...item, amount: 0, month: month + 1 }))

    await setItem([...list, ...next], { year, type, title })
  }

  const handleClick = async (key: string, { month, ...row }: Row) => {
    const input = prompt("액수:", String(row[key]))
    const index = list.findIndex(
      (item) => item.month === month && item.content === key
    )

    if (input) {
      const next = { ...list[index], amount: Number(input) }
      await setItem(update(index, next, list), { year, type, title })
    }
  }

  const dataSource = list.reduce<Row[]>((acc, { month, content, amount }) => {
    const length = acc.length
    const index = length - 1
    const prev = acc[index]
    const cur = { [content!]: amount }

    return prev?.month === month
      ? update(index, { ...prev, ...cur, amount: prev.amount + amount }, acc)
      : [...acc, { month, ...cur, amount }]
  }, [])

  const columns = without(["month", "amount"], Object.keys(dataSource[0]))

  return (
    <Page title="고정비" extra={<Button onClick={addMonth}>다음</Button>}>
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
          <Column<Row>
            dataIndex={key}
            title={key}
            render={(value, record) => (
              <span onClick={() => handleClick(key, record)}>{value}</span>
            )}
            align="center"
            key={key}
          />
        ))}

        <Column
          dataIndex="amount"
          title="금액"
          render={formatAmount}
          align="center"
        />
      </Table>

      <section style={{ marginTop: 16 }}>
        <h2>지불 날짜</h2>
        <Table
          dataSource={Object.entries(cost)
            .map(([name, date]) => ({ name, date }))
            .sort(({ date: a }, { date: b }) => a - b)}
          pagination={false}
          size="small"
          rowKey="name"
        >
          <Column dataIndex="name" title="항목" align="center" />
          <Column
            dataIndex="date"
            title="날짜"
            render={(date) => date + "일"}
            align="center"
          />
          <Column
            dataIndex="name"
            title="금액"
            render={(name) => {
              const latest = last(dataSource)
              return latest && formatAmount(latest[name])
            }}
            align="center"
          />
        </Table>
      </section>
    </Page>
  )
}

export default CostList
