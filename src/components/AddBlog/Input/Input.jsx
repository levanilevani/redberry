import { ConfigProvider, Input as InputComponent } from "antd";

export const Input = ({ allValid, placeholder }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: allValid ? "#14D81C" : "#5D37F3",
        colorBorder: allValid && "#14D81C",
        colorBgContainer: allValid && "#FAF2F3",
        borderRadiusLG: 8,
        marginLG: 8,
      },
    }}
  >
    <InputComponent placeholder={placeholder} size="large" />
  </ConfigProvider>
);
