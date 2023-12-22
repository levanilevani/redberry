import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

import Logo from "../../assets/svg/logo-primary.svg?react";

import { Button, Modal } from "../../components/common";
import { LoginForm } from "../../components";

import styles from "./styles.module.scss";

export const MainLayout = () => {
  const { openLoginModal, setOpenLoginModal } = useContext(GlobalContext);

  return (
    <div className={styles["layout"]}>
      <header className={styles["layout__header"]}>
        <div>
          <Link to="/">
            <Logo />
          </Link>
          <Button onClick={() => setOpenLoginModal(true)}>შესვლა</Button>
        </div>
      </header>

      <main className={styles["layout__outlet"]}>
        <div>
          <Outlet />
          <Modal
            open={openLoginModal}
            handleOk={() => setOpenLoginModal(false)}
          >
            <LoginForm />
          </Modal>
        </div>
      </main>
    </div>
  );
};
