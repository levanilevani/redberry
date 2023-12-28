import { ConfigProvider, Input as InputComponent } from "antd";

export const Input = ({ checkValidation, placeholder }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: checkValidation ? "#14D81C" : "#5D37F3",
        colorBorder: checkValidation && "#14D81C",
        colorBgContainer: checkValidation && "#FAF2F3",
        borderRadiusLG: 8,
        marginLG: 8,
      },
    }}
  >
    <InputComponent placeholder={placeholder} size="large" />
  </ConfigProvider>
);
