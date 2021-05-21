import {CREATEBUFFERDATATRANSFER} from './types'

export default function createBuffer(bufferGeomAndRadiusOb){
    return{
        type:CREATEBUFFERDATATRANSFER,
        payload:bufferGeomAndRadiusOb
    }
}

