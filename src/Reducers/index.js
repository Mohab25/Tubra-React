import {combineReducers} from 'redux'
import Current_nav_reducer from './NavReducers/Current_nav_reducer'
import notification_reducer from "./NotificationReducer/Notification_reducer"
import CreationFormReducer from './GeometryCreationReducer/CreationFormReducer'
import BufferAddRemoveReducer from './BufferReducers/BufferAddRemoveReducer'
import bufferReducer from "./BufferReducers/bufferReducer"
import EnableGeometryCreationReducer from './GeometryCreationReducer/EnableGeometryCreationReducer'
import identifyToolActivationReducer from "./IdentifyReducers/IdentifyActivationReducer"
import SearchComponentVisibilityReducer from './searchReducers/SearchComponentVisibilityReducer'
import searchBufferReducer from "./searchReducers/SearchBufferReducer";
import gettingMapRefReducer from "./MeasureReducer/gettingMapRefReducer";
import AdjustNavReducer from "./FilesReducers/AdjustNavReducer";

export default combineReducers({
    Current_nav_reducer,
    notification_reducer,
    CreationFormReducer,
    BufferAddRemoveReducer,
    bufferReducer,
    EnableGeometryCreationReducer,
    identifyToolActivationReducer,
    SearchComponentVisibilityReducer,
    searchBufferReducer,
    gettingMapRefReducer,
    AdjustNavReducer,
    
})