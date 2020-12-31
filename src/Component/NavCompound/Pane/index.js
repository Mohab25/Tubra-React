import React from 'react'
import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import './styles/styles.css'
import toggle_notification_state from "../../../Actions/Notification/handlenotification";

export default function Index() {
    const [notification_cards,setCards] = useState([1,2,3,4])
    const dispatch = useDispatch()
    const notification_item=useSelector(state=>state.notification_reducer.notification_state)
    let {view,caller} = notification_item
    
    const handleClick=()=>{
        dispatch(toggle_notification_state('none','close'))
    }
    
    
    
    let Card = <div className='notification-card'>
                    <div className='notification-card-title'>
                        <h4>Note Card Title </h4>
                        <i className="far fa-times-circle notification-close-icon close-icon" onClick={handleClick}></i>    
                    </div>
                    <div className='notification-card-body'>
                    {notification_cards.map((item,index)=>{
                        return(
                            <p key={index}>exercitation in sit Plane qui labore proident. proident nostrud.</p>
                        )
                        })}
                    </div>
                    <div className='notification-card-footer'>
                        <button onClick={handleClick}>Close</button>
                    </div>
                </div>
    return (
        <div className='pane-switch' style={{display:view}}>
        <div className='notification-pane'>
            <div className='notification-pane-container'>
                <div className='notification-cards-holder'>
                    {Card}
                </div>
            </div>
        </div>
        <div className='notification-backdrop'></div>
        </div>
    )
}
