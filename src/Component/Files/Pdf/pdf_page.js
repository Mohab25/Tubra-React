import React from 'react'
import { useState,useEffect } from "react";
import './styles/styles2.css'
import data from '../../../Data/Hilight_AHPanoverviewofapplications.pdf'
export default function Word_file_page(props) {
    console.log(props.url)    
    const src = 'localhost:8000/media/Achieving-matrix-consistency-in-AHP-through-li_2011_Applied-Mathematical-Mod.pdf'
        const iframe_source = `/pdfjs-2.5.207-dist/web/viewer.html?file=${src}`
        return (
        <div className='files-viewer'>
            <div className='files-viewer-container'>
                <div className='files-viewer-side'></div>
                <div className='files-viewer-main-area'>
                    <form>
                    <input name='search' placeholder='search doc..'/>
                    </form>
                    <iframe src={data} style={{width:'90%',height:'100%'}}></iframe>

                </div>
            </div>
        </div>
                
            
            )
}


