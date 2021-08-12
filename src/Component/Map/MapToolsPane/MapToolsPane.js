import React,{useState} from 'react'
import './styles/styles.css'
import Identify from '../Tools/identify/identify'
import Measure from '../Tools/measure/measure'
import Buffer from '../Tools/Vector Geometry/buffer/buffer'
import Path from '../Tools/Path/path'
import Search from '../Tools/search/search'
import VectorCreation from '../Tools/Vector Geometry/VectorCreationTool/VectorCreationTool'
import TilesControl from '../Tools/Tiles control/tiles'

export default function MapToolsPane(props) {
    
    let [PaneVisibility,togglePaneVisibility] = useState('off')
    
    let PaneOn=()=>{
        togglePaneVisibility('on')
    }

    let PaneOff=()=>{
        togglePaneVisibility('off')

    }

    if(PaneVisibility=='off'){
        return(
            <div data-testid='Gear' className='Gear-icon-container' onClick={PaneOn}>
                <i className='fa fa-cog'></i>
            </div>
            
        )
    }

    else{    
        return (
            <div data-testid='MapToolsPane' className='MapToolsPane'>
                <div className='MapToolsPaneContainer'>
                    <div className='MapToolsTitleContainer'>
                        <h6>Tools</h6>
                        <i className='fa fa-times cancel-icon' onClick={PaneOff}></i>
                    </div>
                    <div className='ToolsContainer'>
                        <Identify/>
                        <Search/>
                        <Measure toggleLinearMeasurement={props.toggleLinearMeasurement} distance={props.distance}/>
                        <Buffer createPoint={props.createPoint}/>
                        <Path/>
                        <VectorCreation activateVector={props.activateVector} isVectorActivated={props.isVectorActivated} createPoint={props.createPoint}/>
                        <TilesControl toggleWindowVisibility={props.toggleWindowVisibility}/>
                    </div>
                </div>
            </div>
        )

    }
}

