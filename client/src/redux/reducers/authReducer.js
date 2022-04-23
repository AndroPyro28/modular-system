const initialValues = {
    currentUser: {},
    isAuth: false,
}
const authReducer = (state = initialValues, action) => {
    switch (action.type) {
        case "AUTHENTICATION__SUCCESS":
            return action.payload;

        case "AUTHENTICATION__FAILED":
            return action.payload;

        default: return state;
    }
}

export default authReducer