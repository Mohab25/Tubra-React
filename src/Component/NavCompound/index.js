import React from 'react'
import {useEffect, useState} from 'react'
import './styles/styles.css'
import {useSelector,useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import toggle_notification_state from "../../Actions/Notification/handlenotification";
import switchToFilesView from '../../Actions/FilesActions/switchToFileView'
import switchToCADSView from '../../Actions/CADActions/switchToCADView'
import adjustNavLink from '../../Actions/FilesActions/adjustNavLinks'
import adjustNavLinkCAD from '../../Actions/CADActions/adjustNavLinks'
import AddFilesButton from '../AddFilesButton/AddFilesButton'


export default function Index(){
    const current_name = useSelector(state=>state.Current_nav_reducer.current_name)
    const current_logo = useSelector(state=>state.Current_nav_reducer.logo)
    const dispatch = useDispatch()
    
    // adjusting the history
    const history = useHistory()
    // the current state of the filesView == to change the behaviour of the back button.
    const isFileViewActivated = useSelector(state=>state.AdjustNavReducer.isViewPageActive)
    const changeViewDispatch = useDispatch()
    const anotherDispatch = useDispatch()
    // same logic for the cad, i'm decoupling components
    const isCADViewActivated = useSelector(state=>state.AdjustCADNavReducer.isViewPageActive)
    const changeCADViewDispatch = useDispatch()
    const anotherCADDispatch = useDispatch()


    // add Files button 
    const [filesButtonDisplay,setAddButtonDisplay]= useState('none')

    const handleClick=(view,caller)=>{
        dispatch(toggle_notification_state(view,caller))
    }

    const backClick=()=>{
        if(isFileViewActivated){
            changeViewDispatch(switchToFilesView())
            anotherDispatch(adjustNavLink())
        }
        else if(isCADViewActivated){
            console.log('the cad',isCADViewActivated)
            changeCADViewDispatch(switchToCADSView())
            anotherCADDispatch(adjustNavLinkCAD())
        }
        else{
            console.log('not the cad',isCADViewActivated)
            history.goBack()
        }
    }

    useEffect(()=>{
        if(['map','files','cad'].includes(current_name.toLowerCase())){
            setAddButtonDisplay('flex')
        }
        else{
            setAddButtonDisplay('none')
        }
    },[current_name])

    return (
            <div className='Project-page-nav'>
                  <div className='Project-page-nav-container'>
                  <div className='Project-page-nav-first-icons-set-container'>
                      <i className='fa fa-bars'></i>                  
                      <i className={current_logo}></i>     
                      <span> &gt; {current_name} </span>  
                                
                  </div>
                  <div className='Project-page-nav-second-icons-set-container'>
                      <AddFilesButton display={filesButtonDisplay}/> 
                      <i className='fa fa-long-arrow-left' onClick={backClick}></i>       
                      <i className='fas fa-bell' onClick={()=>handleClick('block','notification')}></i>       
                      <i className='fas fa-envelope' onClick={()=>handleClick('block','message')}></i>                  
                      <i className='fas fa-power-off' onClick={()=>handleClick('block','log')}></i>       
                  </div>
                  </div>          
            </div>
        )
}

