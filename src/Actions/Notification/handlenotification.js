import { SHOW_HIDE_NOTIFICATION } from "./types";

const toggle_notification_state=(view,caller)=>dispatch=>{
    dispatch({
        type:SHOW_HIDE_NOTIFICATION, 
        payload:{'view':view,'caller':caller}
    }); 
}

export default toggle_notification_state; 