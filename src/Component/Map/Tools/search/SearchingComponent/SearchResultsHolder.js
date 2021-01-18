import React,{useState,useEffect} from 'react'
import './styles/styles2.css'

export default function SearchResultsHolder(props) {
    console.log(props.matches)
    const [matchedItems,setMatchedItems] = useState([])

    useEffect(()=>{
        const matchedItems = props.matches.map((item,index)=>{
            return(
                <div key={index}>
                    <p>{item.music_title}</p>
                </div>
            )
        })
        setMatchedItems(matchedItems)
    },[props.matches])

    return (
        <div className='Cards-Holder' style={{display:props.display}}>
            <div className='Cards-Holder-container'>
                <div className='Card-holder'>
                    <div className='matched-card-item'>
                        {matchedItems}
                    </div>
                </div>
            </div>
        </div>
    )
}
