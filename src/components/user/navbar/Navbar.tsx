import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import Cart from "../cart/Cart";
import CustomerRegister from "../modal/CustomerRegister";
import CustomerLogin from "../modal/CustomerLogin";

function UserNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [selectedKey, setSelectedKey] = useState("home");

  const [open, setOpen] = useState({
    detail: false,
    login: false,
    register: false,
  });
  const showDetailModal = () => {
    setOpen({ ...open, detail: true });
  };
  const handleCloseCart = () => {
    setOpen({ ...open, detail: false });
  };

  // const showCustomerRegister = () => {
  //   setOpen({ ...open, register: true });
  // };
  const handleCloseRegister = () => {
    setOpen({ ...open, register: false });
  };

  const showCustomerLogin = () => {
    setOpen({ ...open, login: true });
  };
  const handleCloseLogin = () => {
    setOpen({ ...open, login: false });
  };

  const handleSwitchToLogin = () => {
    setOpen({ ...open, register: false, login: true });
  };
  const handleSwitchToRegister = () => {
    setOpen({ ...open, register: true, login: false });
  };

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
      label: <Link to={"/about"}>About</Link>,
    },
    {
      key: "order",
      label: <Link to={"/order"}>Order</Link>,
    },
    {
      key: "shop",
      label: <Link to={"/shop"}>Shop</Link>,
    },
  ];

  const items_2 = [
    {
      key: "cart",
      label: <ShoppingCartOutlined onClick={showDetailModal} />,
    },
    {
      key: "user",
      label: <UserOutlined onClick={showCustomerLogin} />,
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

      {open.detail &&
        createPortal(
          <Cart
            items={[]}
            onOpen={open.detail}
            onCloseCart={handleCloseCart}
          />,
          document.body
        )}

      {open.register &&
        createPortal(
          <CustomerRegister
            open={open.register}
            onCloseModal={handleCloseRegister}
            onChangeMode={handleSwitchToLogin}
          />,
          document.body
        )}

      {open.login &&
        createPortal(
          <CustomerLogin
            open={open.login}
            onCloseModal={handleCloseLogin}
            onChangeMode={handleSwitchToRegister}
          />,
          document.body
        )}
    </>
  );
}

export default UserNavbar;
