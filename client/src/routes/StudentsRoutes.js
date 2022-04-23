import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
function StudentsRoutes({ Component, isAuth, ...rest }) {
    // const {status} = useSelector(state => state?.authReducer?.currentUser);
    const status = Cookies.get("status");
    console.log("studentsRoutes", status)
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth && status === "student") {
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

export default StudentsRoutes
