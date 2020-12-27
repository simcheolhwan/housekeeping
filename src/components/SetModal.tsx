import React, { FC } from "react"
import { Button, Modal, Form } from "antd"
import { FormProps } from "antd/lib/form"
import useModal from "./useModal"

interface Props {
  form: FormProps
  type: "add" | "edit"
  submit: () => Promise<void>
  prefix?: string
}

const SetModal: FC<Props> = ({ form, type, submit, children, prefix }) => {
  const { isOpen, open, close } = useModal()

  const onSet = async () => {
    await submit()
    close()
  }

  /* render */
  const withPrefix = (str: string) => [prefix, str].filter(Boolean).join(" ")
  const button = {
    add: { type: "default" as const, children: "추가하기" },
    edit: { type: "text" as const, children: "편집" },
  }

  return (
    <>
      <Button {...button[type]} onClick={open} />

      <Modal
        title={withPrefix(button[type].children)}
        visible={isOpen}
        onOk={onSet}
        onCancel={close}
      >
        <Form {...form} layout="vertical">
          {children}
        </Form>
      </Modal>
    </>
  )
}

export default SetModal
