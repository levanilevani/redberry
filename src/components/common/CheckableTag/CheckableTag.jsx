import { Tag, ConfigProvider } from "antd";
const { CheckableTag: CheckableTagComponent } = Tag;

export const CheckableTag = ({
  backgroundColor,
  textColor,
  tag,
  children,
  ...otherProps
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadiusSM: 30,
          marginXS: 24,
          colorPrimary: backgroundColor,
        },
      }}
    >
      <CheckableTagComponent
        style={{
          color: textColor,
          fontFamily: "FiraGo",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "16px",
          padding: "8px 16px",
          overflowX: "auto",
        }}
        key={tag}
        {...otherProps}
      >
        {children}
      </CheckableTagComponent>
    </ConfigProvider>
  );
};
