import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import new_user from "../images/new_user.png";
import { Link, useNavigate } from 'react-router-dom';
import "../styling/Profile.css";
import { FaArrowRight } from "react-icons/fa6";
import { TbSettingsCog } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';

const EditProfile = () => {
    const [image, setImage] = useState(new_user);
    const onFile = (event) => {
        console.log("image show: ", event.target.files[0])
        setImage(URL.createObjectURL(event.target.files[0]))
    };
    const navigate = useNavigate();

    return (
        <div className='profile-body'>
            <ToastContainer />
            <TbSettingsCog type='button' style={{ height: "30px", width: "50px", alignItems: "end", marginLeft: "90%" }} />
            <div className="profile-browseimg">
                <div className="profile-upld">
                    <label htmlFor="upload-button" className="profile-uploadBtn">
                        <img src={image} alt="dummy" width="300" height="300" />
                    </label>
                    <input
                        type="file"
                        accept='image/png, image/gif, image/jpeg, image/jpg, image/svg'
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={onFile}
                    />
                    <br />
                </div>
            </div>
            <div className='form-container'>
                <Button className='edit-btn' variant='warning'> Edit profile </Button>
                <Form>
                    <Form.Group className="mb-3 profile-email" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 profile-contact" controlId="formBasicPassword">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" placeholder="Contact number" />
                    </Form.Group>
                    <Form.Group className="mb-3 profile-dob" controlId="formBasicEmail">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control type="Date of Birth" placeholder="Enter Date of Birth" />
                        <Form.Text className="text-muted">
                            Only you can see.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 profile-address" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ textDecoration: "none", color: "white" }} onClick={() => {
                            setTimeout(() => {
                                navigate('/profile');
                            }, 1000) &&
                            toast.success("Changes saved.", { position: "top-center" })
                        }}> Apply Changes <FaArrowRight /> </Button>
                </Form>
            </div>

        </div>
    )
}

export default EditProfile
