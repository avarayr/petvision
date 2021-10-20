import { motion } from "framer-motion";
import styles from "./button.module.scss";

function Button({
  children,
  onClick,
  disabled,
  style,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
      style={style}
      whileTap={{ scale: 0.9, boxShadow: "rgba(0, 0, 0, 0) 0px 2px 4px 0px" }}
    >
      {children}
    </motion.button>
  );
}

export default Button;
