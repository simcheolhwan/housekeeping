import { Form, Input } from "antd"
import { pickBy, update } from "ramda"
import { useRecoilValue } from "recoil"
import { getMonth } from "../../utils/format"
import SetModal from "../../components/SetModal"
import { setItem } from "../../database/database"
import { typeDataQuery, yearState } from "../../database/year"

interface Props {
  type: Type
  title: string
  index?: number
}

const SetItemModal = ({ type, title, index }: Props) => {
  const [form] = Form.useForm<Item>()

  const year = useRecoilValue(yearState)
  const data = useRecoilValue(typeDataQuery(type))
  const list = data[title]
  const initialValues = Number.isInteger(index)
    ? { ...list[index!] }
    : { month: getMonth() }

  const submit = async () => {
    const values = await form.validateFields()
    const item: Item = pickBy((value) => value, values)
    await setItem(
      Number.isInteger(index) ? update(index!, item, list) : [...list, item],
      { year, type, title }
    )
  }

  return (
    <SetModal
      type={Number.isInteger(index) ? "edit" : "add"}
      form={{ form, initialValues }}
      submit={submit}
      prefix={title}
    >
      <Form.Item name="month" label="월" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item name="category" label="분류">
        <Input />
      </Form.Item>

      <Form.Item name="content" label="내용">
        <Input />
      </Form.Item>

      <Form.Item name="memo" label="메모">
        <Input />
      </Form.Item>

      <Form.Item name="amount" label="금액 (천원)" rules={[{ required: true }]}>
        <Input type="number" autoFocus />
      </Form.Item>
    </SetModal>
  )
}

export default SetItemModal
