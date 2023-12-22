import { useState, useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

import { Form, Input, ConfigProvider, Flex } from "antd";
import { Button } from "../common";

import ErrorCircle from "../../assets/svg/error-circle.svg?react";

import Theme from "./theme.json";
import styles from "./style.module.scss";

export const LoginForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const { setIsLoggedIn } = useContext(GlobalContext);

  const onFinish = async ({ email }) => {
    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        setError("ელ-ფოსტა არ მოიძებნა");
        throw new Error("Failed to log in");
      } else {
        form.resetFields();
        setError(null);
        setIsLoggedIn(true);
      }
    } catch (error) {}
  };

  const inputErrorColors = {
    borderColor: error ? "#EA1919" : "",
    background: error ? "#FAF2F3" : "",
  };

  return (
    <ConfigProvider theme={Theme}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        form={form}
      >
        <h1 className={styles["title"]}>შესვლა</h1>

        <Flex vertical gap={24}>
          <Form.Item
            label={<span className={styles["label"]}>ელ-ფოსტა</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Flex vertical gap={8}>
              <Input
                style={inputErrorColors}
                size="large"
                placeholder="Example@redberry.ge"
              />
              {error ? (
                <Flex gap={8} align="center">
                  <ErrorCircle />
                  <span className={styles["error"]}>{error}</span>
                </Flex>
              ) : null}
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit">
              შესვლა
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </ConfigProvider>
  );
};
