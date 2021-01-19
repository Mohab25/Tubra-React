import React,{useState} from 'react'
import './styles/styles.css'
import SearchingComponent from './SearchingComponent/SearchingComponent'

export default function Search() {
    
    const [SearchBarDisplay,toggleSearchBar] = useState('none')
    const [SearchBoxColor,toggleSearchBoxColor] = useState('orange')
    
    const handleClick=(e)=>{
        SearchBoxColor =='orange'? toggleSearchBoxColor('orangered'):toggleSearchBoxColor('orange')
        SearchBarDisplay=='none'?toggleSearchBar('block'):toggleSearchBar('none')
    }
    
    return (
        <div className='search' style={{backgroundColor:SearchBoxColor}}>
            <div className='search-container'>
                <div className='search-box' onClick={handleClick}>
                    <div>
                        <i className='fa fa-search'>
                        </i>
                    </div>
                </div>
            </div>
            <SearchingComponent SearchBarDisplay={SearchBarDisplay}/>
        </div>
    )
}
