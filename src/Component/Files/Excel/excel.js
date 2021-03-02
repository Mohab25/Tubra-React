import React from 'react'
import './styles/styles.css'
import FileCard from "../FileCard/fileCard.js";


export default function Excel(props) {
  let {cards} = props
    return (
        <div className='Excel'>
            <div>
                <h5> Documented Calcs</h5>
                <div className='files-row'>{cards.map((item,index)=>{
                    let excel_name = item.Name.substring(0,16)
                    let pk = item.pk
                    return <FileCard key={index} title={excel_name} fileType='excel' pk={pk} handleClick={props.handleClick}/>
                })}
            </div>
        </div>
        </div>
    )
}
