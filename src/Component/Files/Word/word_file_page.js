import React from 'react'
import './styles/styles2.css'

export default function Word_file_page(props) {
    let {title,content} = props

    // constructing the actual file.
    let doc = 
        <>
            <h2 className='document-section-headers'>{title.replace('(This is Heading #H2)','')}</h2>
            <p className='document-content'>{content}</p>
        </>
        
    // constructing the page body.
        return (
        <div className='files-viewer'>
            <div className='files-viewer-container'>
                <div className='files-viewer-side'></div>
                <div className='files-viewer-main-area'>
                    <form>
                    <input name='search' placeholder='search doc..'/>
                    </form>
                    {doc}
                </div>
            </div>
        </div>
                
            
            )
}


