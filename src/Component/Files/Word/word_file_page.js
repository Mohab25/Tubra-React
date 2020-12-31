import React from 'react'
import { useState,useEffect } from "react";
import './styles/styles2.css'

export default function Word_file_page() {
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8003/Data/docx_test.json').then((res)=>res.json()).then(data=>setData(data))
    },[])


    let doc = data.map(elem=>{
        return(
        <>
            <h2 className='document-section-headers'>{elem.heading.replace('(This is Heading #H2)','')}</h2>
            <p className='document-content'>{elem.content}</p>
            </>
        )
    })

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


