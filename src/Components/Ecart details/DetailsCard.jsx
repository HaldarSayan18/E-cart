import React, { useEffect, useState } from 'react'
import '../styling//DetailsCard.css';
import { Cardsdata } from './Ecart.jsx';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import Container from 'react-bootstrap/Container';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { ImBin } from "react-icons/im";
import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DATA, RM, RM_DATA } from "./Action";
import Header from '../Cart Details/Header.jsx';

const DetailsCard = () => {
    const [show, setShow] = useState([]);
    const dispatch = useDispatch();
    const loc = useLocation();
    const id = new URLSearchParams(loc.search).get("id");
    console.log("param id", id);
    const getData = useSelector((state) => state.cartReducer.carts);
    // console.log(getData);
    //const card = getData.find((ele) => ele.id === id);
    // if (!card) {
    //     return <h2>Item not found</h2>;
    // }
    const sendOnClick = (e) => {
        // console.log(e)
        dispatch(ADD_DATA(e))
    };
    const adding = (e) => {
        dispatch(ADD_DATA(e))
    };
    const deleting = (id) => {
        dispatch(RM_DATA(id))
    }
    const remove = (item) => {
        dispatch(RM(item))
    };
    useEffect(() => {
        if (id) {
            const filterCardData = Cardsdata.filter(data => data.id === Number(id))
            setShow(filterCardData)
        }
    }, [id])
    console.log("show", show);
    return (
        <>
            <Header />
            <h2><u> Details of Items </u></h2>
            <Container>
                {
                    show.map((ele, id) => {
                        return (
                            <Row className='row-main' key={id} style={{ marginTop: "50px" }}>
                                <Col>
                                    <img className='item-img' src={ele.imgdata} alt={ele.rname} />
                                </Col>
                                <Col>
                                    <p className='list'><b>Item Name: </b>{ele.rname}</p>
                                    <p className='list'><b>Dishes: </b>{ele.address}</p>
                                    <p className='list list-color'><b>Order Review: </b>{ele.somedata}</p>
                                    <p className='list list-rating list-color'><b>Rating: </b>{ele.rating} <Rating name="half-rating" defaultValue={ele.rating} precision={0.5} />
                                    </p>
                                    <p className='list list-color'><b>Price: </b><MdOutlineCurrencyRupee />{ele.price}</p>
                                    <p className='list'><b>Quantity: </b>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="secondary" className='list-button' onClick={ele.qnty <= 1 ? () => deleting(ele.id) : () => remove(ele)}>--</Button>
                                            <p className='list-button'>{ele.qnty}</p>
                                            <Button variant="secondary" className='list-button' onClick={() => { adding(ele) }}>+</Button>
                                        </ButtonGroup>
                                    </p>
                                    {/* <p className='list list-color'><b>Total: </b><MdOutlineCurrencyRupee />{Header.total}</p> */}
                                    <p className='list'><b style={{ textDecoration: "line-through" }}>Remove: </b> <ImBin style=
                                        {{
                                            color: "grey",
                                            height: "30px",
                                            width: "30px"
                                        }} />
                                    </p>
                                    <Button variant="warning" style={{ marginLeft: "40%" }} onClick={() => sendOnClick(ele)}> Add to cart </Button>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Container>
        </>
    )
}

export default DetailsCard
