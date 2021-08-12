import React from 'react'
import './styles/style.css'
import textual_data from './assets/Textual.json'
import source from './assets/1.jpg'

export default function AnnexExcerpts() {
    return (
        <div className='AnnexExcerpt'>
            <div className='AnnexExcerpt-container'>
                <div className='AnnexExcerpt-img-gallery'>
                    <div className='AnnexExcerpt-img' style={{background:`url(${source})`}}></div>
                </div>
                <div className='AnnexExcerpt-textual'>
                    {textual_data.textual.map((item,index)=>{
                        return(
                            <div key={index} className='AnnexExcerpt-textual-section'>
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