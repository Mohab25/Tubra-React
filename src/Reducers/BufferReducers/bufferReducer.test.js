import reducer from './bufferReducer'
import bufferActivationAction from '../../Actions/bufferActions/activateBufferTool'
import createBuffer from "../../Actions/bufferActions/createBuffer";

const initialState={
    isBufferToolActivated:false,
    bufferGeomAndRadiusOb:{}
}

describe('testing the buffer activation reducer',()=>{
    it('test the initial buffer activation reducer state',()=>{
        expect(reducer(initialState,'')).toEqual(initialState)
    })
    it('test the buffer activation reducer state after receiving action ',()=>{
        expect(reducer(initialState,bufferActivationAction())).toEqual({isBufferToolActivated:true,bufferGeomAndRadiusOb:{}})
    })
    it('test the buffer creation geometry object',()=>{
        let geomRadiusOb = {
            geom:{"type": "Polygon","coordinates": [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],[100.0, 1.0], [100.0, 0.0]]]},
            radius:100
        }
        // because this reducer has a check on it for the bufferActivation, if the buffer activation 
        // is false, it will return the initial state without making a change to it 
        expect(reducer(initialState,createBuffer(geomRadiusOb))).toEqual({isBufferToolActivated:false,bufferGeomAndRadiusOb:{}})
    
        let state_with_isBufferToolActivated_set_to_true={
            isBufferToolActivated:true,
            bufferGeomAndRadiusOb:{}
        }
        expect(reducer(state_with_isBufferToolActivated_set_to_true,createBuffer(geomRadiusOb))).toEqual({isBufferToolActivated:true,bufferGeomAndRadiusOb:geomRadiusOb})

    })
})
