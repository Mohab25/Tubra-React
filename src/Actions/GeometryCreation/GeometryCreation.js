import {GETGEOMTERY} from './types'

const prePopulateGeometry=(geometry)=>{
    return{
        type:GETGEOMTERY,
        payload:geometry
    }
}

export default prePopulateGeometry;