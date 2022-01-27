import axios from 'axios'
import {MAIN_URL} from './Url'
let token=localStorage.getItem('_token');

export function getPost(){
    return axios.get(`${MAIN_URL}posts/products`,{
        headers:{"Authorization":`Bearer ${token}`}
    })
}
export function signup(data){
    return axios.post(`${MAIN_URL}posts/signup`,data)
}

export function login(data){
    return axios.post(`${MAIN_URL}posts/login`,data)
}

// export function profile(){
//     return axios.get(`${MAIN_URL}posts/profile`)
// }