import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Menu } from "antd";
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
      case "/shop/cheap-price":
        key = "";
        break;
      case "/shop/best-seller":
        key = "";
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

  const navItems = [
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

  const mobileNavItems = [
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
    {
      key: "buttons",
      label: (
        <>
          <Button>
            <ShoppingCartOutlined onClick={showDetailModal} />
          </Button>
          <Button>
            <UserOutlined onClick={showCustomerLogin} />
          </Button>
        </>
      ),
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
        <div className="moblie-navbar">
          <Flex align="center" justify="space-between">
            <div className="logo">LOGO</div>

            <div className="mobile-navbar-actions">
              <Flex align="center" gap={5}>
                <Button>
                  <BellOutlined />
                </Button>
                <Button
                  className="extra-btn"
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
                  <>
                    <Menu
                      defaultSelectedKeys={["home"]}
                      mode="inline"
                      theme="light"
                      items={mobileNavItems}
                    />
                  </>
                )}
              </Flex>
            </div>
          </Flex>
        </div>

        <div className="navbar-items">
          <Flex justify="space-between" align="center">
            <div className="logo">LOGO</div>

            <Menu
              items={navItems}
              mode="horizontal"
              style={styleNav}
              selectedKeys={[selectedKey]}
              disabledOverflow
            />

            <div className="navbar-action">
              <Flex gap={7.5}>
                <Button>
                  <BellOutlined />
                </Button>
                <Button>
                  <ShoppingCartOutlined onClick={showDetailModal} />
                </Button>
                <Button>
                  <UserOutlined onClick={showCustomerLogin} />
                </Button>
              </Flex>
            </div>
          </Flex>
        </div>
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
