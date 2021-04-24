import {GETGEOMTERY} from './types'

const prePopulateGeometry=(geometry)=>dispatch=>{
    dispatch({
        type:GETGEOMTERY,
        payload:geometry
    })
}

export default prePopulateGeometry;