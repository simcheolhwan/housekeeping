import { useLocation } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import Expense from "./pages/Expense/Expense"

const routes = [
  { path: "/", label: "대시보드", component: Dashboard },
  { path: "/expense", label: "지출", component: Expense },
]

export const useTitle = () => {
  const { pathname } = useLocation()
  return routes.find(({ path }) => path === pathname)?.label
}

export default routes
