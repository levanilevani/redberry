import { Flex, Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

export const LoadingSpinner = () => (
  <Flex justify="center">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
  </Flex>
);
