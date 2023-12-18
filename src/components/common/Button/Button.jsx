import { Button as AntdButton, ConfigProvider } from "antd";

export const Button = ({ children, ...otherProps }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            contentFontSizeLG: 14,
            paddingInlineLG: 20,
            fontWeight: 500,
          },
        },
        token: {
          colorPrimary: "#5D37F3",
          lineHeight: 1.5,
        },
      }}
    >
      <AntdButton size="large" type="primary" {...otherProps}>
        {children}
      </AntdButton>
    </ConfigProvider>
  );
};
