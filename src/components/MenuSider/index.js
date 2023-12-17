import { Menu } from "antd"
import { DashboardOutlined, ControlOutlined, LineChartOutlined, CloudOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
function MenuSider() {
    const items = [
        {
            label: <Link to={"/admin"}>Tổng quan</Link>,
            icon: <DashboardOutlined />,
            key: "dashboard"
        },
        {
            label: <Link to={"/controller"}>Điều khiển</Link>,
            icon: <ControlOutlined />,
            key: "controller"
        },
        {
            label: <Link to={"/charts"}>Biểu đồ</Link>,
            icon: <LineChartOutlined />,
            key: "charts"
        },
        {
            label: <Link to={"/weathers"}>Dự báo thời tiết</Link>,
            icon: <CloudOutlined />,
            key: "weathers"
        }
    ]
    return (
        <>
            <Menu items={items} mode="vertical" defaultSelectedKeys={["dashboard"]}></Menu>
        </>
    )
}
export default MenuSider