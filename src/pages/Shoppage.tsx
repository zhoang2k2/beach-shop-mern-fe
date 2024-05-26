import {
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Layout,
  Menu,
  Pagination,
  Row,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { RedoOutlined } from "@ant-design/icons";
import Search, { type SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import type { CSS, InputEvent } from "../types/types";
import type { ProductType } from "../redux/reducers/productSlice";
import { useStickyBox } from "react-sticky-box";
import type { CategoryType } from "../redux/reducers/categorySlice";
import type { SizeType } from "../redux/reducers/sizeSlice";
import TextArea from "antd/es/input/TextArea";
import { createPortal } from "react-dom";
import DetailModal from "../components/user/modal/DetailModal";

const { Meta } = Card;

type ShoppageProps = {
  products: ProductType[];
  categories: CategoryType[];
  sizes: SizeType[];
};

function Shoppage({ ...props }: ShoppageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const siderStyle: CSS = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#1677ff",
  };

  const [search, setSearch] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const handleOnChange = (e: InputEvent) => {
    setInputVal(e.target.value);
  };

  const [searchVals, setSearchVals] = useState<ProductType[]>([]);
  const onSearch: SearchProps["onSearch"] = () => {
    if (inputVal !== "") {
      setSearch(true);
      setTimeout(() => {
        const newArray = props.products.filter(
          (list) =>
            list.brand
              .toLocaleLowerCase()
              .includes(inputVal.toLocaleLowerCase()) ||
            list.description
              .toLocaleLowerCase()
              .includes(inputVal.toLocaleLowerCase()) ||
            list.name.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase())
        );
        setSearchVals(newArray);
        setSearch(false);
      }, 300);
    } else {
      return;
    }
  };
  const handleReset = () => {
    setInputVal("");
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSearchVals(props.products);
  };

  const StickyBox = useStickyBox({ offsetTop: 100, offsetBottom: 20 });

  const filterItems = [
    {
      key: "filter1",
      label: "Categories",
      children: props.categories.map((item) => {
        return {
          key: item.category_id,
          label: item.name,
        };
      }),
    },
    {
      key: "filter2",
      label: "Product Sizes",
      children: props.sizes.map((item) => {
        return {
          key: item.name,
          label: item.name,
        };
      }),
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizesArray = props.sizes.map((item) => item.name);

  const handleSelect = ({ key }: { key: string }) => {
    if (sizesArray.includes(key)) {
      setSelectedSizes((prevSizes) => {
        const newSizes = [...prevSizes, key];
        const updateRenderItems = props.products.filter(
          (item) =>
            (selectedCategories.length === 0 ||
              selectedCategories.includes(item.category_id)) &&
            newSizes.every((size) => item.sizes.includes(size))
        );
        setSearchVals(updateRenderItems);
        return newSizes;
      });
    } else {
      setSelectedCategories((prevCategories) => {
        const newKeys = [...prevCategories, key];
        const updateRenderItems = props.products.filter(
          (item) =>
            (selectedSizes.length === 0 ||
              selectedSizes.every((size) => item.sizes.includes(size))) &&
            newKeys.includes(item.category_id)
        );
        setSearchVals(updateRenderItems);
        return newKeys;
      });
    }
  };

  const handleDeselect = ({ key }: { key: string }) => {
    if (sizesArray.includes(key)) {
      setSelectedSizes((prevSizes) => {
        const newSizes = prevSizes.filter((k) => k !== key);
        const updateRenderItems = props.products.filter(
          (item) =>
            (selectedCategories.length === 0 ||
              selectedCategories.includes(item.category_id)) &&
            newSizes.every((size) => item.sizes.includes(size))
        );
        setSearchVals(updateRenderItems);
        return newSizes;
      });
    } else {
      setSelectedCategories((prevCategories) => {
        const newCategories = prevCategories.filter((k) => k !== key);
        const updateRenderItems = props.products.filter(
          (item) =>
            (selectedSizes.length === 0 ||
              selectedSizes.every((size) => item.sizes.includes(size))) &&
            newCategories.includes(item.category_id)
        );
        setSearchVals(updateRenderItems);
        return newCategories;
      });
    }
  };

  useEffect(() => {
    if (selectedCategories.length === 0 && selectedSizes.length === 0) {
      setSearchVals(props.products);
    }
  }, [props.products, selectedCategories.length, selectedSizes.length]);

  // PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const totalItems = [...searchVals];
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = totalItems.slice(firstIndex, lastIndex);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "smooth",
    });
  }, [page]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

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

  return (
    <>
      <Flex>
        <div className="product-container">
          <h2>LET'S SHOPPING</h2>
          <div className="product-action">
            <Button type="primary" shape="circle" onClick={handleReset}>
              <RedoOutlined />
            </Button>
            {search ? (
              <Search
                placeholder="input search text"
                enterButton
                loading
                value={inputVal}
                onChange={handleOnChange}
                onSearch={onSearch}
              />
            ) : (
              <Search
                placeholder="input search text"
                enterButton
                value={inputVal}
                onChange={handleOnChange}
                onSearch={onSearch}
              />
            )}
          </div>
          <Layout>
            <Sider width="17.5%" style={siderStyle}>
              <aside ref={StickyBox} className="sticky-container">
                <div className="sticky">
                  <Menu
                    defaultOpenKeys={["filter1", "filter2"]}
                    mode="inline"
                    items={filterItems}
                    selectedKeys={[...selectedCategories, ...selectedSizes]}
                    onSelect={handleSelect}
                    onDeselect={handleDeselect}
                  />
                </div>
              </aside>
            </Sider>

            <Content>
              <div className="product-list">
                {currentItems.length > 0 ?
                  currentItems.map((item) => {
                    return (
                      <Card
                        style={{ width: 350, marginTop: 16 }}
                        loading={loading}
                        key={item._id}
                        hoverable
                        onClick={() => showModal(item)}
                      >
                        <Meta
                          avatar={
                            <Avatar src={item.images[0]} shape="square" />
                          }
                          title={`${item.brand} - ` + item.description}
                          description={"$" + item.price + ` (${item.sizes})`}
                        />
                      </Card>
                    );
                  }) :  <Empty />}
              </div>

              <Pagination
                total={totalItems.length}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                defaultPageSize={itemsPerPage}
                defaultCurrent={1}
                current={page}
                onChange={handleChangePage}
              />
            </Content>
          </Layout>
        </div>
      </Flex>

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

export default Shoppage;
