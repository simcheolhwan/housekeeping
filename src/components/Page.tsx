import { FC, ReactNode } from "react"
import { PageHeader } from "antd"
import { useTitle } from "../routes"

const Page: FC<{ extra?: ReactNode }> = ({ children, extra }) => {
  const title = useTitle()

  return (
    <PageHeader title={title} extra={extra}>
      {children}
    </PageHeader>
  )
}

export default Page
