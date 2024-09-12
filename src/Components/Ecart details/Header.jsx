import React, { useEffect, useReducer, useState } from 'react'
import "../Styles/Header.css";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GiShoppingCart } from "react-icons/gi";
import Badge from '@mui/material/Badge';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cardsdata } from './Ecart.jsx';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImBin } from "react-icons/im";
// import { RM_DATA } from '../Cart Details/Action.jsx';
import { PiUserSwitchFill } from "react-icons/pi";
import new_user from "../Images/new_user.png";
import { SiIfood } from "react-icons/si";
import { ImSpoonKnife } from "react-icons/im";

export function reducer(state, action) {
    switch (action.type) {
        case "search":
            // return action.payload!== ""?Cardsdata.filter((item) 
            return Cardsdata.filter((item) =>
                item.rname.toLowerCase().includes(action.payload.toLowerCase()));
        default:
            return state;
    }
}

function Header() {
    const [price, setPrice] = useState(0);
    // const history = useNavigate();
    const [image, setImage] = useState(new_user);
    const [isHovered, setIsHovered] = useState(false);
    const [search, setSearch] = useState('');
    const [state, dispatch] = useReducer(reducer, []);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState();
    const [anchorEl1, setAnchorEl1] = useState();
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const getData = useSelector((state) => state.cartReducer.carts);
    const [cartdata, setcartdata] = useState([]);
    useEffect(() => {
        if (getData) setcartdata(getData)
    }, [getData]);

    const handleClick = (event) => {
        console.log("click");
        setAnchorEl(event.currentTarget);
    };
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClick3 = (event) => {
        navigate("/profile");
    }
    const handleClick2 = (event) => {
        setTimeout(() => {
            navigate('/');
        }, 1000) &&
            toast.success("Logged out successfully!!", {
                position: "top-center"
            });
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    const handleSearch = (e) => {
        setSearch(e.target.value)
        dispatch({ type: "search", payload: e.target.value })
    };
    const onFile = (event) => {
        console.log("image show: ", event.target.files[0])
        setImage(URL.createObjectURL(event.target.files[0]))
    };

    // const handleRemove = (id) => {
    //     dispatch({ type: "remove_item", payload: id });
    // };
    const dlt = (id) => {
        const filterdata = cartdata.filter((cartitem) => cartitem.id !== Number(id))
        setcartdata(filterdata)
        toast.error("Item is removed from your cart!");
    };
    const total = () => {
        let price = 0;
        getData.map((ele, k) => {
            price = ele.price * ele.qnty + price
        });
        setPrice(price);
    };


    // const handleNotify = (
    //     toast.success("Item added to your cart !")
    // );
    const cardStyle = {
        width: '25rem',
        // height: '20rem',
        margin: "auto",
        marginBottom: "30px",
        transition: 'box-shadow 0.3s ease-in-out',
        boxShadow: isHovered ? '0px 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
    };

    return (
        <>
            <ToastContainer />
            <Navbar bg="success" data-bs-theme="">
                <Container>
                    <Nav className="me-auto">
                        <p className='glow-text'> <ImSpoonKnife className='glow-text'/>  ģ𝓞σⒹ 千ｏ𝕠𝐝 Ǥ𝕠𝔬Đ 𝕞𝐎𝔬𝒹  <SiIfood className='glow-text'/> </p>
                    </Nav>
                    <NavLink to="/home" className='header-home-link'> Home </NavLink>
                    <input type='search' className='header-search-link' placeholder='search your order' value={search} onChange={handleSearch} />
                    <Badge badgeContent={cartdata.length} color="secondary" style={{ marginTop: "5px", marginRight: "35px" }} id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <GiShoppingCart style={{ height: "50px", width: "50px", color: "yellow", cursor: "pointer" }} />
                    </Badge>
                    <button className='user-data' id="basic-button"
                        aria-controls={open1 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open1 ? 'true' : undefined}
                        onClick={handleClick1} style={{ background: "transparent", border: "2px solid yellow", borderRadius: "100%", outline: "none" }}>
                        <PiUserSwitchFill style={{ height: "35px", width: "25px" }} />
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl1}
                        open={open1}
                        onClose={handleClose1}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClick3}>Profile</MenuItem>
                        <MenuItem onClick={handleClick2}>Logout</MenuItem>
                    </Menu>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            cartdata.length ? (
                                <div className='cart-details' style={{ height: "auto", width: "auto" }}>
                                    {cartdata.map((ele, index) => (
                                        <Col key={index}>
                                            <Card style={cardStyle} onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}>
                                                <div style={{ display: "flex", flexDirection: "column", idth: '10rem', height: '10rem' }} onMouseDown={handleClose}>
                                                    <NavLink to={`/details?id=${ele.id}`}><Card.Img variant="top" src={ele.imgdata} style={{ width: '12rem', height: '10rem', margin: "1px", cursor: "pointer" }} /></NavLink>
                                                    <Card.Body style={{ marginLeft: "auto", marginTop: "-40%", alignItems: "center", textAlign: "center" }}>
                                                        <Card.Title>{ele.rname} </Card.Title>
                                                        <Card.Title><p><b>Quantity:</b>{ele.qnty}</p></Card.Title>
                                                        <Card.Text className='list'> Price:  <MdOutlineCurrencyRupee /><b>{ele.price} </b>
                                                            <ImBin style=
                                                                {{
                                                                    color: "red",
                                                                    height: "30px",
                                                                    width: "30px",
                                                                    cursor: "pointer"
                                                                }} onClick={() => dlt(ele.id)} />
                                                        </Card.Text>
                                                    </Card.Body>
                                                </div>

                                            </Card>
                                        </Col>
                                    ))}
                                </div>
                            ) : (
                                <div className='cart-details' style={{ height: "50%", width: "90%" }}>
                                    <h4 style={{ paddingLeft: "15px" }}>Your cart is empty now </h4>
                                    <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3lhOXFjazltczA2eDZyejNlOWhvOWllMmF5NWZweDdvamhtNmpzMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ymK7l3nEeJvluafmGi/giphy.webp' alt='empty_gif' height="120px" width="150px" style={{ margin: "auto", marginLeft: "40px", border: "none", backgroundColor: "transparent", cursor: "unset" }} />
                                </div>
                            )
                        }
                    </Menu>
                </Container>
            </Navbar >
            {
                state.map((ele, index) => (
                    <Col key={index}>
                        <Card style={{}} onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            <Card.Img variant="top" src={ele.imgdata} style={{ width: '24.1rem', height: '20rem', margin: "5px", cursor: "pointer", border: "none", borderRadius: "0px" }} />
                            <Card.Body >
                                <Card.Title>{ele.rname}</Card.Title>
                                <Card.Text>{ele.address} </Card.Text>
                                <Card.Text> Price:  <MdOutlineCurrencyRupee /><b>{ele.price} </b></Card.Text>
                                <Button variant="primary" href="/details"> Know more </Button>
                                <Button variant="warning" style={{ marginLeft: "40%" }} > Add to cart </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </>
    );
}

export default Header;