import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import { LoadingSpinner } from "../components/common";

import styles from "./style.module.scss";

export default function ProtectedRoute() {
  const { isLoggedIn, pending } = useContext(GlobalContext);

  if (pending) {
    return (
      <div className={styles["loadingContainer"]}>
        <LoadingSpinner />
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
