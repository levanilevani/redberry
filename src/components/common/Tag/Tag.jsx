import { ConfigProvider, Tag as TagComponent } from "antd";

export const Tag = ({ tagColor, textColor, text, small }) => {
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
        }}
        color={tagColor}
      >
        {text}
      </TagComponent>
    </ConfigProvider>
  );
};
