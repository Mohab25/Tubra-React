import React from 'react'
import './styles/styles.css'
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import change_current_nav_name from '../../Actions/NavActions/change_current_name'
import change_current_nav_logo from "../../Actions/NavActions/change_current_logo";

export default function Index(){
    const current_nav_name = useSelector(state=>state.Current_nav_reducer.current_name)
    const dispatch = useDispatch()
    
    const handleClick=(name,logo)=>{
        dispatch(change_current_nav_name(name))
        dispatch(change_current_nav_logo(logo))
    }
    
    return (
            <div className='Project-page-vertical-nav'>
                    <div className='Project-page-vertical-nav-container'>
                    <p className='Project-page-vertical-nav-black-drop'></p>
                    <div className='Project-page-vertical-nav-first-icons-set-container'>
                        <Link to='/' onClick={()=>handleClick('Main','fa fa-home')}><i className='fa fa-home'></i></Link>                               
                        <Link to='/charts' onClick={()=>handleClick('Charts','fas fa-chart-pie')}><i className='fas fa-chart-pie'></i></Link>
                        <Link to='/map' onClick={()=>handleClick('Map','fas fa-map')}><i className='fas fa-map'></i></Link>
                        <Link to='/3D' onClick={()=>handleClick('Schedule','fa fa-cube')}><i className='fa fa-cube'></i></Link>  
                        <Link to='/cad' onClick={()=>handleClick('CAD','fas fa-clone')}><i className='fas fa-clone'></i></Link>
                        <Link to='/files' onClick={()=>handleClick('Files','fas fa-folder')}><i className='fas fa-folder'></i></Link>
                        <i className=''></i>
                    </div>
                  </div>          
            </div>
        )
    }
