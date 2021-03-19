import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { Space, Table } from "antd"
import { stringify } from "qs"
import { formatAmount } from "../../utils/format"
import Page from "../../components/Page"
import { expenseTotalQuery, incomeTotalQuery } from "../../database/dashboard"
import AccountsTable from "./AccountsTable"

const { Column } = Table

const Dashboard = () => {
  const income = useRecoilValue(incomeTotalQuery)
  const expense = useRecoilValue(expenseTotalQuery)

  const renderLink = (type: Type) => (title: string) => {
    const search = stringify({ title })
    return <Link to={{ pathname: "/list", hash: type, search }}>{title}</Link>
  }

  return (
    <Page>
      <Space align="start" wrap>
        <Table dataSource={income.list} pagination={false} rowKey="title">
          <Column
            dataIndex="title"
            title="수입"
            render={renderLink("income")}
          />
          <Column
            dataIndex="subtotal"
            title={formatAmount(income.total)}
            render={formatAmount}
            align="right"
          />
        </Table>

        <Table dataSource={expense.list} pagination={false} rowKey="title">
          <Column
            dataIndex="title"
            title={<Link to="/expense">지출</Link>}
            render={renderLink("expense")}
          />
          <Column
            dataIndex="subtotal"
            title={formatAmount(expense.total)}
            render={formatAmount}
            align="right"
          />
        </Table>

        <AccountsTable />
      </Space>
    </Page>
  )
}

export default Dashboard
