import {BUFFERDISTANCE} from '../../Actions/GeometryCreation/types'
import {REMOVEBUFFER} from '../../Actions/GeometryCreation/types'

const initialState={
    distance:10,
    bufferRemoveState:'inactive'
}

export default function BufferAddRemoveReducer(state=initialState,action){
    if(action.payload>99000 || action.payload<=0){
        action.payload=10
    }
    switch(action.type){
        case BUFFERDISTANCE:{
            return{...state,distance:action.payload}
        }
        case REMOVEBUFFER:{
            return{...state,bufferRemoveState:action.payload}
        } 

        default:return state
    }
}