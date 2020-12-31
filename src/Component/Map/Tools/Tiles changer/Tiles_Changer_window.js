import React,{useState} from 'react'
import  topo  from "./images/Topo.jpg";
import  dark  from "./images/Dark.jpg";
import  light  from "./images/Light.jpg";
import './styles/tile_window.css';

export default function Tiles_Changer_window() {
    
    let [previewImages,setPreviewImages]=useState([dark,light,topo])

    let previews = previewImages.map((image,index)=>{return(<>
        <div key={index} className='preview-image' style={{backgroundImage:`url(${image})`}}></div>
        <p className='preview-text'></p>
        </>)})

    return (
        <div className='Tiles-changer-window'>
            <div className='Tiles-changer-window-container'>
                <div className='preview-container'>
                    {previews}
                </div>
            </div>
        </div>
    )
}
