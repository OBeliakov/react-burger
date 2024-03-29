import React from "react";
import styles from "./navigation-menu.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "../hooks/hooks";
import { logOut } from "../../services/actions/formActions";
import { API_BASE } from "../../services/constants";

const NavigationMenu = ({ desc }: { desc: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const _logOutUrl = `${API_BASE}/auth/logout`;

  const signOut = () => {
    dispatch(logOut(_logOutUrl));
    navigate("/login", { replace: true });
  };

  const linkActiveClass = `${styles.active} ${styles.nav_link}  text text_type_main-medium`;
  const linkClass = `${styles.nav_link} text text_type_main-medium`;

  return (
    <div className={styles.container}>
      <div className={`${styles.nav_container}  mr-15`}>
        <nav>
          <ul className={styles.list}>
            <li className="pb-5 pt-5">
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${linkActiveClass}` : `${linkClass}`
                }
                to="/profile"
                end
              >
                Профиль
              </NavLink>
            </li>
            <li className="pb-5 pt-5">
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${linkActiveClass}` : `${linkClass}`
                }
                to="/profile/orders"
              >
                История заказов
              </NavLink>
            </li>
            <li className="pb-5 pt-5">
              <button
                className={`${styles.logout_btn} text text_type_main-medium`}
                onClick={signOut}
              >
                Выход
              </button>
            </li>
          </ul>
        </nav>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default NavigationMenu;
