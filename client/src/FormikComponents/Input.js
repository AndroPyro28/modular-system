import React from 'react'
import { Field, ErrorMessage } from 'formik'
function Input({name, type, label, placeholder, ...rest}) {
    return (
        <div className="input__container">
            <label id={name}>{label}</label>
            <Field type={type} id={name} name={name} placeholder={placeholder}/>
            <ErrorMessage name={name} component="div" className="error-message"/>
        </div>
    )
}

export default Input
