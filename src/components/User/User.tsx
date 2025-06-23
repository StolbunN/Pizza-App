import styles from "./User.module.css";
import { UserProps } from "./User.props";
import avatar from "../../assets/avatar.png";

export function User({ name, email }: UserProps) {
  return (
    <div className={styles["user-wrapper"]}>
      <div className={styles["avatar"]}>
        <img src={avatar} alt="Аватарка пользователя" />
      </div>
      <p className={styles["name"]}>{name}</p>
      <p className={styles["email"]}>{email}</p>
    </div>
  );
}