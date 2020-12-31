import {SHOW_HIDE_NOTIFICATION} from '../../Actions/Notification/types'

const initialState={
    notification_state:{
        view:"none",
        caller:undefined
    }
} 

const notification_reducer=(state=initialState,action)=>{
    switch(action.type){
        case SHOW_HIDE_NOTIFICATION:{
            return{
                ...state, 
                notification_state:action.payload
            }
        }
        default:{
            return state 
        }
    }
}

export default notification_reducer; 