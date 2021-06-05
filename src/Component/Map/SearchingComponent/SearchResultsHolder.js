import React,{useState,useEffect} from 'react'
import Card from "./SearchResultsHolderCard";
import './styles/search-cards-holder.css'

export default function SearchResultsHolder(props) {

    useEffect(()=>{

    },[props.matches])

    return (
        <div className='Cards-Holder' style={{display:props.display}}>
            <div className='Cards-Holder-container'>
                <div className='Card-holder'>
                    <div className='matched-card-item'>
                        <Card matches={props.matches}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
