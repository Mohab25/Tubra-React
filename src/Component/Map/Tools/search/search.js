import React,{useState} from 'react'
import './styles/styles.css'
import SearchingComponent from './SearchingComponent/SearchingComponent'

export default function Search() {
    
    const [SearchBarDisplay,toggleSearchBar] = useState('none')
    const [SearchBoxColor,toggleSearchBoxColor] = useState('orange')
    const [compensationValue,toggleCompensationValue] = useState(0) // this because other elements affects the position of the icon when they are shown on the screen.
    
    const handleClick=(e)=>{
        SearchBoxColor =='orange'? toggleSearchBoxColor('orangered'):toggleSearchBoxColor('orange')
        SearchBarDisplay==='none'?toggleSearchBar('block'):toggleSearchBar('none')
        compensationValue===0?toggleCompensationValue(-12):toggleCompensationValue(0)
    }
    
    return (
        <div className='search' onClick={handleClick} style={{backgroundColor:SearchBoxColor}}>
            <div className='search-container'>
                <div className='search-box'>
                    <div style={{marginTop:compensationValue}}>
                        <i className='fa fa-search'>
                        </i>
                    </div>
                </div>
                <SearchingComponent SearchBarDisplay={SearchBarDisplay}/>
            </div>
        </div>
    )
}
