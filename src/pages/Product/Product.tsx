import { Await, useLoaderData, useNavigate } from "react-router-dom"
import { IProduct } from "../../interfaces/product.interface";
import { Suspense } from 'react';
import styles from "./Product.module.css";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import Rating from "../../components/Rating/Rating";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export function Product() {

  const data = useLoaderData() as {data: IProduct};
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
      <Suspense fallback={<div>Загружаю...</div>}>
        <Await
          resolve={data.data}
        >
          {({data}: {data: IProduct}) => (
            <div className={styles["product"]}>
              <header className={styles["header"]}>
                <button className={styles["back"]} onClick={() => {navigate(-1)}}>
                  <img src="/arrow-icon.svg" alt="Вернуться назад" />
                </button>
                <Heading>{data.name}</Heading>
                <Button className={styles["btn-cart"]} onClick={() => dispatch(cartActions.add(data.id))}>
                  <img src="/cart-icon-white.svg" alt="Иконка корзины" />
                  <span>В корзину</span>
                </Button>
              </header>
              <div className={styles["content"]}>
                <div className={styles["img-wrapper"]}>
                  <img className={styles["img"]} src={data.image} alt="Изображение продукта" />
                </div>
                <div className={styles["description"]}>
                  <div className={styles["line"]}>
                    <div className={styles["text"]}>Цена</div>
                    <div className={styles["price"]}>
                    <span>{data.price}&nbsp;</span>
                    </div>
                  </div>
                  <hr className={styles["hr"]}/>
                  <div className={styles["line"]}>
                    <div className={styles["text"]}>Рейтинг</div>
                    <Rating rating={data.rating}/>
                  </div>
                  <div className={styles["composition"]}>
                    <header className={styles["title"]}>Состав</header>
                    <ul className={styles["list"]}>
                      {data.ingredients.map((item, i) => (
                        <li key={i} className={styles["item"]}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
          }
        </Await>
      </Suspense>
  )
}