import React,{useState} from 'react'
import ToolsPane from '../MapToolsPane/MapToolsPane'
import ToolsWindow from '../MapToolsWindows/MapToolsWindows'


export default function MapToolsHolder(props) {
    
    let [WindowVisibility,setWindowVisibility] = useState('none')


    let toggleWindowVisibility=()=>{
        if(WindowVisibility==='none'){setWindowVisibility('block')}
        else{setWindowVisibility('none')}
    }


    return (
        <div>
            <ToolsPane toggleWindowVisibility={toggleWindowVisibility} toggleLinearMeasurement={props.toggleLinearMeasurement} distance={props.distance} activateBuffer={props.activateBuffer}/>
            <ToolsWindow display={WindowVisibility}/>
        </div>
    )
}
