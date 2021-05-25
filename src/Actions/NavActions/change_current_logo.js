import {CHANGECURRENTNAVLOGO} from './types'

const change_current_nav_logo=(name)=>{
    return {
        type:CHANGECURRENTNAVLOGO,
        payload:name
    }
}

export default change_current_nav_logo