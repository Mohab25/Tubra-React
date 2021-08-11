import React,{ useState ,useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import searchbarChange from '../../../Actions/FilesActions/searchbarActions'
import './styles.css'

export default function SearchBar(props){
    let [matches,setMatches] = useState([])
    let [tempMatches,setTempMatches] = useState([])
    let [firstRender,setFirstRender] = useState(true) 

    // this to handle a bug when switch back from the detail view
    let lettersDispatch = useDispatch()
    let letters = useSelector(state=>state.SearchbarReducer.searchLetters) 
    let temps = useSelector(state=>state.SearchbarReducer.temp) 
    let getBack = useSelector(state=>state.AdjustNavReducer.switchToFilesView)
    let inputRef = useRef()

// this will handle the dynamic filtering.
const handleChange=async (e)=>{
    let v = e.target.value
    
    if(v.length<=1){await fetch(`http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/Reports?title=${v}/`).then(res=>res.json()).then(data=>{setMatches(data);setTempMatches(data)})}            
    
    else{
        console.log('ag:',v)
        console.log('t:',temps)
        let arr=[]
        temps.filter(item=>{
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
        if(matches.length!=0){console.log('changed:',matches);props.filter(matches);setFirstRender(false);lettersDispatch(searchbarChange(inputRef.current.value,matches))} // this to handle a bug when switch back from the detail view

        else{
            if(firstRender==false) props.filter([]);
        }
},[matches])


useEffect(()=>{
    setFirstRender(false);
    if(inputRef!=undefined){

        if(letters.length!=0){inputRef.current.value = letters;}//setMatches(temps)
        else inputRef.current.value = letters
     }
},[])

// this will handle the submit of the search input
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return(
        <div className='files-searchBar'>
            <form onSubmit={handleSubmit}>
            <input name='search' onChange={handleChange} placeholder='search..' ref={inputRef}/>
            </form>
        </div>
    )


} 

