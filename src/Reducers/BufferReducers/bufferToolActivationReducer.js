import {ACTIVATEBUFFERTOOL} from '../../Actions/bufferActions/types'

const initialState={
    isBufferToolActivated:false
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
        default:{
            return state
        }
    }
}