import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function UserNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [selectedKey, setSelectedKey] = useState("home");

  useEffect(() => {
    let key = "home";
    switch (currentPath) {
      case "/shop":
        key = "shop";
        break;
      case "/about":
        key = "about";
        break;
      case "/order":
        key = "order";
        break;
      default:
        key = "home";
        break;
    }

    setSelectedKey(key);
  }, [currentPath]);

  const items_1 = [
    {
      key: "home",
      label: <Link to={"/"}>Home</Link>,
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
      key: "shop",
      label: <Link to={"/shop"}>Shop</Link>,
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
            {collapsed ? (
              <MenuUnfoldOutlined className="nav-btn-1" />
            ) : (
              <MenuFoldOutlined />
            )}
          </Button>
          {collapsed ? (
            ""
          ) : (
            <Menu
              defaultSelectedKeys={["home"]}
              mode="inline"
              theme="light"
              items={items_1}
            />
          )}
        </div>

        <div className="logo">LOGO</div>

        <Menu
          items={items_1}
          mode="horizontal"
          style={styleNav}
          selectedKeys={[selectedKey]}
          className="desktop-navbar-items"
          disabledOverflow
        />

        <Menu items={items_2} mode="horizontal" style={styleNav} />
      </div>
    </>
  );
}

export default UserNavbar;
