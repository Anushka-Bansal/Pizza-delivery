import React,{useEffect,useState} from 'react'
import {Navbar,Nav,Button, Container} from 'react-bootstrap'

export default function Nav2() {
    const [len, setLen] = useState(0);
    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        if (cartItems) {
            setLen(cartItems.length);
        }
    }, []);
    const logout=()=>{
        localStorage.clear();
    }
    return (
        <div>
            <Navbar variant="dark">
                <Container>
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                <img
                alt=""
                src="./images/same-logo.png"
                width="120"
                height="100"
                className="d-inline-block align-top ml-4"
                />
                <Nav className="me-auto text-light">
                    <Nav.Link href="/menu">Menu</Nav.Link>
                    <Nav.Link href="/cart">Cart <span>{len}</span></Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/order">Orders</Nav.Link>
                    <Button variant="outline-secondary"><a href="/" style={{ textDecoration: 'none', color: 'white' }} onClick={logout}>Logout</a></Button>
                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
