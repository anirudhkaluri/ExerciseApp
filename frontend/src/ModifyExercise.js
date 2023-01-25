import { useLocation,useHistory } from "react-router-dom";
import { useState } from "react";
const ModifyExercise = () => {
    const location=useLocation();
    const history=useHistory();
    const {id,item,cat}=location.state;
   // console.log('we got the request from:',cat);
   // console.log(`the id of the item to be modified is ${id}`);
   // console.log(`the name of the item to be modified is ${item.name}`);
    const[name,setName]=useState(item.name);
    const[sets,setSets]=useState(item.set);
    const[weight,setWeight]=useState(item.MaxWeight);
    const[notes,setNotes]=useState(item.notes);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const ex={id,name,sets,weight,notes};
        fetch('http://localhost:8000/modifyExercise',{
            method:'PUT',
            headers:{'Content-type':'application/json'},
            mode:'cors',
            credentials:'include',
            body:JSON.stringify(ex)
        })
        .then((res)=>{
            console.log('data posted sucessfully.The response is:',res);
            //history.push();
            history.push(`/exlist/${cat}`);
        })
        .catch((err)=>console.log('there is an error'));
    }
    return ( 

        <div className="modify-form">
            <form onSubmit={handleSubmit}>
                    <br></br>
                    <h2>Modify Exercise</h2>
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
                    <label>Enter some notes</label>
                    <textarea
                        required
                        value={notes}
                        onChange={(e)=>setNotes(e.target.value)}
                    ></textarea>
                    <br></br>
                     <button>Submit</button>
            </form>
        </div>
     );
}
 
export default ModifyExercise;