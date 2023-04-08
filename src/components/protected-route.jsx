import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Preloader from "../images/Gear-0.2s-200px.svg";
import styles from "./protected-route.module.css";

export const ProtectedRoute = ({ unAuthorized = false, component }) => {
    const isAuthChecked = useSelector(
        (store) => store.formReducer.isAuthChecked
    );
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

export const Authorized = (props) => (
    <ProtectedRoute unAuthorized={false} {...props} />
);

export const UnAuthorized = (props) => {
    return <ProtectedRoute unAuthorized={true} {...props} />;
};

ProtectedRoute.propTypes = {
    unAuthorized: PropTypes.bool,
    component: PropTypes.node,
};
