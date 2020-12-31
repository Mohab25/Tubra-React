import React,{useState} from 'react'
import './styles/styles.css'
import Tiles_changer from '../Tools/Tiles changer/Tiles_Changer_window'


export default function MapToolsWindow(props) {
    
    let [PaneVisibility,togglePaneVisibility] = useState('off')
    
    let PaneOn=()=>{
        togglePaneVisibility('on')
    }

    let PaneOff=()=>{
        togglePaneVisibility('off')

    }  
        return (
            <div className='MapToolsWindow'>
                <div className='MapToolsWindowContainer'>
                    <div className='MapToolsWindowTitleContainer'>
                        <h6>Tools</h6>
                        <i className='fa fa-times cancel-icon' onClick={PaneOff}></i>
                    </div>
                    <div className='ToolsWindowContainer'>
                        <Tiles_changer/>
                    </div>
                </div>
            </div>
        )

    
}

