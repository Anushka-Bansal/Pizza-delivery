import React, { useEffect, useState } from "react";
// import { getOrderdetails } from "../config/Myservice";
import { Container, Table } from "react-bootstrap";
// import HomeNavbar from "./HomeNavbar";
import Nav2 from "./Nav2";
import axios from "axios"

export default function Order() {
    const [order1, setOrder1] = useState([]);
    // const [pizza, setPizza] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9988/api/posts/orderdetails")
        .then((res) => {
            let udata= JSON.parse(localStorage.getItem("user"));
            console.log(udata);
            console.log(res.data);
            const matchprof = res.data.filter(data => {
                if(data.name === udata.name) {
                 return data;
                }
                })
            setOrder1(matchprof);
            // setPizza(res.data.order);
        });
    }, []);
    console.log(order1.cardnumber);
    return (
        <div style={{backgroundImage:"url('./images/cart-img.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"100vh"}}>
            <Nav2 />
            <br />
            <Container>
                <h1 className="text-light">Order History</h1>
                <Table bordered hover variant="warning" className="mt-5">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Pizza Names</th>
                            <th>Card Number</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order1.map((value, index) => {
                            return (
                                <tr>
                                    <td>{value.name}</td>
                                    <td>{`${value.items}\n`}</td>
                                    <td>{value.cardnumber}</td>
                                    <td>{value.total}/-</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
