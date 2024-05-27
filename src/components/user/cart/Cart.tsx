import { Drawer } from "antd";
import type { ProductType } from "../../../redux/reducers/productSlice";
import { useEffect } from "react";

type CartProps = {
  onOpen?: boolean;
  onCloseCart: () => void;
  items: ProductType[];
};

function Cart({ onOpen, onCloseCart, items }: CartProps) {
  const handleCloseCart = () => {
    onCloseCart();
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <Drawer title="CART" onClose={handleCloseCart} open={onOpen}>
        {items &&
          items.map((item) => {
            return <p key={item._id}>{item.brand}</p>;
          })}
      </Drawer>
    </>
  );
}

export default Cart;
