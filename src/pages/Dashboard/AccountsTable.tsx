import { useRecoilValue } from "recoil"
import { Table, Tooltip, Typography } from "antd"
import { InsertRowBelowOutlined, DeleteOutlined } from "@ant-design/icons"
import { formatAmount } from "../../utils/format"
import { setAccounts } from "../../database/database"
import { balanceQuery, accountsTotalQuery } from "../../database/dashboard"
import { insert } from "ramda"

const { Column } = Table
const { Text } = Typography

const AccountsTable = () => {
  const balance = useRecoilValue(balanceQuery)
  const accounts = useRecoilValue(accountsTotalQuery)

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

  const addColumn = (index: number) => {
    const input = window.prompt("이름:") || ""
    const next: AccountItem[] = insert(
      index + 1,
      { name: input, balance: 0 },
      accounts.list
    )

    input && setAccounts(next)
  }

  const removeColumn = (index: number) => {
    const confirm = window.confirm(`${accounts.list[index].name} 삭제`)
    const next: AccountItem[] = accounts.list.filter((_, i) => i !== index)
    confirm && setAccounts(next)
  }

  const dataSource = [
    { name: "계좌", balance: accounts.total },
    ...accounts.list.map((item, index) => ({ ...item, index })),
  ]

  return (
    <Table dataSource={dataSource} pagination={false} rowKey="name">
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
        render={(account, { name }) => {
          const content = formatAmount(account)

          const diff = account - balance
          const prefix = "계좌에"
          const suffix = diff > 0 ? "많음" : "적음"
          const tooltip = [prefix, formatAmount(Math.abs(diff)), suffix]

          return name !== "계좌" ? (
            <span onClick={() => changeBalance(name, account)}>{content}</span>
          ) : diff ? (
            <Tooltip title={tooltip.join(" ")}>
              <Text type="danger">{content}</Text>
            </Tooltip>
          ) : (
            content
          )
        }}
        align="right"
      />
      <Column<{ name: string }>
        dataIndex="index"
        render={(index, { name }) =>
          name !== "계좌" ? (
            <>
              <span style={{ padding: 5 }} onClick={() => addColumn(index)}>
                <InsertRowBelowOutlined />
              </span>

              <span style={{ padding: 5 }} onClick={() => removeColumn(index)}>
                <DeleteOutlined />
              </span>
            </>
          ) : undefined
        }
      />
    </Table>
  )
}

export default AccountsTable
