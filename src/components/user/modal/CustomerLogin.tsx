import { Button, Checkbox, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type CustomerLoginProps = {
  open: boolean;
  onCloseModal: () => void;
  onChangeMode: () => void;
};

function CustomerLogin({
  onChangeMode,
  open,
  onCloseModal,
}: CustomerLoginProps) {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeMode = () => {
    onChangeMode();
  };

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

  return (
    <>
      <Modal
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              className="submit-btn"
              type="primary"
              loading={loadings[0]}
              onClick={() => {
                handleOk(0);
              }}
            >
              login
            </Button>
          </Form.Item>

          <p onClick={handleChangeMode}>register</p>
        </Form>
      </Modal>
    </>
  );
}

export default CustomerLogin;
