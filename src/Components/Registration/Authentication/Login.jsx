import React from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import "../styling/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../RegDetails/Auth/Firebase.js';

const initialValues = {
    email: '',
    password: '',
    check: false,
}

export const loginSchema = yup.object({
    email: yup.string().email().required("Please Enter the required data").matches(/@/, 'Email must contain "@" symbol'),
    password: yup.string().min(5).required("Please Enter the password")
});

const Login = () => {
    const navigate = useNavigate()
    const regData = JSON.parse(localStorage.getItem("Registration_data"))
    //console.log("getting data: ", regData)
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const response = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log("response: ", response);
            ((values.password === regData.password) && (values.email === regData.email)) ?
                setTimeout(() => {
                    navigate('/dash');
                }, 1000) &&
                toast.success("Login successful!!", {
                    position: "top-center"
                })

                : toast.error("Enter correct credentials") && toast.error("Recheck your email or password");
            // position: toast.POSITION.TOP_CENTER

        }
    });


    return (
        <div className='login-body'>
            <ToastContainer />
            <h2 className='loginAcc'> Ready to Login </h2>
            <form onSubmit={handleSubmit} className='log-container'>
                <div className="email sub-container-log">
                    <p className="name-div">Email Address </p><br />
                    <div className="formControl-log">
                        {/* <i className="icons fa-regular fa-user" /> */}
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
                <div className="passwd sub-container-log">
                    <p className="name-div">Password</p><br />
                    <div className="formControl-log">
                        <RiLockPasswordLine className='icons' />
                        <input
                            type="password"
                            className="input-inline-log"
                            id="password"
                            name="password"
                            placeholder='*****'
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
                <Link to="/forgot" className='forgot-section'> Forgot password? </Link>
                <button type="submit" className='btn-log' onClick={handleSubmit}> Login </button>
                <p className='log-account-section'>Don't have an account? <Link to="/create" className='reg'> Register here </Link></p>
            </form>
        </div>
    )
}

export default Login
