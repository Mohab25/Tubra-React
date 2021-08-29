import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import changeFilterType from '../../../../Actions/CADActions/changeFilterType'
import './styles.css'

export default function RunwayFiles(props) {
    let [height,setHeight]= useState(50)
    let [icon,setIcon] = useState('fa fa icon-plus')
    let dispatch = useDispatch()

    const toggleHeightAndIcon = ()=>{
        if(height==50){setHeight(300);setIcon('fa fa-icon-check-minus')} else{setHeight(50);setIcon('icon-plus')}
    }
    return (
        <div className='Runway-files-holder' style={{height:height}} >
            <div className='Runway-files-holder-header' onClick={toggleHeightAndIcon}>
                <p>Runway CAD</p>
                <i className={icon}></i>
            </div>
            <div className='Runway-file-types-holder'>
                {['Runway Layouts','Runway Marking','Runway Profiles','Runway X-Sections','General'].map(item=><button onClick={()=>dispatch(changeFilterType({aerodrome_part:'Runway',filterType:item}))} className='file-type-button' key={Math.random()}>{item}</button>)}
            </div>
        </div>
    )
}
