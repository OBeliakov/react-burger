import React from "react";
import { useSelector } from "./hooks/hooks";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../images/Gear-0.2s-200px.svg";
import styles from "./protected-route.module.css";

type TProtectedRoute = {
  unAuthorized: boolean;
  component: JSX.Element;
};

export const ProtectedRoute = ({
  unAuthorized = false,
  component,
}: TProtectedRoute) => {
  const isAuthChecked = useSelector((store) => store.formReducer.isAuthChecked);
  const user = useSelector((store) => store.formReducer.userInfo);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <div className={styles.container}>
        <img src={Preloader} alt="" />
        <p className="text text_type_main-medium mt-2">
          Let us load it for you
        </p>
      </div>
    );
  }

  if (user && unAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!user && !unAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

type TProtectedProps = Pick<TProtectedRoute, "component">;

export const Authorized = ({ component }: TProtectedProps) => {
  return <ProtectedRoute unAuthorized={false} component={component} />;
};

export const UnAuthorized = ({ component }: TProtectedProps) => {
  return <ProtectedRoute unAuthorized={true} component={component} />;
};
