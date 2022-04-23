import Cookies from 'js-cookie';
import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

function NormalRoutes({ Component, isAuth, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuth) {
                    return (
                        <Component />
                    );
                }
                else {
                    if (Cookies.get("status") === "teacher") {
                        return (
                            <Redirect to={{ pathname: "/teacher/dashboard", state: { from: props.location } }} />
                        );
                    }
                    else {
                        return (
                            <Redirect to={{ pathname: "/student/dashboard", state: { from: props.location } }} />
                        );
                    }

                }
            }}
        />
    )
}

export default NormalRoutes
