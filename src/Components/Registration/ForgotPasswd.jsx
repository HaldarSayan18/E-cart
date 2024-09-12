import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MdOutlineAttachEmail } from "react-icons/md";
// import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import "../styling/ForgotPasswd.css";

const initialValues = {
    email: ''
}

export const loginSchema = yup.object({
    email: yup.string().email().required("Enter the correct email").matches(/@/, 'Email must contain "@" symbol')
});

const ForgotPasswd = () => {
    const regData = JSON.parse(localStorage.getItem("Registration_data"))?.email;
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            //console.log(values);

            ((values.email === regData)) ? toast.success("Email sent successfully!!")
                // <Link to="/new"></Link>
                : toast.error("Enter correct email id");

        }
    });
    return (
        <>
            <ToastContainer />
            <h2> Forgot Password </h2>
            <div className='container'>
                <form>
                    <div className="email sub-container-log">
                        <p className="name-div"> Enter Registered Email </p><br />
                        <div className="formControl">
                            <MdOutlineAttachEmail className='icons' />
                            <input
                                type="email"
                                className="input-inline-log"
                                id="email"
                                name="email"
                                placeholder='Enter your email id'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <br />
                        {errors.email && touched.email ? (
                            <p className='formError'>{errors.email}</p>
                        ) : null}
                        {/* console.log("Email:",email) */}
                    </div>
                </form>
                <button className='btn-log' type="submit" onClick={handleSubmit}><Link to="#" className='verify-link'> Verify </Link></button>
            </div>
        </>
    )
}

export default ForgotPasswd
