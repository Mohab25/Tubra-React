import React,{useState,useEffect} from 'react'
import Card from "./SearchResultsHolderCard";
import './styles/search-cards-holder.css'

export default function SearchResultsHolder(props) {

    return (
        <div data-testid='searchCardsHolder' className='Search-Cards-Holder' style={{display:props.display}}>
            <div className='Search-Cards-Holder-container'>
                <div className='Search-Card-holder'>
                    <div className='matched-card-item'>
                        <Card matches={props.matches} BufferSearchDisplay={props.BufferSearchDisplay}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
