import {REMOVEBUFFER} from './types'

const removeBuffer=(removerState)=>dispatch=>{
    dispatch({
        type:REMOVEBUFFER,
        payload:removerState
    })
}

export default removeBuffer; 