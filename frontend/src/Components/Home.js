import React from 'react'
import { Container, Button} from 'react-bootstrap'
// import Login from './Login'
import Navs from './Navs'


export default function Home() {
    return (
        <div style={{backgroundImage:"url('./images/profile-img.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"100vh"}}>
            <Navs />
            {/* <Login /> */}
            <Container className=" w-75 pt-3 pb-3  mt-5 mb-3 bg-light text-dark border" style={{backgroundImage:"url('../')"}}>
                <h2 className="display-4 text-bold text-uppercase">Pizza Delivery</h2><br/>
                <p style={{fontSize:"x-large"}}>Welcome to pizza delivery service. This is the place where you may choose the most delicious pizza you like from wide variety of options!</p>
                <hr/>
                <p style={{fontWeight:"bold",fontSize:"large"}}>We're performing delivery free of charge in case if your order is higher than 500rs</p>
                <Button variant="dark" href="/login">Sign In and Order</Button>
            </Container>
        </div>
    )
}
