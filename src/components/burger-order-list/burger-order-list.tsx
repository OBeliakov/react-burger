import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "../../components/hooks/hooks";
import { useLocation } from "react-router-dom";
import BurgerOrder from "./burger-order/burger-order";
import styles from "./burger-order-list.module.css";
import { useDispatch } from "react-redux";
import { OPEN_CARD_MODAL } from "../../services/constants";
const BurgerOrderList = (): JSX.Element | null => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleOpenClick = () => {
    dispatch({ type: OPEN_CARD_MODAL });
  }

  const orderInfo = useSelector((store) => store.orderReducer.data);
  return orderInfo && orderInfo.length ? (
    <ul className={`${styles.order_list} ml-15 custom-scroll`}>
      {[...orderInfo].map((item) => {
        return (
          item.order && (
            <li onClick={handleOpenClick} className={`${styles.item} mb-6`} key={item.order._id}>
              <Link to={`/feed/feedId`} state={{ background: location }}>
                <BurgerOrder order={item.order} />
              </Link>
            </li>
          )
        );
      })}
    </ul>
  ) : null;
};

export default BurgerOrderList;
