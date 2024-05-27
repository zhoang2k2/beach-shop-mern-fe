import { Button, Flex, Input, Layout, Menu, Pagination, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { RedoOutlined } from "@ant-design/icons";
import Search, { type SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import type { CSS, InputEvent } from "../types/types";
import {
  fetchProducts,
  selectProductState,
  type ProductType,
} from "../redux/reducers/productSlice";
import { useStickyBox } from "react-sticky-box";
import TextArea from "antd/es/input/TextArea";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  selectCategoryState,
} from "../redux/reducers/categorySlice";
import { fetchSizes, selectSizeState } from "../redux/reducers/sizeSlice";
import ProductCard from "../components/user/productCard/ProductCard";
import Countdown, { type CountdownProps } from "antd/es/statistic/Countdown";
import { useLocation } from "react-router-dom";

function Shoppage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { products } = useSelector(selectProductState);
  const { categories } = useSelector(selectCategoryState);
  const { sizes } = useSelector(selectSizeState);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    dispatch(fetchSizes());
  }, [dispatch]);


  const location = useLocation();
  const currentPath = location.pathname;
  const [itemsByMode, setItemsByMode] = useState<ProductType[]>([]);

  useEffect(() => {
    let items = [...products];
    switch (currentPath) {
      case "/shop/cheap-price":
        items = products.filter((item) => item.rating >= 4.5);
        break;
      case "/shop/best-seller":
        items = products.filter((item) => item.rating < 10);
        break;
      default:
        items = [...products];
        break;
    }
    setItemsByMode(items);
  }, [currentPath, products]);

  // useEffect(() => {
  //   if (mode === "best") {
  //     const newProducts = );
  //     return (setItemsByMode(newProducts));
  //   } else if (mode === "cheap") {
  //     const newProducts = products.filter((item) => item.price <= 10);
  //     return setItemsByMode(newProducts);
  //   } else {
  //     return setItemsByMode(products);
  //   }
  // }, [mode, products]);

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
        const newArray = itemsByMode.filter(
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
    setSearchVals(products);
  };

  const StickyBox = useStickyBox({ offsetTop: 100, offsetBottom: 20 });

  const filterItems = [
    {
      key: "filter1",
      label: "Categories",
      children: categories.map((category) => {
        return {
          key: category.category_id,
          label: category.name,
        };
      }),
    },
    {
      key: "filter2",
      label: "Product Sizes",
      children: sizes.map((item) => {
        return {
          key: item.name,
          label: item.name,
        };
      }),
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizesArray = sizes && sizes.map((item) => item.name);

  const handleSelect = ({ key }: { key: string }) => {
    if (sizesArray.includes(key)) {
      setSelectedSizes((prevSizes) => {
        const newSizes = [...prevSizes, key];
        const updateRenderItems = products.filter(
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
        const updateRenderItems = products.filter(
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
        const updateRenderItems = products.filter(
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
        const updateRenderItems = products.filter(
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
      setSearchVals(products);
    }
  }, [products, selectedCategories.length, selectedSizes.length]);

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
      top: 550,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const deadline = Date.UTC(2024, 9, 30, 23, 59, 59);
  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
  };

  return (
    <>
      <Row className="shop-banner">
        <img src="https://i.imgur.com/xSvxccl.jpeg" alt="banner" />
        <div className="banner-text">
          <Flex justify="center" align="center" vertical>
            <p>SUMMER DEALS DUE OCTOBER</p>
            <Countdown
              title="Countdown"
              value={deadline}
              onFinish={onFinish}
              format="D day H hour m ' s"
            />
          </Flex>
        </div>
      </Row>

      <Flex justify="center" align="center">
        <div className="product-container">
          <Row>
            <h2>LET'S SHOPPING</h2>
          </Row>

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
                <ProductCard mode="shoppage" renderItems={currentItems} />
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
    </>
  );
}

export default Shoppage;
