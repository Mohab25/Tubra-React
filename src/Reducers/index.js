import {combineReducers} from 'redux'
import Current_nav_reducer from './NavReducers/Current_nav_reducer'
import notification_reducer from "./NotificationReducer/Notification_reducer";
import CreationFormReducer from './GeometryCreationReducer/CreationFormReducer'
import BufferAddRemoveReducer from './GeometryCreationReducer/BufferAddRemoveReducer'
import bufferReducer from "./BufferReducers/bufferReducer";

export default combineReducers({
    Current_nav_reducer,
    notification_reducer,
    CreationFormReducer,
    BufferAddRemoveReducer,
    bufferReducer
})