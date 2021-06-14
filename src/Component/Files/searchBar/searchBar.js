import React,{ useState ,useEffect } from "react";
import './styles.css'

export default function SearchBar(props){
    let [matches,setMatches] = useState([]) 
    let [firstRender,setFirstRender] = useState(true) 

// this will handle the dynamic filtering.
const handleChange=async (e)=>{
    //fetch. filter the response with regex, set state with the title of the filtered elem. 
        let regx = new RegExp(`${e.target.value}`,'gi')
        /*
        data.filter(item=>{ 
            if(item.Title.match(regx)){
                matches.push(item.Title)
            }
        })
        */
        
    await fetch(`http://localhost:8000/Reports?title=${e.target.value}/`).then(res=>res.json()).then(data=>{setMatches(data)})            
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

