import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Navbar from "./Navbar";
import useCookie from "./useCookie";
import { useEffect, useState } from "react";
const CatList = () => {

    return ( 
       
        <div className="dashboard-list">
           
            <Link to="/exlist/Chest">
                <h3>Chest</h3>
            </Link>
            <Link to="/exlist/Back">
                <h3>Back</h3>
            </Link>
            <Link to="/exlist/Shoulders">
                <h3>Shoulders</h3>
            </Link>
            <Link to="/exlist/Core">
                <h3>Core</h3>
            </Link>
            <Link to="/exlist/Legs">
                <h3>Legs</h3>
            </Link>
        </div>
     );
}
 
export default CatList;