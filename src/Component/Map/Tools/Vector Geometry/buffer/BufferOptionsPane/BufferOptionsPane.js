import React,{useState} from 'react'
import './styles/styles.css'
import AddBuffer from './Options/AddBuffer/AddBuffer'
import {useDispatch} from 'react-redux'
import removeBuffer from '../../../../../../Actions/bufferActions/RemoveBuffer'


export default function BufferOptionsPane(props){
    let [option,setOption]=useState({
        add:{color:'orange',display:'none'},search:{color:'orange',display:'none'},remove:{color:'orange',display:'none'}
    })

    let dispatch = useDispatch()


    let toggleOption=(bufferOption)=>{
        let options={add:{color:'orange',display:'none'},search:{color:'orange',display:'none'},remove:{color:'orange',display:'none'}}
        switch(bufferOption){
            case 'add': if(option.add.color=='orange'){options.add.color='orangered';options.add.display='flex'} else{options.add.color='orange';options.add.display='none'}
            setOption(options);break;
            case 'search':if(option.search.color=='orange'){
                options.search.color='orangered';options.search.display='flex';options.add.display='flex'
            } 
            else{
                options.search.color='orange';options.search.display='none';options.add.display='none'
            }
            setOption(options);break;
            case 'remove':if(option.remove.color=='orange'){options.remove.color='orangered';options.remove.display='flex';dispatch(removeBuffer('active'))} else{options.remove.color='orange';options.remove.display='none';dispatch(removeBuffer('inactive'))}
            setOption(options);break;
        }
    }

    return(
        <div className='BufferOptionsPane' style={{display:props.display}}>
            <div className='BufferOptionsPaneContainer'>
                <div className='addBufferButton' style={{backgroundColor:option.add.color}} onClick={()=>toggleOption('add')}>
                    Add Buffer
                </div>
                <div className='bufferSearchButton' style={{backgroundColor:option.search.color}} onClick={()=>toggleOption('search')}>
                    Search
                </div>
                <div className='bufferRemoveButton' style={{backgroundColor:option.remove.color}} onClick={()=>toggleOption('remove')}>
                    Remove
                </div>
            </div>
        <AddBuffer display={option.add.display}/>
        
        </div>
    )
}