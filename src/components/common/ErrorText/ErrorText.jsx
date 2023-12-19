import { Typography } from "antd";

export const ErrorText = ({ children }) => {
  return (
    <Typography.Text
      type="danger"
      style={{
        fontSize: 40,
      }}
    >
      {children}
    </Typography.Text>
  );
};
