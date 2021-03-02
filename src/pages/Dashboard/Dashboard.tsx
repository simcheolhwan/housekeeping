import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { Space, Table, Tooltip, Typography } from "antd"
import { stringify } from "qs"
import { formatAmount } from "../../utils/format"
import Page from "../../components/Page"
import { setAccounts } from "../../database/database"
import { expenseTotalQuery, incomeTotalQuery } from "../../database/dashboard"
import { balanceQuery, accountsTotalQuery } from "../../database/dashboard"

const { Column } = Table
const { Text } = Typography

const Dashboard = () => {
  const income = useRecoilValue(incomeTotalQuery)
  const expense = useRecoilValue(expenseTotalQuery)
  const balance = useRecoilValue(balanceQuery)
  const accounts = useRecoilValue(accountsTotalQuery)

  const renderLink = (type: Type) => (title: string) => {
    const search = stringify({ title })
    return <Link to={{ pathname: "/list", hash: type, search }}>{title}</Link>
  }

  const changeName = (name: string) => {
    const input = window.prompt("이름:", name) || ""
    const next: AccountItem[] = accounts.list.map((account) =>
      account.name === name ? { ...account, name: input } : account
    )

    input && setAccounts(next)
  }

  const changeBalance = (name: string, balance: number) => {
    const input = window.prompt("잔고:", String(balance)) || ""
    const next: AccountItem[] = accounts.list.map((account) =>
      account.name === name ? { ...account, balance: Number(input) } : account
    )

    input && setAccounts(next)
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
            title="지출"
            render={renderLink("expense")}
          />
          <Column
            dataIndex="subtotal"
            title={formatAmount(expense.total)}
            render={formatAmount}
            align="right"
          />
        </Table>

        <Table
          dataSource={[
            { name: "계좌", balance: accounts.total },
            ...accounts.list,
          ]}
          pagination={false}
          rowKey="name"
        >
          <Column
            dataIndex="name"
            title="잔액"
            render={(name) =>
              name !== "계좌" ? (
                <span onClick={() => changeName(name)}>{name}</span>
              ) : (
                name
              )
            }
          />
          <Column<{ name: string }>
            dataIndex="balance"
            title={formatAmount(balance)}
            render={(amount, { name }) => {
              const diff = balance - amount
              const content = formatAmount(amount)

              return name !== "계좌" ? (
                <span onClick={() => changeBalance(name, amount)}>
                  {content}
                </span>
              ) : diff ? (
                <Tooltip title={formatAmount(diff)}>
                  <Text type="danger">{content}</Text>
                </Tooltip>
              ) : (
                content
              )
            }}
            align="right"
          />
        </Table>
      </Space>
    </Page>
  )
}

export default Dashboard
