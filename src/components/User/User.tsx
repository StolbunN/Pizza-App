import styles from "./User.module.css"

export function User() {
  return(
    <div className={styles["user-wrapper"]}>
      <div className={styles["avatar"]}>
        <img src="./avatar.png" alt="Аватарка пользователя" />
      </div>
      <p className={styles["name"]}>Никита Столбов</p>
      <p className={styles["email"]}>test@test.test</p>
    </div>
  )
}