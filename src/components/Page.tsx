import { FC, ReactNode } from "react"
import { PageHeader } from "antd"
import { useTitle } from "../routes"

interface Props {
  title?: string
  extra?: ReactNode
}

const Page: FC<Props> = ({ children, extra, ...props }) => {
  const title = useTitle()

  return (
    <PageHeader title={props.title ?? title} extra={extra}>
      {children}
    </PageHeader>
  )
}

export default Page
