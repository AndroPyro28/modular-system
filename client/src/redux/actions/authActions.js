export const authenticationSuccess = (currentUser = {}, isAuth=false) => {
    return {
        type: "AUTHENTICATION__SUCCESS",
        payload: {
            currentUser,
            isAuth
        }
    }
}

export const authenticationFailed = (currentUser={}, isAuth=false) => {
    return {
        type: "AUTHENTICATION__FAILED",
        payload: {
            currentUser,
            isAuth
        }
    }
}