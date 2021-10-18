import styles from "./container.module.scss";

function Container({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
