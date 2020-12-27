import { Table } from "antd"
import { calcSubtotal } from "../../database/dashboard"
import { formatAmount, formatMonth } from "../../utils/format"
import SetItemModal from "./SetItemModal"

const { Column } = Table

interface Props {
  type: Type
  title: string
  dataSource: Item[]
}

const CommonList = ({ type, title, dataSource }: Props) => {
  return (
    <Table
      dataSource={dataSource}
      pagination={false}
      size="small"
      rowKey="index"
      scroll={{ x: true }}
    >
      <Column
        dataIndex="month"
        title="날짜"
        render={formatMonth}
        align="center"
      />

      {dataSource.some(({ category }) => category) && (
        <Column dataIndex="category" title="분류" align="center" />
      )}

      {dataSource.some(({ content, memo }) => content || memo) && (
        <Column<Item>
          dataIndex="content"
          title="내용"
          render={(content = "", { memo }) =>
            memo ? `${content} (${memo})` : content
          }
          align="center"
        />
      )}

      <Column
        dataIndex="amount"
        title={formatAmount(calcSubtotal(dataSource))}
        render={formatAmount}
        align="center"
      />

      <Column
        dataIndex="index"
        render={(index) => (
          <SetItemModal type={type} title={title} index={index} />
        )}
        align="center"
      />
    </Table>
  )
}

export default CommonList
