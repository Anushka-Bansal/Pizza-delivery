import React, { useEffect,useState } from 'react'
import Nav2 from './Nav2'
import { getPost } from '../Config/Myservice'
import {Card,Button,Row} from 'react-bootstrap'
import jwt_decode from 'jwt-decode';

export default function Menu() {
    const [menu,setMenu]=useState([]);
    const[oid,setOid]=useState('');
    // const[count,setCount]=useState(0);
    useEffect(()=>{
        // getPost().then((res)=>{
        //     console.log(res.data);
        //     setMenu(res.data);    
        // });
        if(localStorage.getItem('_token')!=undefined){
            let token=localStorage.getItem('_token')
            let decode=  jwt_decode(token);
            console.log(decode)  
            setOid(decode.oid)
            getPost()
        .then(res=>{
            console.log(res.data);
            setMenu(res.data);
        })
         }
    },[])

    const addtoCart = (obj) => {
        console.log(obj.name);
        let item = {
            name: obj.name,
            image:obj.image,
            price: obj.price,
            _id: obj._id,
            quantity: obj.quantity,
        };
        if (localStorage.getItem("mycart") !== null) {
            let arr = JSON.parse(localStorage.getItem("mycart"));
            let idArrays = [];
            arr.forEach((data) => {
                idArrays.push(data._id);
            });

            if (idArrays.includes(obj._id)) {
                // arr.forEach;
                alert("Pizza Already Added");
                // setItemadded(true);
            } else {
                arr.push(item);
                localStorage.setItem("mycart", JSON.stringify(arr));
                alert("Pizza Added to Cart");
            }
        } else {
            let arr = [];
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            alert("Product Added to Cart");
        }
    };
    // console.log(menu)
    return (
        <div>
            <div style={{backgroundImage:"url('./images/pizza-background.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"250vh"}}>
            <Nav2 />
            <h2 className="text-light">MENU ITEMS </h2>
                <Row style={{ justifyContent: "center" }}>
                    {menu.map((value,index) =>{
                        return(
                        <Card style={{ width: "20rem", margin: "1rem" }} className="container" key={index}>
                            {/* <Card.Img variant="top" src={props.image} height="250px" className='m-2' /> */}
                            <Card.Img src={value.image} height="200px" className='m-2 '/>
                            <Card.Body>
                                <Card.Title className="text-danger">{value.name}</Card.Title>
                                <Card.Text><b>Price:{value.price}/- </b>&nbsp; &nbsp;
                                <Button variant="dark" onClick={()=>addtoCart(value)}>Add to cart</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card> )}
                    )}
                </Row>
                </div>
        </div>
    )
}
