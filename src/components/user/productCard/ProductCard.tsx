import { Avatar, Card, Col, Empty } from "antd";
import type { ProductType } from "../../../redux/reducers/productSlice";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DetailModal from "../modal/DetailModal";

type ProductCardProps = {
  renderItems: ProductType[];
  mode: "homepage" | "shoppage";
};

function ProductCard({ renderItems, mode }: ProductCardProps) {
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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {renderItems.length > 0 ? (
        renderItems.map((item) =>
          mode === "shoppage" ? (
            <Card
              className="product-card"
              style={{ width: 350, marginTop: 16 }}
              loading={loading}
              key={item._id}
              hoverable
              onClick={() => showModal(item)}
            >
              <Meta
                avatar={<Avatar src={item.images[0]} shape="square" />}
                title={`${item.brand} - ` + item.description}
                description={"$" + item.price + ` (${item.sizes})`}
              />
            </Card>
          ) : (
            <Col className="gutter-row" span={1} key={item._id}>
              <Card
                className="product-card"
                style={{ width: "100%" }}
                loading={loading}
                hoverable
                onClick={() => showModal(item)}
              >
                <Meta
                  avatar={<Avatar src={item.images[0]} shape="square" />}
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
          )
        )
      ) : (
        <Empty />
      )}

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

export default ProductCard;
