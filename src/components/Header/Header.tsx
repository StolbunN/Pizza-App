import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import cn from "classnames";

function Header({children, className, ...props}: HeaderProps) {
  return <h1 {...props} className={cn(styles["header"], className)}>{children}</h1>
}

export default Header;