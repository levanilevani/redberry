import styles from './styles.module.scss';

export const Label = ({ children, left, noStyle }) => {
  return <label className={`${styles['label']}`}>{children}</label>;
};
