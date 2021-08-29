import React from 'react'
import {useState} from 'react'
import './styles.css'
import {useDispatch} from 'react-redux'
import changeFilterType from '../../../../Actions/CADActions/changeFilterType'

export default function TaxiwayFiles() {
    let [height,setHeight]= useState(50)
    let [icon,setIcon] = useState('fa fa icon-plus')
    let dispatch = useDispatch()

    const toggleHeightAndIcon = ()=>{
        if(height==50){setHeight(300);setIcon('fa fa-icon-check-minus')} else{setHeight(50);setIcon('icon-plus')}
    }
    return (
        <div className='Taxiway-files-holder' style={{height:height}}>
            <div className='Taxiway-files-holder-header' onClick={toggleHeightAndIcon}>
                <p>Taxiway CAD</p>
                <i className={icon}></i>
            </div>
            <div className='Taxiway-file-types-holder'>
                {['Taxiway Layouts','Taxiway Marking','Taxiway Profiles','Taxiway X-Sections','General'].map(item=><button onClick={()=>dispatch(changeFilterType({aerodrome_part:'Taxiway',filterType:item}))} className='file-type-button' key={Math.random()}>{item}</button>)}
            </div>
        </div>
    )
}
