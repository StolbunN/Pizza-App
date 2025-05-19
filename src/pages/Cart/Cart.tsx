import { useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import styles from "./Cart.module.css";
import { RootState } from "../../store/store";
import { IProduct } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import CartItem from "../../components/CartItem/CartItem";

export function Cart() {

  const [cartProducts, setCardProducts] = useState<IProduct[]>([])
  const items = useSelector((state: RootState) => state.cart.items);


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
      <Heading>Корзина</Heading>
      <div className={styles["cart-items"]}>
        {items.map(item => {
          const product = cartProducts.find(p => item.id === p.id);
          if(!product) {
            return;
          }
          return <CartItem key={item.id} count={item.count} {...product}/>
        })}
      </div>
    </div>
  )
}