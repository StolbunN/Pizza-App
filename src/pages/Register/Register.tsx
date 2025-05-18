import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "../Login/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, userActions } from "../../store/user.slice";
import { AppDispatch, RootState } from "../../store/store";

export type RegisterForm = {
  email: {
    value: string
  },
  password: {
    value: string
  },
  name: {
    value: string
  }
}

export function Register() {

  const navigate = useNavigate();
  const {jwt, registerErrorMessage} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(jwt) {
      navigate("/");
    }
  }, [jwt, navigate])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(userActions.clearRegisterError())
    const target = event.target as typeof event.target & RegisterForm;
    const {email, password, name} = target;
    await sendLogin(email.value, password.value, name.value);
  }

  const sendLogin = async (email: string, password: string, name: string) => {
    dispatch(register({email, password, name}))
  }

  return (
    <div className={styles["login"]}>
      <Heading>Регистрация</Heading>
      {registerErrorMessage && <div className={styles["error"]}>{registerErrorMessage}</div>}
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input type="email" name="email" id="email" placeholder="Email"/>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input type="password" name="password" id="password" placeholder="Пароль"/>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="name">Ваше имя</label>
          <Input type="text" name="name" id="name" placeholder="Имя"/>
        </div>
        <Button appearance="big" className={styles["btn-login"]}>Зарегистрироваться</Button>
      </form>
      <div className={styles["registration"]}>
        <p>Есть аккаунт?</p>
        <Link to="/auth/login" className={styles["link"]}>Войти</Link>
      </div>
    </div>
  )
}