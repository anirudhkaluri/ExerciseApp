import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import ExList from './ExList';
import { useHistory } from 'react-router-dom';
const SpecificCat = () => {
    const {category}=useParams();
    var history=useHistory();
    var st=new Set(["Chest","Legs","Back","Shoulders","Core"]);
    if(!st.has(category))
        history.push('/NotFound');
    var url=`http://localhost:8000/exlist/${category}`;
    const[name,setName]=useState("");
    const[sets,setSets]=useState(0);
    const[weight,setWeight]=useState(0);
    const[notes,setNotes]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        const ex={name,sets,weight,notes};
        fetch(url,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(ex),
            mode:'cors',
            credentials:'include'
        })
        .then((res)=>{
            console.log('data posted successfully');
            //setbx(bx^true);
        })
        .catch((err)=>{
            console.log('got an error');
        });
    }
  

    return ( 
        <div className="type-specific">

            <div className="add-exercise">
                <form onSubmit={handleSubmit}>
                    <br></br>
                <h2>Add a {category} exercise</h2>
                    <label>Exercise Name:</label>
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                      <label>Number of Sets:</label>
                    <input
                        type="number"
                        required
                        value={sets}
                        onChange={(e)=>setSets(e.target.value)}
                    />
                    <label>Highest Weight:</label>
                    <input
                        type="number"
                        required
                        value={weight}
                        onChange={(e)=>setWeight(e.target.value)}
                    />
                    <label>Exercise Notes:</label>
                    <textarea
                        required
                        value={notes}
                        onChange={(e)=>setNotes(e.target.value)}
                    ></textarea>
                    <br></br>
                     <button>Submit</button>
                </form>   
            </div>

           
            {<ExList uri={url} cat={category}/>}    
        </div>
     );


}
 
export default SpecificCat;