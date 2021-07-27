import React from 'react'
import './styles/styles.css'

export default function Legend(props) {
    const Legend_names= props.legendItems
    if(Legend_names==undefined || Object.keys(Legend_names).length==0  ){return <div data-testid='empty-return'></div>} 
    return (
        <div className='Legend'>
            <div className='Legend-container'>
                {Object.keys(Legend_names).map((item,index)=>{
                    if(!isNaN(parseInt(item))){return }
                    return(
                        <div className='Legend-items-holder' key={index}>
                            <div>{item}</div>
                            <p data-testid={index}>{Legend_names[item]}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
