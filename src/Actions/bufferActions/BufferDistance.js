import {BUFFERDISTANCE} from './types'

const changeBufferDistance=(bufferDistance)=>dispatch=>{
    dispatch({
        type:BUFFERDISTANCE,
        payload:bufferDistance
    })
}   

export default changeBufferDistance; 
