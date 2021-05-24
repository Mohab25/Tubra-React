import {ENABLECREATEGOEMETRY} from './types'

export default function enableDisableCreateGeometry(geomType,createStatus){
    return {
        type:ENABLECREATEGOEMETRY,
        payload:{geomType,createStatus}
    }
}