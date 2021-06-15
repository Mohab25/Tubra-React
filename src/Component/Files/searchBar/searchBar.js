import React,{ useState ,useEffect } from "react";
import './styles.css'

export default function SearchBar(props){
    let [matches,setMatches] = useState([])
    let [tempMatches,setTempMatches] = useState([])
    let [firstRender,setFirstRender] = useState(true) 

// this will handle the dynamic filtering.
const handleChange=async (e)=>{
    let v = e.target.value

    if(v.length<=1){await fetch(`http://localhost:8000/Reports?title=${v}/`).then(res=>res.json()).then(data=>{setMatches(data);setTempMatches(data)})}            
    
    else{
        let arr=[]
        tempMatches.filter(item=>{
            if(item.Name.toLowerCase().startsWith(v)){arr.push(item)}
        })
        setMatches(arr)
    }

    //fetch. filter the response with regex, set state with the title of the filtered elem. 
        //let regx = new RegExp(`${e.target.value}`,'gi')
        /*
        data.filter(item=>{ 
            if(item.Title.match(regx)){
                matches.push(item.Title)
            }
        })
        */
}

useEffect(()=>{
        // setting the cards according to the filter above. 
        if(matches.length!=0){console.log('changed:',matches);props.filter(matches);setFirstRender(false)}
        else{
            if(firstRender==false) props.filter([]);
        }
},[matches])

// this will handle the submit of the search input
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return(
        <div className='files-searchBar'>
            <form onSubmit={handleSubmit}>
            <input name='search' onChange={handleChange} placeholder='search..'/>
            </form>
        </div>
    )


} 

