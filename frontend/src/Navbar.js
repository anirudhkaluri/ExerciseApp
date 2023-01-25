import {Link,useHistory} from 'react-router-dom';
const Navbar = () => {
    const history=useHistory();
    const handleLogout=(e)=>{
        fetch('http://localhost:8000/logout',{
            method:'GET',
            mode:'cors',
            credentials:'include',
        })
        .then((response)=>{
            console.log("cookies cleared");
            history.push('/login');
        })
        .catch((err)=>{
            console.log("there is an errror while logging out:",err);
        });
    }
    return ( 
        <nav className="navbar">
            <h1>THE EXERCISE APP</h1>
            <div className="links">
                <Link to="/catlist" style={{
                    backgroundColor:'#f1356d',
                    color:'white',
                    borderRadius:'8px'
                }}>Home Page</Link>
                <button onClick={handleLogout} style={{
                    backgroundColor:'#f1356d',
                    color:'white',
                    borderRadius:'8px'
                }}>Logout</button>
                {/*Link will prevent request to server. It will look at url. It will match against the routes.It will
                inject whatever server we need. */}
            </div>
        </nav>
     );
}
 
export default Navbar;