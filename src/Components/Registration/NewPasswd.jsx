import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RiLockPasswordLine } from "react-icons/ri";
// import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import "./ForgotPasswd.css";

const initialValues = {
    password: '',
    confirmpassword: ''
}

export const loginSchema = yup.object({
    password: yup.string().min(5).required("Please Enter the password"),
    confirmpassword: yup.string().required("Re-enter your input password").oneOf([yup.ref('password'), null], 'Passwords must match')
});

const NewPasswd = () => {
    const regData = JSON.parse(localStorage.getItem("Registration_data"))
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            //console.log(values);
            switch (values) {
                case (values.password === regData.password):
                    return (toast.warning("same password detected.") && toast.success("Password changed successfully!!"));
                case (values.password !== regData.password):
                    return (toast.success("Password changed successfully!!"));
                default:
                    return (toast.error("Password not matching!"));
            }
        }
    });
    return (
        <>
            <ToastContainer />
            <h2> Reset New Password </h2>
            <div className='container'>
                <form>
                    <div className="passwd sub-container">
                        <p className="name-div"> New Password</p><br />
                        <div className="formControl">
                            <RiLockPasswordLine className='icons' />
                            <input
                                type="password"
                                className="input-inline"
                                id="confirmpassword"
                                name="password"
                                placeholder='Enter new password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <br />
                        {errors.password && touched.password ? (
                            <p className='formError'>{errors.password}</p>
                        ) : null}
                    </div>
                    <div className="passwd sub-container">
                        <p className="name-div"> Confirm Password</p><br />
                        <div className="formControl">
                            <RiLockPasswordLine className='icons' />
                            <input
                                type="password"
                                className="input-inline"
                                id="confirmpassword"
                                name="confirmpassword"
                                placeholder='Enter confirm password'
                                value={values.confirmpassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <br />
                        {errors.confirmpassword && touched.confirmpassword ? (
                            <p className='formError'>{errors.confirmpassword}</p>
                        ) : null}
                    </div>
                </form>
                <button className='btn-log' type="submit" onClick={handleSubmit}><Link to="#" className='reset-link'> Reset </Link></button>
            </div>
        </>
    )
}

export default NewPasswd
