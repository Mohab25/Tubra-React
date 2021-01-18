import React,{useState} from 'react'
import './styles/styles.css'
import SearchResultsHolder from './SearchResultsHolder'

export default function SearchingComponent() {
    
    const [searchResultsHolderDisplay,setSearchResultsHolderDisplay] = useState('none')


    const handleChange=(e)=> {
        console.log(e.target.value)
        e.target.value!==''?setSearchResultsHolderDisplay('block'):setSearchResultsHolderDisplay('none')
    }
    
    return (

        <div className='Search-Component'>
        <div className='Search-Component-container'>
            <div className='Search-input-container'>
                <input className='searchInput' placeholder='search..' onChange={handleChange}/>
                <button>Enter</button>
            </div>  
         </div>
         <SearchResultsHolder display={searchResultsHolderDisplay}/>
        </div>
        
    )
}
