import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.props';

function Button({ children, className, appearance = "small", ...props }: ButtonProps) {

  return (
    <button {...props} className={cn(styles['button'], styles['accent'], className, {
      [styles['big']]: appearance === "big",
      [styles['small']]: appearance === "small"
    })}>{children}</button>
  );
}

export default Button;