import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../styling/CreateAccount.css";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import PhoneInput from 'react-phone-number-input';
import new_user from "../images/new_user.png";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../RegDetails/Auth/Firebase.js';

const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    company: '',
    check: false,
}

export const registerSchema = yup.object({
    firstname: yup.string().min(2).max(30).required("Please Enter the required data"),
    lastname: yup.string().min(2).max(30).required("Please Enter the required data"),
    email: yup.string().email().required("Please Enter the required data").matches(/@/, 'Email must contain "@" symbol'),
    password: yup.string().min(5).required("Please Enter the password"),
    confirmpassword: yup.string().required("Re-enter your input password").oneOf([yup.ref('password'), null], 'Passwords must match'),
    phoneNumber: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    dateOfBirth: yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
    company: yup.string().required('Company name is required'),
    // check: yup.bool().required().oneOf([true], 'Terms must be accepted')
});

const CreateAccount = () => {
    const [value, setValue] = useState()
    const [image, setImage] = useState(new_user)
    const { values, touched, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            console.log("form submitted = ", values);

            try {
                const response = await createUserWithEmailAndPassword(auth, values.email, values.password);
                console.log("response: ", response);
                localStorage.setItem("Registration_data", JSON.stringify(values));
                toast.success("Registration successful!!", {
                    position: "top-center",
                });
            }
            catch (error) {
                console.error("Error during registration: ", error);
                if (error.email === 'auth/email-already-in-use') {
                    toast.warning("Already Registered!! Try to login", {
                        position: "top-center"
                    })
                }
                else {
                    toast.error("Registration failed. Please try again.", {
                        position: "top-center",
                    });
                }
            }

        }
    });

    const onFile = (event) => {
        console.log("image show: ", event.target.files[0])
        setImage(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <div className='createAcc-body'>
            <ToastContainer />
            <h2 className='RegAcc'> Create an Account </h2>
            <div className='reg-container'>
                <div className="browseimg">
                    <div className="upld">
                        <label htmlFor="upload-button" className="uploadBtn">
                            <img src={image} alt="dummy" width="300" height="300" />

                        </label>

                        <input
                            type="file"
                            accept='image/png, image/gif, image/jpeg, image/jpg, image/svg'
                            id="upload-button"
                            style={{
                                display: "none"
                            }}
                            onChange={onFile}
                        />
                        <br />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="form-reg">
                    <div className="firstname sub-container">
                        <p className="reg-name-div">First Name </p><br />
                        <div className="formControl-reg">
                            <FaRegUserCircle className='icons' />
                            <input
                                type="text"
                                className="input-inline"
                                id="name"
                                name="firstname"
                                placeholder='Enter your first name'
                                value={values.firstname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.firstname && touched.firstname ? (
                            <p className='formError'>{errors.firstname}</p>
                        ) : null}
                    </div>

                    <div className="lastname sub-container">
                        <p className="reg-name-div">Last Name </p><br />
                        <div className="formControl-reg">
                            <FaRegUserCircle className='icons' />
                            <input
                                type="text"
                                className="input-inline"
                                id="name"
                                name="lastname"
                                placeholder='Enter your last name'
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.lastname && touched.lastname ? (
                            <p className='formError'>{errors.lastname}</p>
                        ) : null}
                    </div>

                    <div className="email sub-container">
                        <p className="reg-name-div">Email Address </p><br />
                        <div className="formControl-reg">
                            {/* <i className="icons fa-regular fa-user" /> */}
                            <MdOutlineAttachEmail className='icons' />
                            <input
                                type="email"
                                className="input-inline"
                                id="email"
                                name="email"
                                placeholder='Enter your email id'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.email && touched.email ? (
                            <p className='formError'>{errors.email}</p>
                        ) : null}
                        {/* console.log("Email:",email) */}
                    </div>

                    <div className="contact sub-container">
                        <p className="reg-name-div">Phone Number </p><br />
                        <PhoneInput className='phone-input'
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            value={value}
                            onChange={(value) => (setValue(value), setFieldValue("phoneNumber", value))} />
                        {errors.phoneNumber && touched.phoneNumber ?
                            <p className='formError'>{errors.phoneNumber}</p>
                            : null}
                    </div>

                    <div className="address sub-container">
                        <div className="reg-name-div"> Location / Address </div><br />
                        <div className="formControl-reg">
                            <FaMapLocationDot className='icons' />
                            <input
                                type="text"
                                className="input-inline"
                                id="address"
                                name="address"
                                placeholder='Enter your address here'
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.address && touched.address ? (
                            <p className='formError'>{errors.address}</p>
                        ) : null}
                    </div>

                    <div className="dob sub-container">
                        <p className="reg-name-div"> Date of Birth </p><br />
                        <div className="formControl-reg">
                            <input
                                type="date"
                                className="input-inline"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={values.dateOfBirth}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.dateOfBirth && touched.dateOfBirth ? (
                            <p className='formError'>{errors.dateOfBirth}</p>
                        ) : null}
                    </div>

                    <div className="company sub-container">
                        <p className="reg-name-div"> Company Details </p><br />
                        <div className="formControl-reg">
                            <IoBriefcaseOutline className='icons' />
                            <input
                                type="text"
                                className="input-inline"
                                id="company"
                                name="company"
                                placeholder='Details here'
                                value={values.company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.company && touched.company ? (
                            <p className='formError'>{errors.company}</p>
                        ) : null}
                    </div>

                    <div className="passwd sub-container">
                        <p className="reg-name-div">Password</p><br />
                        <div className="formControl-reg">
                            <RiLockPasswordLine className='icons' />
                            <input
                                type="password"
                                className="input-inline"
                                id="password"
                                name="password"
                                placeholder='*****'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.password && touched.password ? (
                            <p className='formError'>{errors.password}</p>
                        ) : null}
                    </div>

                    <div className="passwd sub-container">
                        <p className="reg-name-div"> Confirm Password</p><br />
                        <div className="formControl-reg">
                            <RiLockPasswordLine className='icons' />
                            <input
                                type="password"
                                className="input-inline"
                                id="confirmpassword"
                                name="confirmpassword"
                                placeholder='*****'
                                value={values.confirmpassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.confirmpassword && touched.confirmpassword ? (
                            <p className='formError'>{errors.confirmpassword}</p>
                        ) : null}
                    </div>

                    <div style={{ display: "flex", marginTop: "15px", marginBottom: "15px", marginLeft: "5px" }}>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" className='footer' label="I agree to the Terms & Conditions, Privacy Policy" />
                        </Form.Group>
                    </div>

                    <button type="submit" className='btn-reg'> Register </button>
                </form>

                <p className='account-section'>Already have an account? <Link to="/" className='log'> Login </Link></p>
            </div>
        </div>
    );
}

export default CreateAccount;
