import { ACTIVATEIDENTIFYTOOL } from "../../Actions/identifyActions/types";

const initialState = {
    isIdentifyToolActive:false
}

export default function identifyToolActivationReducer(state=initialState,action){
    
    switch(action.type){
        case ACTIVATEIDENTIFYTOOL:{
            if(state.isIdentifyToolActive==false){
                return {...state,isIdentifyToolActive:true}
            }
            else{
                return {...state,isIdentifyToolActive:false}
            }
        }
        default:return state
    }
}