import React from 'react'
import {useState} from 'react'
import './styles.css'
import {useDispatch} from 'react-redux'
import changeFilterType from '../../../../Actions/CADActions/changeFilterType'

export default function Reports() {
    let [height,setHeight]= useState(50)
    let [icon,setIcon] = useState('fa fa icon-plus')
    let dispatch = useDispatch()

    const toggleHeightAndIcon = ()=>{
        if(height==50){setHeight(250);setIcon('fa fa-icon-check-minus')} else{setHeight(50);setIcon('icon-plus')}
    }
    return (
        <div className='Reports-files-holder' style={{height:height}}>
                <div className='Reports-files-holder-header' onClick={toggleHeightAndIcon}><p>Drainage CAD</p>
                <i className={icon}></i>
            </div>
            <div className='Apron-file-types-holder'>
                {['Drainage Layouts','Drainage Profiles','Drainage X-Sections','General'].map(item=><button onClick={()=>dispatch(changeFilterType({aerodrome_part:'Drainage',filterType:item}))} className='file-type-button' key={Math.random()}>{item}</button>)}
            </div>
        </div>
    )
}
