import React,{Fragment, useState} from 'react'
import  topo  from "./images/Topo.jpg";
import  dark  from "./images/Dark.jpg";
import  light  from "./images/Light.jpg";
import './styles/tile_window.css';

export default function Tiles_control_window() {
    
    let [previewImages,setPreviewImages]=useState([dark,light,topo])

    let previews = previewImages.map((image,index)=>{return(<Fragment key={index}>
        <div className='preview-image' style={{backgroundImage:`url(${image})`}}></div>
        <p className='preview-text'></p>
        </Fragment>)})



    return (
        <div className='Tiles-control-window'>
            <div className='Tiles-control-window-container'>
                <div className='preview-container'>
                    {previews}
                </div>
            </div>
        </div>
    )
}
