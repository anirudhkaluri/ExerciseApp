
import {useState} from 'react';
const useCookie=  ()=>{
    console.log("we called the useCookie function");
    const [cook,setCook]=useState(false);
    fetch('http://localhost:8000/checkCookie',{
        method:'GET',
        credentials:'include',
        mode:'cors'
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log("data.cookState is",data.cookState);
        setCook(data.cookState);
    })
    .catch((error)=>{
        console.log("we got an error while checking if a cookie is set or not");
    })
    return {cook};
}
export default useCookie;