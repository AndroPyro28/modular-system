import React from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

function TeachersloginLogic() {

    const validationSchema = Yup.object().shape({
        teacherId: Yup.string().required(),
        password: Yup.string().required()
    })

    const initialValues = {
        teacherId: '',
        password: ''
    }

    const onSubmit = async (values) => {
        try {
            const res = await axios.post("/api/teacher/login", values, {
                withCredentials: true
            });

            const { success, token, msg } = res.data;

            alert(msg);

            if(success) {
                Cookies.set("userToken", token);
                Cookies.set("status", "teacher");
                window.location.href = "/teacher/dashboard";
                // const cookieValue = JSON.stringify({token: token, status: "teacher"})
                // Cookies.set("status", "teacher");
                //  console.log(JSON.parse(Cookies.get("userToken")))
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        validationSchema, initialValues,
        onSubmit
    }
}

export default TeachersloginLogic
