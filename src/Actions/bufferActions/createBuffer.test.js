import {CREATEBUFFERDATATRANSFER} from './types'
import createBuffer from './createBuffer'

describe('transferring data to create a buffer',()=>{
    it('return the actual data',()=>{
        let bufferGeomAndRadiusOb={
            type:CREATEBUFFERDATATRANSFER,
            payload:{
                geom:{"type": "Polygon","coordinates": [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],[100.0, 1.0], [100.0, 0.0]]]},
                radius:100
            }
        }
        const testingGeomAndRadius = {
            geom:{"type": "Polygon","coordinates": [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],[100.0, 1.0], [100.0, 0.0]]]},
            radius:100
        }
        expect(createBuffer(testingGeomAndRadius)).toEqual(bufferGeomAndRadiusOb)
    })
})