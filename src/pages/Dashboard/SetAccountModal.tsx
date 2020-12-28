import { Form, Input } from "antd"
import { useRecoilValue } from "recoil"
import SetModal from "../../components/SetModal"
import { contentsState, setAccount } from "../../database/database"

const SetAccountModal = ({ name }: { name: string }) => {
  const [form] = Form.useForm<{ name: string; amount: number }>()

  const { accounts } = useRecoilValue(contentsState)
  const initialValues = name
    ? { name, amount: accounts[name] }
    : { name: "", amount: 0 }

  const submit = async () => {
    const { name, amount } = await form.validateFields()
    await setAccount(name, Number(amount))
  }

  return (
    <SetModal
      type={name ? "edit" : "add"}
      form={{ form, initialValues }}
      submit={submit}
    >
      <Form.Item name="name" label="이름" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="amount" label="잔고 (천원)" rules={[{ required: true }]}>
        <Input type="number" autoFocus />
      </Form.Item>
    </SetModal>
  )
}

export default SetAccountModal
