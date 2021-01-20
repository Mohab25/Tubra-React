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
            <ToolsPane toggleWindowVisibility={toggleWindowVisibility} turf_distance={props.turf_distance}/>
            <ToolsWindow display={WindowVisibility}/>
        </div>
    )
}
