import {ENABLECREATEGOEMETRY} from './types'

export default function enableDisableCreateGeometry(geomType){
    return {
        type:'ENABLECREATEGOEMETRY',
        payload:geomType
    }
}