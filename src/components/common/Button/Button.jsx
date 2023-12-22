import { Button as AntdButton, ConfigProvider } from "antd";
import Theme from "./theme.json";

export const Button = ({ children, ...otherProps }) => {
  return (
    <ConfigProvider theme={Theme}>
      <AntdButton size="large" type="primary" {...otherProps}>
        {children}
      </AntdButton>
    </ConfigProvider>
  );
};
