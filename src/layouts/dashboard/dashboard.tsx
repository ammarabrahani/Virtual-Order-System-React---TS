import "../../assets/scss/dashboard.scss";
import { Layout, Menu, Popover, Avatar } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import Logo from "../../assets/images/logo.png";
const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="admin_layouts">
      <Layout style={{ background: "white" }}>
        <Sider
          width={280}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <div
            style={{
              padding: "0 10px",
            }}
          >
            <div className="logo">
              <Link to="">
                <img src={Logo} alt="" />
              </Link>
              <h3
                className="head"
                style={{
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: 0,
                  paddingLeft: "8px",
                  textTransform: "uppercase",
                }}
              >
                Vo Distributions
              </h3>
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["principals"]}
              items={[
                {
                  key: "dashboard",
                  label: <Link to="/">Dashboard</Link>,
                },
                {
                  key: "principals",
                  label: <Link to="/principals">Principals</Link>,
                },
                {
                  key: "orders",
                  label: <Link to="/orders">Orders</Link>,
                },
              ]}
            />
          </div>
        </Sider>
        <Layout>
          <Header>
            <div className="btn">
              <Popover
                placement="bottomRight"
                content={
                  <div>
                    <Link to="/login" onClick={logout}>
                      Logout
                    </Link>
                  </div>
                }
                trigger="click"
              >
                <Avatar
                  style={{ cursor: "pointer" }}
                  size={32}
                  icon={<UserOutlined />}
                />
              </Popover>
            </div>
          </Header>
          <Content style={{ padding: "20px" }}>
            <div className="" style={{ paddingBottom: "30px" }}>
              <Outlet />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            {"Copyright © "}
            <Link style={{ color: "#000" }} to="#">
              <b> Virtual Order</b>
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
