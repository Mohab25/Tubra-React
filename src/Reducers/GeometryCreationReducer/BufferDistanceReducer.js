import {BUFFERDISTANCE} from '../../Actions/GeometryCreation/types'

const initialState={
    distance:10
}

export default function BufferDistanceReducer(state=initialState,action){
    if(action.payload>99000 || action.payload<=0){
        action.payload=10
    }
    switch(action.type){
        case BUFFERDISTANCE:{
            return{...state,distance:action.payload}
        }
        default:return state
    }
}