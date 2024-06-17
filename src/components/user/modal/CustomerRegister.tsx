import { Button, Flex, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import type { InputEvent } from "../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCustomer,
  fetchCustomers,
  selectCustomerState,
} from "../../../redux/reducers/customerSlice";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { customers } = useSelector(selectCustomerState);
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [initialInputVal] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  });

  const handleOk = (index: number) => {
    const existedAccount = customers.find(
      (item) => item.email === inputFields.email
    );
    if (
      inputFields.username !== "" &&
      inputFields.email !== "" &&
      inputFields.password !== "" &&
      inputFields.gender !== "" &&
      inputFields.address !== "" &&
      inputFields.phone !== ""
    ) {
      if (!existedAccount) {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
        setConfirmLoading(true);

        setTimeout(() => {
          dispatch(addNewCustomer(inputFields)).then(() => {
            setLoadings((prevLoadings) => {
              const newLoadings = [...prevLoadings];
              newLoadings[index] = false;
              return newLoadings;
            });
            onCloseModal();
            setConfirmLoading(false);
          });
        }, 2000);
      } else {
        console.log("email?");
      }
    }
  };

  const handleCancel = () => {
    onCloseModal();
  };

  const handleChangeMode = () => {
    onChangeMode();
  };

  const [inputFields, setInputFields] = useState(initialInputVal);
  const handleInputChange = (e: InputEvent | string, field?: string) => {
    if (typeof e === "string" && field) {
      setInputFields({
        ...inputFields,
        [field]: e,
      });
    }

    if (typeof e !== "string") {
      const { name, value } = e.target;
      setInputFields({
        ...inputFields,
        [name]: value,
      });
    }
  };

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 6 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 14 },
  //   },
  // };

  return (
    <>
      <Modal
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="customer-form"
      >
        <h2>REGISTER</h2>
        <Form variant="filled">
          <Flex gap={15} vertical>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                name="username"
                onChange={handleInputChange}
                value={inputFields.username}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", required: true, message: "Please input!" },
              ]}
            >
              <Input
                name="email"
                onChange={handleInputChange}
                value={inputFields.email}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input.Password
                name="password"
                onChange={handleInputChange}
                value={inputFields.password}
              />
            </Form.Item>

            <Form.Item
              label="Phone number"
              name="phone"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                name="phone"
                onChange={handleInputChange}
                value={inputFields.phone}
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Select
                onChange={(value) => handleInputChange(value, "gender")}
                value={inputFields.gender}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                placeholder="Select Gender"
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                name="address"
                onChange={handleInputChange}
                value={inputFields.address}
              />
            </Form.Item>

            <p onClick={handleChangeMode}>Already have account?</p>

            <Form.Item>
              <Button
                className="submit-btn"
                type="primary"
                htmlType="submit"
                loading={loadings[0]}
                onClick={() => {
                  handleOk(0);
                }}
              >
                Register
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}

export default CustomerRegister;
