import React from 'react'
import {Navbar,Button} from 'react-bootstrap'

export default function Navs() {
    return (
        <div>
            <Navbar  variant="dark">
                <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="./images/hd-logo.jpg"
                    width="100"
                    height="90"
                    className="d-inline-block align-top ml-4"
                />
                </Navbar.Brand>
                <div className="ml-auto">
                <Button variant="outline-secondary" className="mr-4 ml-4 "> <a href="/" style={{ textDecoration: 'none', color: 'white' }}>Home</a></Button>
                <Button variant="outline-warning" className="mr-5 ml-4"><a href="/signup" style={{ textDecoration: 'none', color: 'white' }}>Sign Up</a></Button>
                <Button variant="outline-success"><a href="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</a></Button>
                </div>
            </Navbar>
        </div>
    )
}
