import { useState, useEffect } from "react";
import { ConfigProvider, Form } from "antd";

import { Button } from "../../components/common";
import { Label, Input, TextArea } from "../../components";

import { isWordsValid, geoWordsValidator } from "./utils";

import Theme from "./theme.json";

import styles from "./styles.module.scss";

export const AddBlog = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [validationStatus, setValidationStatus] = useState({
    author: "base",
    authorWord: "base",
    georgianAuthor: "base",
    title: "base",
    description: "base",
    allValid: false,
  });

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  const onValuesChange = (_, values) => {
    // Validation logic for Author
    if (values.author) {
      const isAuthorValid = values.author.trim().length >= 4;
      setValidationStatus((prev) => ({
        ...prev,
        author: isAuthorValid ? "valid" : "inValid",
      }));
    }

    // Validation logic for Words (example rule: at least two words)
    if (values.description) {
      const isDescriptionWordsValid = isWordsValid(values.description);
      setValidationStatus((prev) => ({
        ...prev,
        description: isDescriptionWordsValid ? "valid" : "inValid",
      }));
    }

    if (values.title) {
      const isTitleWordsValid = isWordsValid(values.title);
      setValidationStatus((prev) => ({
        ...prev,
        title: isTitleWordsValid ? "valid" : "inValid",
      }));
    }

    if (values.author) {
      const isAuthorWordsValid = isWordsValid(values.author);
      setValidationStatus((prev) => ({
        ...prev,
        authorWord: isAuthorWordsValid ? "valid" : "inValid",
      }));
    }
    // Validation logic for Georgian Symbols
    if (values.author) {
      const isGeorgianValid = /^[ა-ჰ\s]+$/.test(values.author);
      setValidationStatus((prev) => ({
        ...prev,
        georgianAuthor: isGeorgianValid ? "valid" : "inValid",
      }));
    }

    if (
      validationStatus.author === "valid" &&
      validationStatus.authorWord === "valid" &&
      validationStatus.georgianAuthor === "valid" &&
      validationStatus.title === "valid" &&
      validationStatus.description === "valid"
    ) {
      setValidationStatus((prev) => ({ ...prev, allValid: true }));
    }
  };

  return (
    <ConfigProvider theme={Theme}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        className={styles["form"]}
        initialValues={{
          title: "",
          description: "",
          email: "",
          author: "",
        }}
      >
        <div className={styles["form--grid"]}>
          <Form.Item
            name="author"
            rules={[
              {
                required: true,
                min: 4,
                validator: geoWordsValidator,
                message: "",
              },
            ]}
          >
            <div className={styles["form__inputWrapper"]}>
              <Label>ავტორი</Label>
              <Input
                placeholder="შეიყვანეთ ავტორი"
                allValid={validationStatus.allValid}
              />
              <ul className={styles["form__inputWrapper--ul"]}>
                <li className={styles[validationStatus.author]}>
                  მინიმუმ 4 სიმბოლო
                </li>
                <li className={styles[validationStatus.authorWord]}>
                  მინიმუმ ორი სიტყვა
                </li>
                <li className={styles[validationStatus.georgianAuthor]}>
                  მხოლოდ ქართული სიმბოლოები
                </li>
              </ul>
            </div>
          </Form.Item>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                min: 2,
                // validator: geoWordsValidator,
                message: "",
              },
            ]}
          >
            <div className={styles["form__inputWrapper"]}>
              <Label>სათური</Label>
              <Input
                placeholder="შეიყვანეთ სათაური"
                allValid={validationStatus.allValid}
              />

              <p className={styles[validationStatus.title]}>
                მინიმუმ 2 სიმბოლო
              </p>
            </div>
          </Form.Item>
        </div>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              min: 2,
              // validator: geoWordsValidator,
              message: "",
            },
          ]}
        >
          <div className={styles["form__inputWrapper"]}>
            <Label>აღწერა</Label>
            <TextArea
              placeholder="შეიყვანეთ აღწერა"
              allValid={validationStatus.allValid}
            />
            <p className={styles[validationStatus.description]}>
              მინიმუმ 2 სიმბოლო
            </p>
          </div>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              // validator: geoWordsValidator,
              message: "",
            },
          ]}
        >
          <div
            className={`${styles["form__inputWrapper"]} ${styles["form--email"]}`}
          >
            <Label left>ელ-ფოსტა</Label>
            <Input placeholder="Example@redberry.ge" />
          </div>
        </Form.Item>

        <Form.Item shouldUpdate className={styles["form--button"]}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              გამოქვეყნება
            </Button>
          )}
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
