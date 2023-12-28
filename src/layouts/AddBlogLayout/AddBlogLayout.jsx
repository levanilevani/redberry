import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { Outlet, Link, useNavigate } from "react-router-dom";

import { Modal, Button } from "../../components/common";
import { Flex } from "antd";

import SuccessCircle from "../../assets/svg/success-circle.svg?react";
import Logo from "../../assets/svg/logo-primary.svg?react";

import styles from "./styles.module.scss";

export const AddBlogLayout = () => {
  const { openSuccessModal, setOpenSuccessModal } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className={styles["layout"]}>
      <div className={styles["layout--icon"]}>
        <Link to="/">
          <Logo className={"icon"} />
        </Link>
      </div>
      <main className={styles["layout__main"]}>
        <Modal
          open={openSuccessModal}
          handleOk={() => setOpenSuccessModal(false)}
        >
          <Flex vertical gap={48} justify="center">
            <Flex vertical gap={16} align="center" style={{ marginTop: 20 }}>
              <SuccessCircle />
              <p className={styles["layout--modalText"]}>
                ჩანაწი წარმატებით დაემატა
              </p>
            </Flex>
            <Button
              onClick={() => {
                navigate("/");
                setOpenSuccessModal(false);
              }}
              className={styles["layout--modalBtn"]}
            >
              მთავარ გვერდზე დაბრუნება
            </Button>
          </Flex>
        </Modal>
        <section className={styles["layout__main--outlet"]}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
