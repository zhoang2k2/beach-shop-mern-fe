import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";

function UserNavbar() {
  const items_1 = [
    {
      key: "home",
      label: "Home",
    },
    {
      key: "about",
      label: "About",
    },
    {
      key: "order",
      label: "Order",
    },
    {
      key: "admin",
      label: "Admin",
    },
  ];

  const al_items_1 = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "about",
      label: "About",
    },
    {
      key: "order",
      label: "Order",
    },
    {
      key: "admin",
      label: "Admin",
    },
  ];

  const items_2 = [
    {
      key: "cart",
      label: <ShoppingCartOutlined />,
    },
    {
      key: "user",
      label: <UserOutlined />,
    },
  ];

  const styleNav = {
    height: "100%",
    fontSize: 18,
    alignItems: "center",
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div
        className="navbar"
        style={{
          height: 75,
          alignItems: "center",
        }}
      >
        <div style={{ width: 125 }} className="moblie-navbar-items">
          <Button
            className="nav-btn"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined className="nav-btn-1"/> : <MenuFoldOutlined />}
          </Button>
          {collapsed ? (
            ""
          ) : (
            <Menu
              defaultSelectedKeys={["home"]}
              mode="inline"
              theme="light"
              items={al_items_1}
            />
          )}
        </div>

        <div className="logo">LOGO</div>

        <Menu
          items={items_1}
          mode="horizontal"
          style={styleNav}
          defaultSelectedKeys={["home"]}
          className="desktop-navbar-items"
        />

        <Menu items={items_2} mode="horizontal" style={styleNav} />
      </div>
    </>
  );
}

export default UserNavbar;
