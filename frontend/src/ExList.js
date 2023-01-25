import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from './useFetch.js';
import useCookie from './useCookie';
import Navbar from './Navbar.js';

const ExList = ({uri,cat}) => {
   const history=useHistory();

   var [list,setList]=useState(null);
    useEffect(()=>{
        fetch(uri,{
            mode:'cors',
            credentials:'include',
            method:'GET',
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setList(data);
        })
    },[list])

    const handleDelete=(e)=>{
        console.log(`we are in handleClick with id=${e.target.value}`);
        const id=e.target.value;
        fetch(`http://localhost:8000/delete/${id}`,{
            method:'DELETE',
            mode:'cors',
            credentials:'include'
        })
        .then((res)=>console.log('we deleted the entry'))
        .catch((error)=>console.log('we got an error while deleteing',error));
    }

    const handleModify=(e,item)=>{
  
       
        const id=e.target.value;
        //console.log(`the category is ${cat}`,cat);
        history.push({
            pathname:'/ModifyExercise',
            state:{id,item,cat}
        });
     
    }
    return (
        <div className="list-exercises">
            <h2>Saved {cat} Exercises </h2>
            {/*error && <div>Got an error...{error}</div>*/}
            {/*isLoading && <div>Content Loading...</div>*/}
            {list && <div className="main-list">

                        {
                            list.map((item)=>(

                                <div className="ex-details" key={item._id}>
                                        <h3>{item.name}</h3>
                                        <p>Set Count: {item.set}</p>
                                        <p>Highest Weight: {item.MaxWeight}</p>
                                        <p>Exercise Notes: {item.notes}</p>
                                        <button className="delete-button" onClick={(e)=>{handleDelete(e)}} value={item._id}>Delete</button>
                                        <button className="modify-button" onClick={(e)=>{handleModify(e,item,cat)}}value={item._id}>Modify</button>
                                    </div>
                            ))
                            
                        }    
            </div>  
            }
        </div>
     );
}
 
export default ExList;