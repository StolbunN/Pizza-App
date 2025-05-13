import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

export function Login() {

  const getData = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);
  }

  return (
    <div className={styles["login"]}>
      <Heading>Вход</Heading>
      <form className={styles["form"]} onSubmit={getData}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input type="email" id="email" placeholder="Email"/>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input type="password" id="password" placeholder="Пароль"/>
        </div>
        <Button appearance="big" className={styles["btn-login"]}>Вход</Button>
      </form>
      <div className={styles["registration"]}>
        <p>Нет аккаунта?</p>
        <Link to="/auth/register" className={styles["link"]}>Зарегистрироваться</Link>
      </div>
    </div>
  )
}