import React,{useState,useEffect} from 'react'
import './styles/search-card.css'

export default function SearchResultsHolder(props) {
    const [matchedItems,setMatchedItems] = useState([])

    useEffect(()=>{
        const matchedItems = props.matches.map((item,index)=>{
            return(
                <div key={index} className='search-card'>
                    <div className='search-card-icon'></div>
                    <p className='search-card-p'>{item.music_title}</p>
                </div>
            )
        })
        setMatchedItems(matchedItems)
    },[props.matches])

    return (
        <>
            {matchedItems}        
        </>
    )
}
