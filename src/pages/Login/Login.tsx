import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import { ILoginResponse } from "../../interfaces/auth.interface";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user.slice";
import { AppDispatch } from "../../store/store";

export type LoginForm = {
  email: {
    value: string
  },
  password: {
    value: string
  }
}

export function Login() {

  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null)
    const target = event.target as typeof event.target & LoginForm;
    const {email, password} = target;
    await sendLogin(email.value, password.value);
  }

  const sendLogin = async (email: string, password: string) => {
    try {
      const {data} = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password
      })
      dispatch(userActions.addJwt(data.access_token));
      navigate("/");
    } catch(error) {
      if(error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  return (
    <div className={styles["login"]}>
      <Heading>Вход</Heading>
      {error && <div className={styles["error"]}>{error}</div>}
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input type="email" name="email" id="email" placeholder="Email"/>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input type="password" name="password" id="password" placeholder="Пароль"/>
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