import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

import { ConfigProvider, Flex, Form } from "antd";

import { Button } from "../../components/common";
import { Label, Input, TextArea, ImageUploader } from "../../components";

import {
  isWordsValid,
  authorFieldValidator,
  titleFieldValidator,
  descriptionFieldValidator,
  emailFieldValidator,
  endsWithRedberryGeRegex,
} from "./utils";

import ErrorCircle from "../../assets/svg/error-circle.svg?react";

import Theme from "./theme.json";

import styles from "./styles.module.scss";

export const AddBlog = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [imageUrl, setImageUrl] = useState({
    binary: "",
    fileInfo: null,
  });
  const { setOpenSuccessModal } = useContext(GlobalContext);
  const [validationStatus, setValidationStatus] = useState({
    author: "base",
    authorWord: "base",
    georgianAuthor: "base",
    title: "base",
    description: "base",
    authorValid: false,
    authorWordValid: false,
    authorGeorgianValid: false,
    titleValid: false,
    descriptionValid: false,
    emailValid: false,
  });

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values) => {
    console.log(values.image);

    // setOpenSuccessModal(true);
  };

  // checking each field's text and added some validation styles
  const checkForValid = (result) => (result ? "valid" : "inValid");

  const onValuesChange = (_, values) => {
    // Validation form email's Field
    if (values.email) {
      if (endsWithRedberryGeRegex.test(values.email)) {
        setValidationStatus((prev) => ({ ...prev, emailValid: true }));
      }
    }
    // Validation  for description's Text
    if (values.description) {
      const isDescriptionWordsValid = isWordsValid(values.description);
      setValidationStatus((prev) => ({
        ...prev,
        descriptionValid: true,
        description: checkForValid(isDescriptionWordsValid),
      }));
    }

    // Validation logic for Title's Text
    if (values.title) {
      const isTitleWordsValid = isWordsValid(values.title);
      setValidationStatus((prev) => ({
        ...prev,
        titleValid: true,
        title: checkForValid(isTitleWordsValid),
      }));
    }

    // Validation logic for Author's Text
    if (values.author) {
      const isAuthorValid = values.author.trim().length >= 4;
      setValidationStatus((prev) => ({
        ...prev,
        authorValid: true,
        author: checkForValid(isAuthorValid),
      }));

      const isAuthorWordsValid = isWordsValid(values.author);
      setValidationStatus((prev) => ({
        ...prev,
        authorWordValid: true,
        authorWord: checkForValid(isAuthorWordsValid),
      }));

      const isGeorgianValid = /^[ა-ჰ\s]+$/.test(values.author);
      setValidationStatus((prev) => ({
        ...prev,
        authorGeorgianValid: true,
        georgianAuthor: checkForValid(isGeorgianValid),
      }));
    }
  };

  console.log(imageUrl);

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
        {/* Image Field */}
        <Form.Item required noStyle name={"image"}>
          <ImageUploader
            fieldName="image"
            fileName="files"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </Form.Item>

        <div className={styles["form--grid"]}>
          {/* Author Field */}
          <Form.Item
            name="author"
            // rules={[
            //   {
            //     required: true,
            //     min: 4,
            //     validator: authorFieldValidator,
            //     message: "",
            //   },
            // ]}
          >
            <div className={styles["form__inputWrapper"]}>
              <Label>ავტორი</Label>
              <Input
                placeholder="შეიყვანეთ ავტორი"
                checkValidation={
                  validationStatus.authorValid &&
                  validationStatus.authorWordValid &&
                  validationStatus.authorGeorgianValid
                }
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

          {/* Title Field */}
          <Form.Item
            name="title"
            // rules={[
            //   {
            //     required: true,
            //     min: 2,
            //     validator: titleFieldValidator,
            //     message: "",
            //   },
            // ]}
          >
            <div className={styles["form__inputWrapper"]}>
              <Label>სათური</Label>
              <Input
                placeholder="შეიყვანეთ სათაური"
                checkValidation={validationStatus.titleValid}
              />

              <p className={styles[validationStatus.title]}>
                მინიმუმ 2 სიმბოლო
              </p>
            </div>
          </Form.Item>
        </div>

        {/* Description Field */}
        <Form.Item
          name="description"
          // rules={[
          //   {
          //     required: true,
          //     min: 2,
          //     validator: descriptionFieldValidator,
          //     message: "",
          //   },
          // ]}
        >
          <div className={styles["form__inputWrapper"]}>
            <Label>აღწერა</Label>
            <TextArea
              placeholder="შეიყვანეთ აღწერა"
              allValid={validationStatus.descriptionValid}
            />
            <p className={styles[validationStatus.description]}>
              მინიმუმ 2 სიმბოლო
            </p>
          </div>
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          name="email"
          // rules={[
          //   {
          //     required: true,
          //     validator: emailFieldValidator,
          //     message: (
          //       <Flex gap={8} align="center">
          //         <ErrorCircle />
          //         <p className={styles["form__email--error"]}>
          //           მეილი უნდა მთავრდებოდეს @redberry.ge-ით
          //         </p>
          //       </Flex>
          //     ),
          //   },
          // ]}
        >
          <div
            className={`${styles["form__inputWrapper"]} ${styles["form__email"]}`}
          >
            <Label left>ელ-ფოსტა</Label>
            <Input
              placeholder="Example@redberry.ge"
              checkValidation={validationStatus.emailValid}
            />
          </div>
        </Form.Item>

        <Form.Item shouldUpdate className={styles["form--button"]}>
          {() => (
            <Button
              block
              type="primary"
              htmlType="submit"
              // disabled={
              //   !clientReady ||
              //   !form.isFieldsTouched(true) ||
              //   !!form.getFieldsError().filter(({ errors }) => errors.length)
              //     .length
              // }
            >
              გამოქვეყნება
            </Button>
          )}
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
