import { Pagination } from "antd";

import { Button, Select } from "../../components/common";

export const Home = () => {
  return (
    <Select
      options={[
        {
          value: "1",
          label: "Not Identified",
        },
      ]}
    />
  );
};
