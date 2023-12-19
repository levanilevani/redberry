import { Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

export const LoadingSpinner = () => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
);
