import styles from "./hint-text.module.scss";

function HintText({
  children,
  className,
  style,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p className={styles.hintText} {...props} style={style}>
      {children}
    </p>
  );
}
export default HintText;
