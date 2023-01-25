
//import './App.css';
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Login from './Login';
import CatList from './CatList';
import SpecificCat from './SpecificCat';
import ModifyExercise from './ModifyExercise';
import Navbar from './Navbar';
import useCookie from './useCookie';
import { useState,useEffect } from 'react';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';

function App() {
  var [cook,setCook]=useState(false);
  var location=useLocation();
  var history=useHistory();
useEffect(()=>{

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
    });
},[location]);



  return (
  
    <div className="app">
        {cook && <Navbar/>}
        <Switch>
          <Route exact path={["/login","/"]}>   
            {!cook && <Login/>}
            {cook && <div>Already Logged In. Go to Home Page</div> }
          </Route>
          <Route exact path="/catlist">           
            {cook && <CatList/>}
            {!cook && <div> <Link to="/login">Please Login</Link> </div>}
          </Route>
          <Route exact path="/exlist/:category">
            {cook && <SpecificCat/>}
            {!cook && <div> <Link to="/login">Please Login</Link> </div>}
          </Route>
          <Route exact path="/ModifyExercise">
            {cook && <ModifyExercise/>}
            {!cook && <div> <Link to="/login">Please Login</Link> </div>}
          </Route>
          <Route path="*">
            {cook && <NotFound/>}
            {!cook && <div> <Link to="/login">Please Login</Link> </div>}
          </Route>
        </Switch>
    </div>
    
  );
}

export default App;
