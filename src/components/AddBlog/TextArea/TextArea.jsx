import { ConfigProvider, Input as AntdInput } from "antd";
import React from "react";

export const TextArea = ({ placeholder, allValid }) => {
  return (
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
      <AntdInput.TextArea
        placeholder={placeholder}
        autoSize={{ minRows: 5, maxRows: 5 }}
        maxLength={5000}
        size="large"
      />
    </ConfigProvider>
  );
};
