import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
function TeachersRoutes({ Component, isAuth, ...rest }) {
    // const {status} = useSelector(state => state?.authReducer?.currentUser);
    const status = Cookies.get("status");
    console.log("teachersRoutes", status)
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth && status === "teacher") {
                    return (
                        <Component />
                    );
                }
                else {
                    return (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    );
                }
            }}
        />
    )
}

export default TeachersRoutes
