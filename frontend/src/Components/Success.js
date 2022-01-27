import React from "react";
import { useNavigate } from "react-router";
import { Alert, Button, Container,Card } from "react-bootstrap";

import Nav2 from "./Nav2"

export default function Success() {
    const navigate = useNavigate();
    return (
        // <div style={{backgroundImage:"url('./images/cart-bg.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"100vh"}}>
        // <Nav2 />
        //     <br />
        //     <Card style={{ width: "60rem", justifyContent:"center" }} className="ml-5">
        //         {/* <Card.Header>Order has been placed successfully</Card.Header> */}
        //         <Card.Body>
        //             <Card.Title>Order has been placed successfully !!</Card.Title>
        //             <Alert variant="success">
        //                 <Alert.Heading>
        //                     You will receive notification by email with order details!!
        //                 </Alert.Heading>
        //             </Alert>
        //             <Card.Text>
        //                 <b>Thank you for Visiting !!! <span style={{color:"red"}}> Please Visit Again. </span></b>
        //             </Card.Text>
        //             <Button variant="secondary" onClick={() => navigate("/menu")}> Go and Order some more</Button>
        //         </Card.Body>
        //     </Card>
            <div style={{backgroundImage:"url('./images/cart-bg.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"100vh"}}>
            <Nav2 />
            {/* <Login /> */}
            <Container className=" w-75 pt-3 pb-3  mt-5 mb-3 bg-light text-dark border" style={{backgroundImage:"url('../')"}}>
                <h2 className="text-bold text-uppercase">Order has been placed successfully !!</h2><br/><hr/>
                <Alert variant="success">
                        <Alert.Heading>
                            You will receive notification by email with order details!!
                        </Alert.Heading>
                </Alert>
                <hr/>
                <p style={{fontWeight:"bold",fontSize:"large"}}>Thank you for Visiting !!! <span style={{color:"red"}}> Please Visit Again. </span></p>
                <Button variant="dark" href="/menu"> Go and Order some more</Button>
            </Container>
        </div>
        // </div>
    );
}