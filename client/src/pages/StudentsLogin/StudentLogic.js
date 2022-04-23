import React from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
function StudentLogic() {

    const validationSchema = Yup.object().shape({
        studentId: Yup.string().required(),
        password: Yup.string().required()
    })

    const initialValues = {
        studentId: '',
        password: ''
    }

    const onSubmit = async (values) => {
        try {
            const res = await axios.post(`/api/student/login`, values, {
                withCredentials: true
            });

            const {success, token, msg} = res.data;

            if(success) {
                Cookies.set("userToken", token);
                Cookies.set("status", "teacher");
                window.location.href = "/student/dashboard";
            }
            alert(msg);
            
        } catch (error) {
            
        }
     }

     return {onSubmit, initialValues, validationSchema}

}

export default StudentLogic
