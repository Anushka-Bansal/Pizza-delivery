import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
// import HomeNavbar from "./HomeNavbar";
import Nav2 from './Nav2';
import axios from "axios";

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    let items =[];
    let total = [0];
    // const [quantity, setQuantity] = useState("");
    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
    }, []);
    console.log(cart);

    const onAdd = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const onRemove = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist.quantity === 1) {
            // setCart(cart.filter((item) => item._id !== product._id));
        } else {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        }
    };

    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        console.log(lstore);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
    };

    const checkout = () => {
        console.log(cart);
        cart.map((value) => {
            items.push(`${value.name} (${value.quantity})`);
        });

        let localdata=JSON.parse(localStorage.getItem("user"))
        let cardno = document.getElementById("card").value;
        let checkout = {
            
            name: localdata.name,
            items:items,
            cardnumber: cardno,
            total: total.reduce((result, number) => result + number),
        };
        console.log(checkout);
        axios
            .post("http://localhost:9988/api/posts/carddetails", checkout)
            .then((res) => {
                if (res.data.flag === 1) {
                    localStorage.removeItem("mycart");
                    navigate("/success");
                }
            });
    };

    return (
        <div style={{backgroundImage:"url('./images/cart-img.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"160vh"}}>
            <Nav2 />
            <br />
            <Container className="text-light">
                <h2>My Orders</h2>
                <Table bordered hover variant="dark" size="sm" className="mt-3 text-light" >
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart ? cart.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td><b>{index + 1}</b></td>
                                    <td><b><img src={value.image} width="100px" height="80px"/></b></td>
                                    <td><b>{value.name}</b></td>
                                    <td><b>{value.price}/-</b></td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button variant="dark" onClick={() =>onRemove(value)}>-</Button>
                                            </Col>
                                            <Col>
                                                <Form.Control type="number" placeholder="Enter quantity" min="1" max="20" value={value.quantity}/>
                                            </Col>
                                            <Col>
                                                <Button variant="dark" onClick={() =>onAdd(value)}>+</Button>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td><b>
                                        {value.quantity * value.price}</b>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() =>onDelete(index)}>Delete</Button>
                                    </td>
                                    {console.log(
                                        total.push(
                                            value.price * value.quantity
                                        )
                                    )}
                                </tr>
                            );
                        })
                    : ""}
            </tbody>
                </Table>
                <h4 className="text-left">
                    Total Amount:{" "}
                    {total.reduce((result, number) => result + number)}/-
                </h4>
                <br />
            </Container>
            <br />
            <Container className="text-light">
                <h3><b>Credit Card Number</b></h3>
                <Form.Control
                    type="number"
                    placeholder="Enter credit card details"
                    id="card"
                />
                <br />
                <Button variant="success" onClick={() => checkout()}>
                    Checkout
                </Button>
            </Container>
        </div>
    );
}
