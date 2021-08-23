import React from 'react'
import {useState} from 'react'
import './styles.css'
import {useDispatch} from 'react-redux'
import changeFileType from '../../../../Actions/FilesActions/changeFileType'

export default function TaxiwayFiles() {
    let [height,setHeight]= useState(50)
    let [icon,setIcon] = useState('fa fa icon-plus')
    let dispatch = useDispatch()

    const toggleHeightAndIcon = ()=>{
        if(height==50){setHeight(250);setIcon('fa fa-icon-check-minus')} else{setHeight(50);setIcon('icon-plus')}
    }
    return (
        <div className='Taxiway-files-holder' style={{height:height}}>
            <div className='Taxiway-files-holder-header' onClick={toggleHeightAndIcon}>
                <p>Taxiway Files</p>
                <i className={icon}></i>
            </div>
            <div className='Taxiway-file-types-holder'>
                {['Word','Excel','PDF','All Files'].map(item=><button onClick={()=>dispatch(changeFileType({aerodrome_part:'Taxiway',fileType:item}))} className='file-type-button' key={Math.random()}>{item}</button>)}
            </div>
        </div>
    )
}
