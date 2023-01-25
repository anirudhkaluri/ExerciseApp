import { useEffect, useState } from "react";
const useFetch=(uri)=>{
    const[data,setData]=useState(null); 
    const[isLoading,setisLoading]=useState(true); 
    const[error,setError]=useState(null); 
    useEffect(()=>{ 
        const abortCont=new AbortController(); 
        fetch(uri,{
            signal:abortCont.signal,
            method:'GET',
            credentials:'include',
            mode:'cors'
        }) 
        .then((res)=> {
            if(!res.ok) 
                throw Error('Couldnt fetch data from the resource'); 
            return res.json();
        })
        .then((data)=>{
            setError(null); 
            setData(data); 
            setisLoading(false); 
        })
        .catch((err)=>{
            if(err.name==='AbortError') 
                console.log('fetch aborted');
            else{
                setisLoading(false); 
                setError(err.message); 
            }         
        }); 
        return ()=>abortCont.abort(); 
    },[uri]); 
    return {data,isLoading,error};
}

export default useFetch;
