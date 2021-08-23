import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import changeFileType from '../../../../Actions/FilesActions/changeFileType'
import './styles.css'

export default function RunwayFiles(props) {
    let [height,setHeight]= useState(50)
    let [icon,setIcon] = useState('fa fa icon-plus')
    let dispatch = useDispatch()

    const toggleHeightAndIcon = ()=>{
        if(height==50){setHeight(250);setIcon('fa fa-icon-check-minus')} else{setHeight(50);setIcon('icon-plus')}
    }
    return (
        <div className='Runway-files-holder' style={{height:height}} >
            <div className='Runway-files-holder-header' onClick={toggleHeightAndIcon}>
                <p>Runway Files</p>
                <i className={icon}></i>
            </div>
            <div className='Runway-file-types-holder'>
                {['Word','Excel','PDF','All Files'].map(item=><button onClick={()=>dispatch(changeFileType({aerodrome_part:'Runway',fileType:item}))} className='file-type-button' key={Math.random()}>{item}</button>)}
            </div>
        </div>
    )
}
