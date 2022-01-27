import React,{useState} from 'react'
import {Container,Row,Button,Form,Col} from 'react-bootstrap';
import Navs from './Navs';
// import history from './history';
import {login} from '../Config/Myservice'
import { useNavigate } from 'react-router';

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
      });
      const handler=(event)=>{
        const {name,value} = event.target;
        setData({...data,[name]:value})
    }
    const navigate=useNavigate();
    const loginUser=(event)=>{
        event.preventDefault();
        console.log(data)
        login(data).then(res=>{
            if(res.data.err===0){
                localStorage.setItem("_token",res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                // history.push('/menu');
                navigate('/menu');
                console.log(res.data)
            }
            if(res.data.err===1){
                console.log(res.data)
            }
        })
    }
    return (
        <>
            
            <div style={{backgroundImage:"url('./images/login-back.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"100vh"}}>
            <Navs />
            <Container className=" w-75 pt-3 pb-3  mt-3 mb-3  text-light" >
                <h2 className="pt-2 pb-3 text-center text-success">LOGIN FORM</h2>
                
                <Row>
                    <Col md={6}>
                        <img src="./images/pizzz.jpg" className="w-75 pl-4" alt="login"/>
                    </Col>
                    <Col md={5}>
                        <Form className="pt-4 " onSubmit={loginUser}>
                            <Form.Group className="mb-3 " >
                                <Form.Label><b>Email:</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={handler} required/>
                                {/* {errors.email.length>0 && 
                                <p style={{color:'red',fontWeight:"bold"}}>{errors.email}</p>} */}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Pasword:</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={handler} required />
                                {/* {errors.password.length>0 && 
                                <p style={{color:'red',fontWeight:"bold"}}>{errors.password}</p>} */}
                            </Form.Group>
                            <Button variant="success" type="submit" className="mt-3" ><b>Login</b></Button>
                            {/* <Button variant="warning" type="submit" href="/signup" className="ml-3 mt-3"><b> SignUp</b></Button> */}
                        </Form>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
