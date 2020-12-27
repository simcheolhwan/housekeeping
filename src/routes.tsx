import { useLocation } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"

const routes = [{ path: "/", label: "대시보드", component: Dashboard }]

export const useTitle = () => {
  const { pathname } = useLocation()
  return routes.find(({ path }) => path === pathname)?.label
}

export default routes
