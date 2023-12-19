import { ConfigProvider, Tag as TagComponent } from "antd";

export const Tag = ({
  tagColor,
  textColor,
  children,
  small,
  checked,
  ...otherProps
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadiusSM: 30,
          marginXS: 0,
        },
      }}
    >
      <TagComponent
        style={{
          color: textColor,
          fontFamily: "FiraGo",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "16px",
          padding: small ? "6px 16px" : "8px 16px",
          border: checked ? "1px solid #000" : "",
          cursor: "pointer",
        }}
        color={tagColor}
        {...otherProps}
      >
        {children}
      </TagComponent>
    </ConfigProvider>
  );
};
