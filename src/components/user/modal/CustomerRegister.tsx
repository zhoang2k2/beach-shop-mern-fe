import { Button, Modal } from "antd";
import { useState } from "react";

type CustomerRegisterProps = {
  open: boolean;
  onCloseModal: () => void;
  onChangeMode: () => void;
};

function CustomerRegister({
  open,
  onCloseModal,
  onChangeMode,
}: CustomerRegisterProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const handleOk = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setConfirmLoading(true);

    setTimeout(() => {
      setLoadings((prevLoadings) => {
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

  const handleChangeMode = () => {
    onChangeMode();
  };

  return (
    <>
      <Modal
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Button
          className="submit-btn"
          type="primary"
          loading={loadings[0]}
          onClick={() => {
            handleOk(0);
          }}
        >
          Register
        </Button>
        <p onClick={handleChangeMode}>login</p>
      </Modal>
    </>
  );
}

export default CustomerRegister;
