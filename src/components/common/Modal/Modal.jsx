import { Modal as ModalComponent, ConfigProvider } from "antd";
import Theme from "./theme.json";

export const Modal = ({ open, handleOk, children }) => {
  return (
    <ConfigProvider theme={Theme}>
      <ModalComponent
        centered
        open={open}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
      >
        {children}
      </ModalComponent>
    </ConfigProvider>
  );
};
