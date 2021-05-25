import {ACTIVATEBUFFERTOOL} from '../../Actions/bufferActions/types'
import {CREATEBUFFERDATATRANSFER} from '../../Actions/bufferActions/types'


const initialState={
    isBufferToolActivated:false,
    bufferGeomAndRadiusOb:{}
}

export default function bufferToolActivationReducer(state=initialState,action){
    switch(action.type){
        
        case ACTIVATEBUFFERTOOL:{
            if(state.isBufferToolActivated==false){
                return{
                    ...state,isBufferToolActivated:true
                }
            }
            else{

                return{
                    ...state,isBufferToolActivated:false
                }
            }
        } 
        case CREATEBUFFERDATATRANSFER:{
            // in order to create a buffer the buffer tool should be activated, thi if is about that
            if(state.isBufferToolActivated==true){
                return{
                    ...state,bufferGeomAndRadiusOb:action.payload
                }
            }
            else{
                return state
            }
        }

        default:{
            return state
        }
    }
}