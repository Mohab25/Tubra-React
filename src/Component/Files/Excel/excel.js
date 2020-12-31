import React from 'react'
import './styles/styles.css'
import FileCard from "../FileCard/fileCard.js";


export default function Excel(props) {
  let {cards} = props
    return (
        <div className='Excel'>
            <div>
                <h5> Documented Calcs</h5>
                <div className='files-row'>{cards.map(item=>{
                    return <FileCard title={item} fileType='excel' handleClick={props.handleClick}/>
                })}
            </div>
        </div>
        </div>
    )
}
