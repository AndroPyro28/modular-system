import React from 'react'
import FormikControl from '../../FormikComponents/FormikControl'
import { Formik, Form } from 'formik';
import './teacherslogin.css'
import TeachersloginLogic from './TeachersloginLogic';
function TeachersLogin() {

    const {onSubmit, initialValues, validationSchema} = TeachersloginLogic();


    return (
        <div className="login__container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        return (
                            <div className="form__divider">
                            <Form autoComplete="off" className="form__container">
                                <img className="bpcLogo" src="/img/bpclogo.png"/>
                                <h1>Teacher Login</h1>
                                
                                <FormikControl
                                    type="text"
                                    control="input"
                                    placeholder="Teacher ID"
                                    name="teacherId"
                                />

                                <FormikControl
                                    type="password"
                                    control="input"
                                    placeholder="Password"
                                    name="password"
                                />

                                <div className="input__container">
                                    <button type="submit">Login</button>
                                </div>
                            </Form>
                            <section className="instruction__container">
                                <h1>Instruction</h1>

                                <ol type="1">
                                    <li>Dont Share your ID and password to anyone</li>
                                    <li>Make sure that you can access your BPC email to reset your password</li>
                                    <li>Always use strong password to make your account more secure</li>
                                    
                                </ol>
                            </section>
                            
                            </div> 
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default TeachersLogin
