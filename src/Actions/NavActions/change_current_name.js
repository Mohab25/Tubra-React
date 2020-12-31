import {CHANGECURRENTNAVNAME} from './types'

const change_current_nav_name=(name)=>dispatch=>{
    dispatch({
        type:CHANGECURRENTNAVNAME,
        payload:name
    })
}

export default change_current_nav_name