import {combineReducers} from 'redux'
import Current_nav_reducer from './NavReducers/Current_nav_reducer'
import notification_reducer from "./NotificationReducer/Notification_reducer";

export default combineReducers({
    Current_nav_reducer,
    notification_reducer
})