import { Outlet, Link } from "react-router-dom";

import Logo from "../../assets/svg/logo-primary.svg?react";

import styles from "./styles.module.scss";

export const AddBlogLayout = () => (
  <div className={styles["layout"]}>
    <div className={styles["layout--icon"]}>
      <Link to="/">
        <Logo className={"icon"} />
      </Link>
    </div>
    <main className={styles["layout__main"]}>
      <section className={styles["layout__main--outlet"]}>
        <Outlet />
      </section>
    </main>
  </div>
);
