import React,{useState} from 'react'
import {Container,Row,Button,Form,Col} from 'react-bootstrap';
import Navs from './Navs';
// import history from './history';
import { useNavigate } from "react-router";
import {signup} from '../Config/Myservice'

const regForName = /^[a-zA-Z]{2,100}$/;
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/);
const regforContact=RegExp(/^[0-9]{10}$/);
export default function Signup() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    errors: {
      name: "",
      email: "",
      contact:"",
      password: "",
      cpassword: "",
    },
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    contact:"",
    password: "",
  });
  
  const onChangeUser = (event) => {
    const { name, value } = event.target;
    console.log(event)
    let errors = state.errors;
    switch (name) {
      case "name":
        errors.name = regForName.test(value)
          ? ""
          : "Name should contain only letters and minimum length should be 2 characters";
        break;
        
      case "email":
        errors.email = regForEmail.test(value) ? "" : "Enter Valid Email";
        break;

      case "contact":
        errors.contact=regforContact.test(value) ?"" : "Enter valid contact Number";
        break;

      case "password":
        errors.password = regForPassword.test(value)
          ? ""
          : "Password must be between 8-25 characters and should contain atleast one lowercase letter, one uppercase letter amd one special character";
        break;

      case "cpassword":
        errors.cpassword =
          document.getElementById("password").value === value
            ? ""
            : "Password and confirm password should be same";
        break;
      default:
        alert("Fill proper details");
    }
    setState({ errors, [name]: value });
    setData({ ...data, [name]: value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    signup(data).then(res=>{
      if(res.data.err===0){
        // localStorage.setItem("token",res.data.token);
        localStorage.setItem("user", JSON.stringify(data));
        // history.push('/login');
        navigate('/login');
        console.log(res.data)
      }
      if(res.data.err===1){
        console.log(res.data)
      }
    })
    if (validate(state.errors)) {
      console.log("hello");
      const formData = {
        name: data.name,
        email: data.email,
        contact: data.contact,
        password: data.password,
      };
      console.log(formData);
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
    return (
        <>
            <div style={{backgroundImage:"url('./images/regi-back.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"99vw",height:"112vh"}}>
            <Navs />
            <Container className=" w-75 pt-3 pb-3 text-secondary">
                <h2 className="pt-1 pb-3 text-center text-warning">REGISTRATION FORM</h2>
                
                <Row>
                    <Col md={5}>
                        <Form method="post" className="pt-3" onSubmit={formSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Name:</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Name"  name="name" id="name" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.name.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.name}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 " >
                                <Form.Label><b>Email:</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.email.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.email}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 " >
                                <Form.Label><b>Contact:</b></Form.Label>
                                <Form.Control type="string" placeholder="Enter Contact Number" name="contact" id="contact" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.contact.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.contact}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Password:</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={onChangeUser} required />
                                <Form.Text>
                                    {state.errors.password.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.password}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Confirm Password:</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter ConfirmPassword" name="cpassword" id="cpassword" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.cpassword.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.cpassword}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="warning" type="submit" ><b>Sign Up</b></Button>
                         {/* <Button variant="warning" type="submit" href="/login" className="ml-3"><b>Login</b></Button> */}
                        </Form>
                    </Col>
                    <Col md={6}>
                        <img src="./images/pizzz.jpg" className="w-75 pl-4 mt-5" alt="signup"/>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
