import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { Select, Space, Tabs } from "antd"
import { uniq } from "ramda"
import { formatMonth } from "../../utils/format"
import { typeDataQuery } from "../../database/year"
import Page from "../../components/Page"
import CommonList from "./CommonList"
import CostList from "./CostList"
import SetItemModal from "./SetItemModal"

const { TabPane } = Tabs
const { Option } = Select

const List = () => {
  const { hash, search } = useLocation()
  const params = new URLSearchParams(search)
  const title = params.get("title") as string
  const type = hash.replace("#", "") as Type

  /* data */
  const data = useRecoilValue(typeDataQuery(type))
  const list = data[title]
  const indexed = list.map((item, index) => ({ ...item, index }))

  /* filter */
  const [month, setMonth] = useState<string>("")
  const [cat, setCat] = useState<string>("")
  const showFilter = title === "소비"

  const months = ["", ...uniq(indexed.map(({ month }) => month))]
  const categories = uniq(
    indexed.map(({ category }) => category).filter((category) => category)
  ) as string[]

  const filtered = indexed.filter(
    (item) =>
      (!month || item.month === Number(month)) &&
      (!cat || item.category === cat)
  )

  return title === "고정비" ? (
    <CostList list={list} />
  ) : (
    <Page title={title} extra={<SetItemModal type={type} title={title} />}>
      {!showFilter ? (
        <CommonList type={type} title={title} dataSource={indexed} />
      ) : (
        <Tabs activeKey={month} onChange={setMonth}>
          {months.map((value) => (
            <TabPane tab={!value ? "전체" : formatMonth(value)} key={value}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Select value={cat} onChange={setCat} style={{ width: 120 }}>
                  <Option value="">전체</Option>

                  {categories.map((value) => (
                    <Option value={value} key={value}>
                      {value}
                    </Option>
                  ))}
                </Select>

                <CommonList type={type} title={title} dataSource={filtered} />
              </Space>
            </TabPane>
          ))}
        </Tabs>
      )}
    </Page>
  )
}

export default List
