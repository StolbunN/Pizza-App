import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import styles from "./Menu.module.css"

export function Menu() {
  return (
  <div className={styles["header"]}>
    <Header>Меню</Header>
    <Search type="search" placeholder="Введите блюдо или состав"/>
  </div>)
}