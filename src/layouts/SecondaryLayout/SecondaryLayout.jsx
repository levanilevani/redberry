import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";
import { Outlet, Link } from "react-router-dom";

import { Flex } from "antd";
import { Button } from "../../components/common";

import Logo from "../../assets/svg/logo-primary.svg?react";

import styles from "./styles.module.scss";

export const SecondaryLayout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(GlobalContext);

  return (
    <div className={styles["layout"]}>
      <header className={styles["layout__header"]}>
        <div className={styles["layout__header--icon"]}>
          <Link to="/">
            <Logo />
          </Link>
          <Flex gap={16}>
            <Button onClick={() => setIsLoggedIn(false)}>გასვლა</Button>
            <Button onClick={() => navigate("/add-blog")}>დაამატე ბლოგი</Button>
          </Flex>
        </div>
      </header>

      <main className={styles["layout__main"]}>
        <div className={styles["layout__main--back"]}>
          {/* <Button shape="circle">{"<"}</Button> */}
        </div>
        <section className={styles["layout__main--outlet"]}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
