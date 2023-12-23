import styles from "./styles.module.scss";

export const Label = ({ children, left }) => {
  return (
    <label className={`${styles["label"]} ${styles[left ? "left" : ""]}`}>
      {children}
    </label>
  );
};
