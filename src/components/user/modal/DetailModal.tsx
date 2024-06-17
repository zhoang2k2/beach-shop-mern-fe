import { Button, Col, Flex, Layout, Modal, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import type { ProductType } from "../../../redux/reducers/productSlice";
import { useState } from "react";
import type { CSS } from "../../../types/types";
import { createPortal } from "react-dom";
import Cart from "../cart/Cart";

interface DetailModalProps {
  selectedItem: ProductType;
  selectedImage: string;
  selectedColor: { [key: string]: string };
  selectedSize: { [key: string]: string };
  open: boolean;
  onCloseModal: () => void;
  handleSelectImage: (e: string) => void;
  handleRemoveColor: (id: string) => void;
  handleAddColor: (id: string, c: string) => void;
  handleRemoveSize: (id: string) => void;
  handleAddSize: (id: string, s: string) => void;
}

function DetailModal({
  selectedItem,
  selectedImage,
  selectedColor,
  selectedSize,
  open,
  onCloseModal,
  handleSelectImage,
  handleRemoveColor,
  handleAddColor,
  handleRemoveSize,
  handleAddSize,
}: DetailModalProps) {
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
    minHeight: 120,
  };

  const modalFooterStyle: CSS = {
    textAlign: "center",
    width: "50%",
    marginLeft: "auto",
    padding: "25px 20px",
  };

  const modalLayoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [addItemsToCart, setItemsToCart] = useState<ProductType[]>([]);

  const handleOk = (index: number, item: ProductType) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setConfirmLoading(true);

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        setItemsToCart((prev) => [...prev, item]);
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      onCloseModal();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    onCloseModal();
  };

  const handleClickImage = (image: string) => {
    handleSelectImage(image);
  };

  const handleSelectedColor = (itemId: string, color: string) => {
    if (selectedColor[itemId] === color) {
      handleRemoveColor(itemId);
    } else {
      handleAddColor(itemId, color);
    }
  };

  const renderColorOpts = selectedItem.colors.map((color) => {
    return (
      <div
        onClick={() => handleSelectedColor(selectedItem._id, color)}
        className={
          selectedColor[selectedItem._id] === color ? "selected-color" : ""
        }
      >
        <div className="color-display" style={{ backgroundColor: color }}></div>
      </div>
    );
  });

  const handleSelectedSize = (itemId: string, size: string) => {
    if (selectedSize[itemId] === size) {
      handleRemoveSize(itemId);
    } else {
      handleAddSize(itemId, size);
    }
  };

  const renderSizeOpts = selectedItem.sizes.map((size) => {
    return (
      <div
        onClick={() => handleSelectedSize(selectedItem._id, size)}
        className={
          selectedSize[selectedItem._id] === size ? "selected-size" : ""
        }
      >
        <div className="size-display">{size}</div>
      </div>
    );
  });

  return (
    <>
      <Modal
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel} 
      >
        {selectedItem && (
          <Layout style={modalLayoutStyle}>
            <Header style={modalHeaderStyle}></Header>
            <Layout>
              <Sider width="50%" style={modalSiderStyle}>
                <Row>
                  <Col span={6}>
                    <Flex gap={10} align="center" vertical>
                      {selectedItem.images.map((image, index) => {
                        return (
                          <img
                            className={
                              selectedImage === image ? "selected-img" : ""
                            }
                            onClick={() => handleClickImage(image)}
                            key={index}
                            src={image}
                            alt="product img"
                          />
                        );
                      })}
                    </Flex>
                  </Col>
                  <Col span={18}>
                    <img src={selectedImage} alt="product img" />
                  </Col>
                </Row>
              </Sider>
              <Content style={modalContentStyle}>
                <Flex gap={20} vertical>
                  <h2>
                    {selectedItem.brand} - {selectedItem.name}
                  </h2>
                  <h3>${selectedItem.price}</h3>
                  <p className="product-detail">
                    {selectedItem.description} Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Morbi imperdiet lobortis
                    lectus, id fringilla purus convallis et. Donec sodales
                    turpis justo, vitae tincidunt ante dapibus non. Cras
                    eleifend ante et magna lobortis tincidunt. In pharetra
                    consequat ante, sed accumsan risus placerat ut. Morbi
                    eleifend ultrices lacus tempus rutrum. Vestibulum laoreet
                    facilisis ex, consequat hendrerit tellus maximus vitae.
                    Integer justo eros, luctus id bibendum vitae, blandit eget
                    nunc. Phasellus non libero eu odio ullamcorper congue. Proin
                    rutrum, enim at vulputate ultrices, orci dolor fringilla
                    purus, eu convallis sapien quam id eros. Suspendisse vel
                    elit augue. Vivamus tristique cursus bibendum. Pellentesque
                    eleifend augue vel erat volutpat, a elementum elit
                    porttitor.
                  </p>
                  <p className="color product-option">
                    <Flex gap={15}>
                      <span>color options</span>
                      {renderColorOpts}
                    </Flex>
                  </p>
                  <p className="size product-option">
                    <Flex gap={15}>
                      <span>size options</span>
                      {renderSizeOpts}
                    </Flex>
                  </p>
                  <Button
                    className="submit-btn"
                    type="primary"
                    loading={loadings[0]}
                    onClick={() => {
                      handleOk(0, selectedItem);
                    }}
                  >
                    Add to cart!
                  </Button>
                </Flex>
              </Content>
            </Layout>
            <Footer style={modalFooterStyle}></Footer>
          </Layout>
        )}
      </Modal>

      {createPortal(
        <Cart onCloseCart={() => {}} items={addItemsToCart} />,
        document.body
      )}
    </>
  );
}

export default DetailModal;
