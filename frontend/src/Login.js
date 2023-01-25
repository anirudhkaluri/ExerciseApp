import {GoogleLogin} from "@react-oauth/google";
import { useHistory } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'js-cookie';
const Login = () => {
    const history=useHistory();
    const handleResponse=(credentialresponse)=> {
        fetch('http://localhost:8000/login',{
            method:'POST',
            credentials:'include',
            mode:'cors',
            headers: {"Content-type": "application/json"},
            body:JSON.stringify(credentialresponse)
        })
        .then(response=>{
            history.push('/catlist');
        })
        .catch(err=>console.log('eror',err));
    }
    const handleError=()=>{
        console.log("Error Logging in");
    }

    return ( 
        <div className="login-page">
            <h1>Login Form</h1>
            <GoogleOAuthProvider clientId="1089547108535-tugs5c1gj470v5h94i6c61jmma30gnan.apps.googleusercontent.com">
                <GoogleLogin onSuccess={handleResponse} onError={handleError}
                />
            </GoogleOAuthProvider>;
           
            
        </div>
     );
}
 
export default Login;