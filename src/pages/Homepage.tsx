import { Avatar, Card, Carousel, Col, Flex, Input, Row } from "antd";
import type { ProductType } from "../redux/reducers/productSlice";
import { useEffect, useState } from "react";
import type { CSS } from "../types/types";
import type { CategoryType } from "../redux/reducers/categorySlice";
import type { SizeType } from "../redux/reducers/sizeSlice";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import DetailModal from "../components/user/modal/DetailModal";
import TextArea from "antd/es/input/TextArea";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const topItems = props.products.filter((item) => item.rating >= 4.5);
  const renderTopItems = topItems.slice(0, 5);

  const cheapItems = props.products.filter((item) => item.price <= 10);
  const renderCheapItems = cheapItems.slice(0, 5);

  const [open, setOpen] = useState(false);
  const showModal = (item: ProductType) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState<ProductType>();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  // HANDLING COLOR
  const [selectedColor, setSelectedColor] = useState<{ [key: string]: string }>(
    {}
  );
  const handleRemoveColor = (itemId: string) => {
    setSelectedColor((prevColors) => {
      const newColor = { ...prevColors };
      delete newColor[itemId];
      return newColor;
    });
  };
  const handleAddColor = (itemId: string, color: string) => {
    setSelectedColor((prevColors) => ({
      ...prevColors,
      [itemId]: color,
    }));
  };

  // HANDLING SIZE
  const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>(
    {}
  );
  const handleRemoveSize = (itemId: string) => {
    setSelectedSize((prevSize) => {
      const newSize = { ...prevSize };
      delete newSize[itemId];
      return newSize;
    });
  };
  const handleAddSize = (itemId: string, size: string) => {
    setSelectedSize((prevSize) => ({
      ...prevSize,
      [itemId]: size,
    }));
  };

  useEffect(() => {
    if (selectedItem) {
      setSelectedImage(selectedItem?.images[0]);
      setSelectedColor((prevSelectedColors) => ({
        ...prevSelectedColors,
        [selectedItem._id]: selectedItem.colors[0],
      }));
      setSelectedSize((prevSelectedSize) => ({
        ...prevSelectedSize,
        [selectedItem._id]: selectedItem.sizes[0],
      }));
    }
  }, [selectedItem]);

  const logos = [
    {
      id: "1",
      name: "H&M",
      url: "https://static.vecteezy.com/system/resources/previews/023/871/693/original/hm-brand-logo-symbol-white-design-hennes-and-mauritz-clothes-fashion-illustration-with-red-background-free-vector.jpg",
    },
    {
      id: "2",
      name: "Zara",
      url: "data:image/png;base64,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",
    },
    {
      id: "3",
      name: "Uniqlo",
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX/AAD/7+//9PT/+Pj/VFT/Ozv/p6f/4eH/n5//6Oj/5eX/trb/8vL/Jib/mJj/7Oz/dnb/ExP/xcX/3Nz/19f/ra3/NTX/o6P/enr/b2//zc3/k5P/yMj/Ly//S0v/urr/XV3/QkL/i4v/hIT/s7P/Zmb/cHD/KSn/QED/Skr/Ghr//v7/q6v/gID/lZX/UlK4rPuJAAAIG0lEQVR4nO2daVviOhSAs6iFUqiURUEURHBBZ/z//+6CIOQkJ0k3ppp73g/zPENKkpekS5qTyBhBEARBEARBEARBEARBEARBEARBEEQeuq2ewrV5wFpNb43NA3qAeyP9QS2htcar0b9TM1lWlAJcvosTcm4e8CGVA94vzAPUdCE/jPRbUMINXo0XrmQj04pSgEvJT4iOecCVUA6QiGHCVdIXPf0alNDCq9Ftq5nEVa1U6jaUf/X00Ax52tfSgzOU+mUiOEOjeuEZyluYHp5hMoDp4RlyCe/qARomU5AeoCEXCzU9SMNMTQ/RkIsHJT1MQ/UJPkhDzpVRVpiG4uqUHqYhT07pgRoqJoEacnFMD9VQ3n2nh2p4qmWwhsdBVLCGx0FUsIZcTvbp4Romw316uIbfg6iQDfeDqIANuXwL0VD9n1gFaBgP1f++b4IzTAYL9XAxCs8wYqARZYiG16ARWwEaslj9IA3R8EnNcTuICs+QpfCDAA3vQCNeT8IzhJ8MA2xDdgPvifrFNQDDF/UrkEAM2cqqGIrhpX1EFYghm9saMRjDT1sjBmPIphbFcAzXlm7atGGSmQeUM4SDqB9kODUP+ChnCJ5kGjUcg+4kzQNikJ7bEA6imjTsD8CY/FlPfwBtAUIQDlgM/6CN2IAhy+B7Fj0Z3NmSgR5ayayGeCM2YdiB3fQOpj6DlsDOU6vhX6wRmzC8gBWRIJj9E170jdjRHTbDPqh0g4bdWKuDEmv+zGFPSz4LGMJBVIOGxjOknB4uN+tMS0E7qd3wPuUGjRhe6D91IqNhlg0iqSfosbEeQzYyG7ERQzYzK5LsMD6M0K/bDR+RoL5GDB/tQ3KAXBQ0RAZRzRiyG/wJS68c8tC6w2H4aWTckCGL7HOAp8obCykOOAzZTM+4KcNx6ldMkAe2L1yGC70RmzJkC+FTFMiytj0uQ2MQ1Zghe/C0ov40p+A0nGiN2Jwhu287rqiJeLJ/02nIBvCXa9CQdYfWK6pIHx1fdBvewlybNGSsx9FmFGLVdX3NbdiHg6hmDdllx3hQ40LOkHG9ituQLeEQulnDreONkKfLaiKkXNluEkc8ht02CECxGipHJWc03PLZy/bPpTzJepZ1yQCRKCB1u5FKurQbunOpm03f8gCD0Af4DsiVS5kqEwRBEARBEARBEARBEL+ORe9j9yo+HY5yvWrzvU3My7o32hXbHn70FqUzycFkLqXYvzFNhJBy5piwOFCH4W0Gi83QiIEaeIr1l96JTO88L/eqGy7berFCxrXuDnlgMZTYFJuMrVOHX1Q1XA/QKSEZ5TpHinBjmyVNsC0xT1Q0HNmLHZV2QZk5whVEZG5LeqSaoX1Ob9uMQ+ekVzG6kTPkJOGX1q9WMXTOy25/2baxV2hZ7tueefykjew+u6eC4SP3FRvV1Ipdf7hJEtvKKm849v2u21Y0Al7LYV0AopZlu9yUN0TCzcxiVzX4wVWfVszdZSsaoiG2ZrH+Zw4v/RwRUV9l4RfUsoabXILbPKufikiQJIolsK2sYZ5T46tYZJlLMcZmnjKNIm5GLWBrEUobmhGRtmITV6xLHlr6oyifr7d5vq1Xqf60iP6aJQ31niPSzvqVsYf13Cj2yp+bEz1qaXiMvrjvaKdKip2J5Qz7Wni5nL5+J40zrVjrjSofeqw+ONmutERjwQkra7jWcgbdY6UlLsqpHYCdVL+awPWuyQzJoJwh7KR6/4cx9NZbcT7Amhl1v8M9oA9/b/0EKGcIwjLNABoQK4avEcgNKEoYQZbaohnkslbKUFtu9UdP16I2HUMbLy9gUYTcOAWKrF1z8wgEkCVzsFr2kY0fuP4Qec4FZ2JthiDGHev8YDlWjYb1rSH1AAyx++yZDLGL1r8wRF5XnMuwtpXOPsBdGHtoIcP8kCEZkqEFMiTDApAhGZKhBTIkwwKQIRmSoQUyJMMCkGFohg29TTT/iDC9ES6A961+5/y9FHurP6/NUJuZMSMt4XZudRm+cpCteUB9MzO+2TW4w6N4MzMoZbgBUVhmzIy2nUaV2TVthtT4NUFNzjVDyo0/NQ6asOIMKdw3Tmjz2HDPQexKVNIQTp/rF/FaZ7m1SAU4kd9zbTl4oJyhNskLJfQAiYrRwlpcojiFfbzoYUt1RptouyrK7BjeOdb3+qsYbWJEDAne+QoqmVwZoTtobwE/UP49O8yIodXuj3z1n0f6NjnYA0EhLrmOEDxNd//qn6M7ucAukLpJjnubvJnZixQt1rrLWG7se8RrNfBH7vnzOO3eovdF61cqR+6xbs7a5Yi+LGJ4nzf6soZY72WusmQP/3ZZQ9bKV2wtS0tyhSPniYIuZMimVYotxgbfmlolaeeJZC9m6F0hsFvpUdOGQ133uoctsfVsKG/o36+xNsFdnJlbUVhOwmqGrBu7V5RUvdcDxanzvMdGjjUYso1zVdDADLOrQg9duXasGrYNdHXD3TOofWVX3Zt+Xbh+T3UT7FoN2cKyOi+e1Oy344+x1PH0i2JDw1oMGXtKzYWd/BwrLHdM5mK3r+AX8AlR2tYEgD33fFj23LvOxJbvYoXI3Is6K7JedqItg+wOvGazrgmIowLElqVF2992Od8f0lmeo3vibEDHqWkV2c8CvMORr/4v/DrgH4WzXk1/MXDv/3bT1TkHs/9ZN7Xsrvqr2fyr7X2bA7xPFJ49k38lYP7AMYT6xYCbfvm9WX4wsJsumq7OGQj/asqkMnaoa4eDn0Vvlp2YVV1WTRAEQRAEQRAEQRAEYeU/5PKYpnTQdXoAAAAASUVORK5CYII=",
    },
    {
      id: "4",
      name: "Forever 21",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVPOBzVkQo-1JC8qWspK110pH-qRQhHu0bIw&usqp=CAU",
    },
    {
      id: "5",
      name: "Gap",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Gap_logo.svg/2048px-Gap_logo.svg.png",
    },
    {
      id: "6",
      name: "Ontop",
      url: "https://vn-test-11.slatic.net/shop/88d94669c978dd8a072debf46bac07cb.jpeg",
    },
    {
      id: "7",
      name: "Old Navy",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRP1FK8qGpawdDIumprO8U_VeYOLTPwn9HcZvYSkWjE4pZLTFEsS40qnwWCqwOkV4mKGE&usqp=CAU",
    },
    {
      id: "8",
      name: "Cotton On",
      url: "data:image/png;base64,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",
    },
    {
      id: "9",
      name: "Pull&Bear",
      url: "https://i.pinimg.com/474x/4b/0b/05/4b0b057b3804e7cd9d7cc86eb8f318aa.jpg",
    },
    {
      id: "10",
      name: "ASOS",
      url: "https://1000logos.net/wp-content/uploads/2020/07/Asos-Logo.jpg",
    },
  ];

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img src="https://i.imgur.com/DSTBath.jpeg" style={imageStyle} />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="https://i.imgur.com/mkMpbSE.jpeg" style={imageStyle} />
          </h3>
        </div>
      </Carousel>

      <Row className="customer">
        <h2>customer feedback</h2>
        <Flex gap={25}>
          <Card
            hoverable
            cover={<img alt="example" src="https://i.imgur.com/nTTVMKX.jpeg" />}
          >
            <Meta
              title="Customer A"
              description="I am extremely pleased with the superior quality of the products and the exceptional service provided. I appreciate the attention to detail and the prompt customer support, which exceeds my expectations."
            />
          </Card>

          <Card
            hoverable
            cover={<img alt="example" src="https://i.imgur.com/UZZ1HoJ.jpeg" />}
          >
            <Meta
              title="Customer B"
              description="I am extremely pleased with the superior quality of the products and the exceptional service provided. I appreciate the attention to detail and the prompt customer support, which exceeds my expectations."
            />
          </Card>

          <Card
            hoverable
            cover={<img alt="example" src="https://i.imgur.com/3JiqYYA.jpeg" />}
          >
            <Meta
              title="Customer C"
              description="I am extremely pleased with the superior quality of the products and the exceptional service provided. I appreciate the attention to detail and the prompt customer support, which exceeds my expectations."
            />
          </Card>

          <Card
            hoverable
            cover={<img alt="example" src="https://i.imgur.com/EiBarM3.jpeg" />}
          >
            <Meta
              title="Customer D"
              description="I am extremely pleased with the superior quality of the products and the exceptional service provided. I appreciate the attention to detail and the prompt customer support, which exceeds my expectations."
            />
          </Card>
        </Flex>
      </Row>

      <Flex vertical>
        <Row>
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
        </Row>

        <Row>
          <div className="products-preview">
            <div className="products-preview-title">
              <Row>
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ width: "100%" }}
                >
                  <Col>
                    <h2>Under $15 items</h2>
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
                  {renderCheapItems &&
                    renderCheapItems.map((item) => {
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
        </Row>
      </Flex>

      <div className="sub-slider">
        <div className="sub-slider-container">
          <div className="card-list">
            {logos.map((data) => (
              <div className="company-card" key={data.id}>
                <img src={data.url} alt={data.name} />
              </div>
            ))}
          </div>
          <div className="card-list">
            {logos.map((data) => (
              <div className="company-card" key={data.id}>
                <img src={data.url} alt={data.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Row className="banner">
        <Col span={14}>
          <img src="https://i.imgur.com/OemDj2E.jpg" alt="1" />
          <div className="banner-content">
            <span>hello customers!!</span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              eleifend sollicitudin tellus, cursus fringilla ex lobortis vel.
              Pellentesque nec sem quis massa faucibus laoreet eu vel ipsum.
              Fusce mollis augue sit amet porta luctus. In in orci in nulla
              lobortis tristique. Nunc bibendum finibus iaculis. In imperdiet
              eleifend feugiat. Mauris.
            </p>
            <button>
              <Link to="/shop">Shop now!</Link>
            </button>
          </div>
        </Col>
        <Col span={10}>
          <Flex gap={10} vertical>
            <img src="https://i.imgur.com/1eohAla.jpg" alt="2" />
            <img src="https://i.imgur.com/Zd7kM6v.jpeg" alt="3" />
          </Flex>
        </Col>
      </Row>

      <Row className="contact">
        <Flex justify="space-evenly" align="center" gap={50}>
          <video
            src="2231485-uhd_3840_2160_24fps.mp4"
            autoPlay
            loop
            muted
          ></video>

          <div className="contact-content">
            <p>Get E-mail update of our latest products and special offers</p>
            <Input size="large" placeholder="Enter your email" prefix="@" />

            <TextArea
              showCount
              maxLength={150}
              onChange={onChange}
              placeholder="Any questions for us?"
              style={{ height: 120, resize: "none" }}
            />
            <button>Submit</button>
          </div>
        </Flex>
      </Row>

      {createPortal(
        <DetailModal
          selectedItem={
            selectedItem ?? {
              _id: "",
              name: "",
              description: "",
              price: 0,
              category_id: "",
              brand: "",
              stock: 0,
              sizes: [""],
              colors: [""],
              images: [""],
              rating: 0,
              reviews: [""],
            }
          }
          selectedImage={selectedImage}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          open={open}
          onCloseModal={handleCloseModal}
          handleSelectImage={handleSelectImage}
          handleRemoveColor={handleRemoveColor}
          handleAddColor={handleAddColor}
          handleRemoveSize={handleRemoveSize}
          handleAddSize={handleAddSize}
        />,
        document.body
      )}
    </>
  );
}

export default Homepage;
