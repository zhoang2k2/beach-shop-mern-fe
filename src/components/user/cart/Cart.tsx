import { Drawer } from "antd";

type CartProps = {
    onOpen: boolean
}

function Cart({onOpen} : CartProps) {

  return (
    <>
      <Drawer title="CART" onClose={() => console.log("close")} open={onOpen}></Drawer>
    </>
  );
}

export default Cart;
