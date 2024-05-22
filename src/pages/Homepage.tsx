import { Avatar, Card, Carousel, Col, Flex, Layout, Modal, Row } from "antd";
import type { ProductType } from "../redux/reducers/productSlice";
import { useEffect, useState } from "react";
import type { CSS } from "../types/types";
import type { CategoryType } from "../redux/reducers/categorySlice";
import type { SizeType } from "../redux/reducers/sizeSlice";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";


type HomepageProps = {
  products: ProductType[];
  categories: CategoryType[];
  sizes: SizeType[];
};

function Homepage({ ...props }: HomepageProps) {
  const contentStyle: CSS = {
    margin: "auto",
    height: "600px",
    width: "90%",
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
    marginTop: "100px",
  };

  const imageStyle: CSS = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  };

  const modalHeaderStyle: CSS = {
    textAlign: "center",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
  };

  const modalSiderStyle: CSS = {
    textAlign: "center",
    lineHeight: "120px",
  };

  const modalContentStyle: CSS = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
  };

  const modalFooterStyle: CSS = {
    textAlign: "center",
  };

  const modalLayoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const topItems = props.products.filter((item) => item.rating >= 4.5);
  const renderTopItems = topItems.slice(0, 5);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (item: ProductType) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState<ProductType>();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleClickImage = (image: string) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    if (selectedItem) {
      setSelectedImage(selectedItem?.images[0]);
    }
  }, [selectedItem]);

  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img src="https://i.imgur.com/KCqTFg9.png" style={imageStyle} />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="https://i.imgur.com/EgdXbDL.png" style={imageStyle} />
          </h3>
        </div>
      </Carousel>

      <div className="products-preview">
        <div className="products-preview-title">
          <Row>
            <Flex
              align="center"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <Col>
                <h2>our best seller</h2>
              </Col>
              <Col>
                <Link to="/shop">
                  See more <RightOutlined />
                </Link>
              </Col>
            </Flex>
          </Row>
        </div>

        <div className="products-preview-list">
          <Row>
            <Flex justify="center" style={{ width: "100%" }} gap={20}>
              {renderTopItems &&
                renderTopItems.map((item) => {
                  return (
                    <Col className="gutter-row" span={4} key={item._id}>
                      <Card
                        style={{ width: "100%" }}
                        loading={loading}
                        hoverable
                        onClick={() => showModal(item)}
                      >
                        <Meta
                          avatar={
                            <Avatar src={item.images[0]} shape="square" />
                          }
                          title={item.description}
                          description={
                            <div className="product-content">
                              <span>{item.brand}</span>
                              <p>${item.price}</p>
                              <p>{item.rating} rated recently</p>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  );
                })}
            </Flex>
          </Row>
        </div>
      </div>

      {createPortal(
        <Modal
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          {selectedItem && (
            <>
              <Layout style={modalLayoutStyle}>
                <Header style={modalHeaderStyle}>Header</Header>
                <Layout>
                  <Sider width="50%" style={modalSiderStyle}>
                    <Row>
                      <Col span={6}>
                        {selectedItem.images.map((image) => {
                          return (
                            <img
                              className={
                                selectedImage === image ? "selected-img" : ""
                              }
                              onClick={() => handleClickImage(image)}
                              key={image}
                              src={image}
                              alt="product img"
                            />
                          );
                        })}
                      </Col>
                      <Col span={18}>
                        <img src={selectedImage} alt="product img" />
                      </Col>
                    </Row>
                  </Sider>
                  <Content style={modalContentStyle}>Content</Content>
                </Layout>
                <Footer style={modalFooterStyle}>Footer</Footer>
              </Layout>
            </>
          )}
        </Modal>,
        document.body
      )}
    </>
  );
}

export default Homepage;
