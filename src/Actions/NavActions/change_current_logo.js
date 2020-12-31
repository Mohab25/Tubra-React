import {CHANGECURRENTNAVLOGO} from './types'

const change_current_nav_logo=(name)=>dispatch=>{
    dispatch({
        type:CHANGECURRENTNAVLOGO,
        payload:name
    })
}

export default change_current_nav_logo