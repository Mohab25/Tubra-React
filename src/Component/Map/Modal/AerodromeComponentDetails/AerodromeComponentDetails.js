import React from 'react'
import './styles/style.css'
import textual_data from './assets/Textual.json'
import source from './assets/1.jpg'

export default function AerodromeComponentDetails() {
    return (
        <div className='AerodromeComponentDetails'>
            <div className='AerodromeComponentDetails-container'>
                <div className='AerodromeComponentDetails-img-gallery'>
                    <div className='AerodromeComponentDetails-img' style={{background:`url(${source})`}}></div>
                </div>
                <div className='AerodromeComponentDetails-textual'>
                    {textual_data.textual.map((item,index)=>{
                        return(
                            <div key={index} className='AerodromeComponentDetails-textual-section'>
                                <h2>{item.section.section_header}</h2>
                                {item.section['section content'].map((subsection,index)=>{
                                    return(<div key={index}>
                                        <h3>{subsection.subsection_title}</h3>
                                        <p>{subsection.subsection_content}.
                                        </p>
                                    </div>
                                    )})}
                            </div>
                        )
                    })}
                </div>
            </div>
 
        </div>
        
    )
}