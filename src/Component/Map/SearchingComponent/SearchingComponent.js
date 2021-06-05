import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import './styles/styles.css'
import SearchResultsHolder from './SearchResultsHolder'
import data from './music_json.json'

export default function SearchingComponent(props) {
    
    const [searchResultsHolderDisplay,setSearchResultsHolderDisplay] = useState('none')
    const [Data,setData] = useState()
    const [MatchedValues,setMatchedValues]=useState([])
    const display = useSelector(state=>state.SearchComponentVisibilityReducer.isComponentVisible)


    useEffect(()=>{
        setData(data)
    },[])
    
    useEffect(()=>{

    },[display])

    const handleChange=(e)=> {
        e.target.value!==''?setSearchResultsHolderDisplay('flex'):setSearchResultsHolderDisplay('none')        
        setMatches(e.target.value)
    }
    
    const setMatches=(searchValue)=>{
        if(searchValue!==''){
        // filter according to regex
        let list_of_matches = Data.filter(item=>{
            const reg = new RegExp(`^${searchValue}`,'i');
            return item.music_title.match(reg)
        })
        console.log(list_of_matches)
        setMatchedValues(list_of_matches)
    }
        else setMatchedValues([])
    }

    return (

        <div className='Search-Component' style={{display:display}}>
        <div className='Search-Component-container'>
            <div className='Search-input-container'>
                <input className='searchInput' placeholder='search..' onChange={handleChange}/>
                <button>Enter</button>
            </div>  
         </div>
         {MatchedValues.length>0?<SearchResultsHolder display={searchResultsHolderDisplay} matches={MatchedValues}/>:<></>}
        </div>
        
    )
}
