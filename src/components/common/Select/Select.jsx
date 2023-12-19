import { Select as SelectComponent, ConfigProvider } from "antd";

export const Select = ({ options }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeightLG: 46,
          lineHeight: 1.5,
          borderRadiusLG: 12,
          lineWidth: 1.5,
          colorPrimary: "#5D37F3",
        },
      }}
    >
      <SelectComponent
        style={{ maxWidth: "288px", width: "100%" }}
        showSearch={false}
        mode="multiple"
        size="large"
        placeholder="აირჩიეთ კატეგორია"
        options={options}
      />
    </ConfigProvider>
  );
};
