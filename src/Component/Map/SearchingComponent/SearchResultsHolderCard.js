import React,{useState,useEffect} from 'react'
import './styles/search-card.css'

export default function SearchResultsHolder(props) {
    const [matchedItems,setMatchedItems] = useState([])

    useEffect(()=>{
        if(props.BufferSearchDisplay=='none'){
        const matchedItems = props.matches.map((item,index)=>{
            return(
                <div key={index} className='search-card'>
                    <div className='search-card-icon'>{item.music_title[0]}{item.music_title[1]}</div>
                    <p data-testid='card-paragraph-off' className='search-card-p'>{item.music_title}</p>
                </div>
            )
        })
        setMatchedItems(matchedItems)
        }

        else if(props.BufferSearchDisplay=='flex'){
            //let uniq_arr = [...new Set(props.matches)];
            let names = []; let uni=[]
            props.matches.map((item,index)=>{
            if(item!=null&&item.Feature_Name!=null){
                if(!names.includes(item.Feature_Name)){
                    names.push(item.Feature_Name)
                    uni.push(item)
                }
            }
            })
            console.log(uni)
            const matchedItems = uni.map((item,index)=>{
                let first_initial = item.Feature_Name==null?'':item.Feature_Name[0]
                let second_initial = item.Feature_Name==null?'':item.Feature_Name[1]
                let full_name = item.Feature_Name==null?'':item.Feature_Name
                return(
                    <div key={index} className='search-card'>
                        <div className='search-card-icon'>{first_initial}{second_initial }</div>
                        <p data-testid='card-paragraph-on' className='search-card-p'>{full_name}</p>
                    </div>
                )
            })
            setMatchedItems(matchedItems)
        }
    },[props.matches])

    useEffect(()=>{

    },[])

    return (
        <>
            {matchedItems}        
        </>
    )
}
