import { useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import styles from "./Cart.module.css";
import { RootState } from "../../store/store";
import { IProduct } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import CartItem from "../../components/CartItem/CartItem";

const DELIVERY_PRICE = 169;

export function Cart() {

  const [cartProducts, setCardProducts] = useState<IProduct[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items
    .map(item => {
      const product = cartProducts.find(p => item.id === p.id);
      if(!product) {
        return 0;
      }
      return item.count * product.price;
    })
    .reduce((acc, item) => acc += item);

  const getItem = async (id: number) => {
    const {data} = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data
  }

  const loadAllItems = async () => {
    const products = await Promise.all(items.map(item => getItem(item.id)))
    setCardProducts(products);
  }

  useEffect(() => {
    loadAllItems()
  }, [items])

  return (
    <div className={styles["cart"]}>
      <Heading className={styles["headling"]}>Корзина</Heading>
      <div className={styles["content"]}>
        <div className={styles["cart-items"]}>
          {items.map(item => {
            const product = cartProducts.find(p => item.id === p.id);
            if(!product) {
              return;
            }
            return <CartItem key={item.id} count={item.count} {...product}/>
          })}
        </div>
        <div className={styles["cart-price"]}>
          <div className={styles["line"]}>
            <div className={styles["text"]}>Итог</div>
            <div className={styles["price"]}>{total}&nbsp;</div>
          </div>
          <hr className={styles["hr"]}/>
          <div className={styles["line"]}>
            <div className={styles["text"]}>Доставка</div>
            <div className={styles["price"]}>{DELIVERY_PRICE}&nbsp;</div>
          </div>
          <hr className={styles["hr"]}/>
          <div className={styles["line"]}>
            <div className={styles["text"]}>Итог <span className={styles["quantity"]}>({items.length})</span></div>
            <div className={styles["price"]}>{total + DELIVERY_PRICE}&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  )
}