import React from 'react'
import { useState,useEffect } from "react";
import './styles/styles2.css'

export default function Word_file_page() {
        const src = 'http://localhost:8003/Data/mypdf.pdf'
        const iframe_source = `/pdfjs-2.5.207-dist/web/viewer.html?file=${src}`
        return (
        <div className='files-viewer'>
            <div className='files-viewer-container'>
                <div className='files-viewer-side'></div>
                <div className='files-viewer-main-area'>
                    <form>
                    <input name='search' placeholder='search doc..'/>
                    </form>
                    <iframe src={iframe_source} style={{width:'90%',height:'100%'}}></iframe>

                </div>
            </div>
        </div>
                
            
            )
}


