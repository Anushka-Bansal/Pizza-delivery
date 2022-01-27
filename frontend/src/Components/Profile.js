import Nav2 from "./Nav2";
import { Card, Container } from "react-bootstrap";

let user = JSON.parse(localStorage.getItem("user"));

function Profile() {
    return (
        <>
            <div style={{backgroundImage:"url('./images/profile.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"100vh"}}>
        <Nav2 />
            <Container className=" w-75 pt-3 pb-3  mt-5 mb-3  text-light">
                {/* <h2 className="pt-2 pb-3 text-center text-success">Your Details</h2> */}
                <br />
                <h1 className="text-light">User Details</h1>
                <br />
                <Card  className="bg-dark" style={{ width: "50%", margin: "auto" }}>
                    <Card.Body>
                        <Card.Title>
                            Name : {user.name}
                        </Card.Title>
                        <Card.Text>Email : {user.email}</Card.Text>
                        <Card.Text>Contact No. : {user.contact}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            </div>
        </>
    );
}

export default Profile;