import {REMOVEBUFFER} from './types'

const removeBuffer=(removerState)=>{
    return{
        type:REMOVEBUFFER,
        payload:removerState
    }
}

export default removeBuffer; 