import { useRecoilValue } from "recoil"
import { Space, Table } from "antd"
import { formatAmount } from "../../utils/format"
import Page from "../../components/Page"
import { expenseTotalQuery, incomeTotalQuery } from "../../database/dashboard"
import { balanceQuery, accountsTotalQuery } from "../../database/dashboard"

const { Column } = Table

const Dashboard = () => {
  const income = useRecoilValue(incomeTotalQuery("2020"))
  const expense = useRecoilValue(expenseTotalQuery("2020"))
  const balance = useRecoilValue(balanceQuery("2020"))
  const accounts = useRecoilValue(accountsTotalQuery)

  return (
    <Page>
      <Space align="start">
        <Table dataSource={income.list} pagination={false} rowKey="title">
          <Column dataIndex="title" title="수입" />
          <Column
            dataIndex="subtotal"
            title={formatAmount(income.total)}
            render={formatAmount}
            align="right"
          />
        </Table>

        <Table dataSource={expense.list} pagination={false} rowKey="title">
          <Column dataIndex="title" title="지출" />
          <Column
            dataIndex="subtotal"
            title={formatAmount(expense.total)}
            render={formatAmount}
            align="right"
          />
        </Table>

        <Table
          dataSource={[
            { name: "합계", balance: accounts.total },
            ...accounts.list,
          ]}
          pagination={false}
          rowKey="name"
        >
          <Column dataIndex="name" title="계좌" />
          <Column
            dataIndex="balance"
            title={formatAmount(balance)}
            render={formatAmount}
            align="right"
          />
        </Table>
      </Space>
    </Page>
  )
}

export default Dashboard
