import {CHANGECURRENTNAVNAME} from './types'

const change_current_nav_name=(name)=>{
    return{
        type:CHANGECURRENTNAVNAME,
        payload:name
    }
}

export default change_current_nav_name