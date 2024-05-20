import { Avatar, Button, Card, Carousel, Layout, Menu } from "antd";
import type { ProductType } from "../redux/reducers/productSlice";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Search, { type SearchProps } from "antd/es/input/Search";
import type { CSS, InputEvent } from "../types/types";
import { RedoOutlined } from "@ant-design/icons";
import { useStickyBox } from "react-sticky-box";
import type { CategoryType } from "../redux/reducers/categorySlice";
import type { SizeType } from "../redux/reducers/sizeSlice";
import type { ColorType } from "../redux/reducers/colorSlice";

const { Meta } = Card;

type HomepageProps = {
  products: ProductType[];
  categories: CategoryType[];
  sizes: SizeType[];
  colors: ColorType[];
};

function Homepage({ products, categories, sizes, colors }: HomepageProps) {
  const contentStyle: CSS = {
    margin: "auto",
    height: "450px",
    width: "90%",
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
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
        const newArray = products.filter(
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
    setSearchVals(products);
  };

  const StickyBox = useStickyBox({ offsetTop: 20, offsetBottom: 20 });

  const filterItems = [
    {
      key: "filter1",
      label: "Catagories",
      children: categories.map((item) => {
        return {
          key: item.category_id,
          label: item.name,
        };
      }),
    },
    {
      key: "filter2",
      label: "Sizes",
      children: sizes.map((item) => {
        return {
          key: item.name,
          label: item.name,
        };
      }),
    },
    {
      key: "filter3",
      label: "Colors",
      children: colors.map((item) => {
        return {
          key: item.name,
          label: item.name,
        };
      }),
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizesArray = sizes.map((item) => item.name);

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
        const newKeys = prevCategories.filter((k) => k !== key);
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

  // useEffect(() => {
  //   if (
  //     selectedCategories.length === 0 ||
  //     selectedSizes.length === 0 ||
  //     (selectedCategories.length === 0 && selectedSizes.length === 0)
  //   ) {
  //     setSearchVals(products);
  //   }
  // }, [products, selectedCategories.length, selectedSizes.length]);

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

      <div className="product-container">
        <h2>SHOPPING</h2>
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
          <Sider width="20%" style={siderStyle}>
            <aside ref={StickyBox} className="sticky-container">
              <div className="categories sticky">
                <Menu
                  defaultOpenKeys={["filter1"]}
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
              {searchVals &&
                searchVals.map((item) => {
                  return (
                    <Card
                      style={{ width: 300, marginTop: 16 }}
                      loading={loading}
                      key={item._id}
                      hoverable
                    >
                      <Meta
                        avatar={<Avatar src={item.images[0]} shape="square" />}
                        title={`${item.brand} - ` + item.description}
                        description={"$" + item.price + ` (${item.sizes})`}
                      />
                    </Card>
                  );
                })}
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
}

export default Homepage;
