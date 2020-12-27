import { useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { Space, Table } from "antd"
import { formatAmount, formatMonth } from "../../utils/format"
import Page from "../../components/Page"
import { yearDataQuery } from "../../database/dashboard"
import CostList from "./CostList"

const { Column } = Table

const List = () => {
  const { hash, search } = useLocation()
  const params = new URLSearchParams(search)
  const title = params.get("title") as string
  const type = hash.replace("#", "") as Type

  const { [type]: data } = useRecoilValue(yearDataQuery)
  const list = data[title]
  const dataSource = list.map((item, index) => ({ ...item, index }))

  return title === "고정비" ? (
    <CostList list={list} />
  ) : (
    <Page title={title}>
      <Space>
        <Table dataSource={dataSource} pagination={false} rowKey="index">
          <Column
            dataIndex="month"
            title="날짜"
            render={formatMonth}
            align="center"
          />

          {dataSource.some(({ category }) => category) && (
            <Column dataIndex="category" title="분류" align="center" />
          )}

          {dataSource.some(({ content }) => content) && (
            <Column dataIndex="content" title="내용" align="center" />
          )}

          {dataSource.some(({ memo }) => memo) && (
            <Column dataIndex="memo" title="메모" align="center" />
          )}

          <Column
            dataIndex="amount"
            title="금액"
            render={formatAmount}
            align="right"
          />
        </Table>
      </Space>
    </Page>
  )
}

export default List
