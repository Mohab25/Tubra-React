import React,{useState} from 'react'
import './styles/styles.css'

export default function BufferParameterPane(props){
    let [btnColor,setBtnColor]=useState({
        add:'orange',search:'orange',remove:'orange'
    })

    let toggleBtnColor=(btn)=>{
        let colors={add:'orange',search:'orange',remove:'orange'}
        switch(btn){
            case 'add':btnColor.add=='orange'?colors.add='orangered':colors.add='orange';setBtnColor(colors);break;
            case 'search':btnColor.search=='orange'?colors.search='orangered':colors.search='orange';setBtnColor(colors);break;
            case 'remove':btnColor.remove=='orange'?colors.remove='orangered':colors.remove='orange';setBtnColor(colors);break;
        }
    }

    return(
        <div className='BufferParameterPane' style={{display:props.display}}>
            <div className='BufferParameterPaneContainer'>
                <div className='addBufferButton' style={{backgroundColor:btnColor.add}} onClick={()=>toggleBtnColor('add')}>
                    Add Buffer
                </div>
                <div className='bufferSearchButton' style={{backgroundColor:btnColor.search}} onClick={()=>toggleBtnColor('search')}>
                    Search
                </div>
                <div className='bufferRemoveButton' style={{backgroundColor:btnColor.remove}} onClick={()=>toggleBtnColor('remove')}>
                    Remove
                </div>
            </div>
        </div>
    )
}