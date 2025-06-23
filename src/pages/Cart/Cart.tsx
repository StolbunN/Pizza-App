import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import styles from "./Cart.module.css";
import { AppDispatch, RootState } from "../../store/store";
import { IProduct } from "../../interfaces/product.interface";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import CartItem from "../../components/CartItem/CartItem";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_PRICE = 169;

export function Cart() {

  const [cartProducts, setCardProducts] = useState<IProduct[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const discount = useSelector((state: RootState) => state.cart.discount);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const promoRef = useRef<HTMLInputElement>(null);

  const total = items
    .map(item => {
      const product = cartProducts.find(p => item.id === p.id);
      if (!product) {
        return 0;
      }
      return item.count * product.price;
    })
    .reduce((acc, item) => acc += item, 0);

  const totalWithDiscount = discount ? Math.floor(total - total * (discount / 100)) : total;

  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const products = await Promise.all(items.map(item => getItem(item.id)));
    setCardProducts(products);
  };

  const checkout = async () => {
    await axios.post(`${PREFIX}/order`, {
      products: items
    }, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    navigate("/success");
    dispatch(cartActions.clean());
  };

  const applyPromo = () => {
    dispatch(cartActions.addDiscount(promoRef.current?.value));
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <div className={styles["cart"]}>
      <Heading className={styles["headling"]}>Корзина</Heading>
      <div className={styles["content"]}>
        <div className={styles["cart-items"]}>
          {items.map(item => {
            const product = cartProducts.find(p => item.id === p.id);
            if (!product) {
              return;
            }
            return <CartItem key={item.id} count={item.count} {...product} />;
          })}
        </div>
        <div className={styles["promo-code"]}>
          <input disabled={discount ? true : false} ref={promoRef} type="text" className={styles["promo-code__input"]} placeholder="Применить" />
          <Button disabled={discount ? true : false} className={styles["promo-code__button"]} onClick={applyPromo}>Применить</Button>
        </div>
        <div className={styles["cart-price"]}>
          <div className={styles["line"]}>
            <div className={styles["text"]}>Итог</div>
            <div className={styles["price"]}>{total}&nbsp;</div>
          </div>
          <hr className={styles["hr"]} />
          {discount && (<><div className={styles["line"]}>
            <div className={styles["text"]}>Промокод&nbsp;<span className={styles["discount"]}>(Скидка {discount}&#x25;)</span></div>
            <div className={styles["price"]}>{totalWithDiscount}&nbsp;</div>
          </div>
            <hr className={styles["hr"]} /></>)}
          <div className={styles["line"]}>
            <div className={styles["text"]}>Доставка</div>
            <div className={styles["price"]}>{items.length > 0 ? DELIVERY_PRICE : items.length}&nbsp;</div>
          </div>
          <hr className={styles["hr"]} />
          <div className={styles["line"]}>
            <div className={styles["text"]}>Итог&nbsp;<span className={styles["quantity"]}>({items.length})</span></div>
            <div className={styles["price"]}>{items.length > 0 ? (totalWithDiscount + DELIVERY_PRICE) : items.length}&nbsp;</div>
          </div>
        </div>
        <div className={styles["checkout"]}>
          <Button appearance="big" onClick={checkout} disabled={items.length === 0}>оформить</Button>
        </div>
      </div>
    </div>
  );
}