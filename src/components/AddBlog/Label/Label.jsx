import styles from "./styles.module.scss";

export const Label = ({ children, left, noStyle }) => {
  return (
    <label
      className={`${styles["label"]} ${styles[left ? "left" : ""]} ${
        styles[noStyle ? "noStyle" : ""]
      }`}
    >
      {children}
    </label>
  );
};
