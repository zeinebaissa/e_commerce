
import { Outlet } from "react-router-dom"
import SiideBar from "./SiideBar"



const DashboardLayout = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <SiideBar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
