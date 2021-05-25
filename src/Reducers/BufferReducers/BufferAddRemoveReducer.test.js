import reducer from './BufferAddRemoveReducer'
import {BUFFERDISTANCE} from '../../Actions/GeometryCreation/types'
import {REMOVEBUFFER} from '../../Actions/GeometryCreation/types'


const initialState={
    distance:10,
    bufferRemoveState:'inactive'
}

describe('testing the buffer creation reducer', () => {
    it('returns the initial state (holds the default buffer distance and the default state of remove buffer tool) by default',()=>{
        expect(reducer(undefined,{type:BUFFERDISTANCE,payload:10})).toEqual({distance:10,bufferRemoveState:'inactive'})
        expect(reducer(undefined,{type:REMOVEBUFFER,payload:'inactive'})).toEqual({distance:10,bufferRemoveState:'inactive'})
    })
    it('changes the default buffer distance if the action payload has a different distance',()=>{
        expect(reducer(initialState,{type:BUFFERDISTANCE,payload:11})).toEqual({distance:11,bufferRemoveState:'inactive'})
    })

    it('changes the default remove tool initial state to active if the action payload holds the active value',()=>{
        expect(reducer(initialState,{type:REMOVEBUFFER,payload:'active'})).toEqual({distance:10,bufferRemoveState:'active'})
    })
    // edge cases
    it('returns the default distance value if the action payload equals zero',()=>{
        expect(reducer(initialState,{type:BUFFERDISTANCE,payload:0})).toEqual({distance:10,bufferRemoveState:'inactive'})
    })
    it('returns the default distance value if the action payload is less than zero',()=>{
        expect(reducer(initialState,{type:BUFFERDISTANCE,payload:-10})).toEqual({distance:10,bufferRemoveState:'inactive'})
    })
    it('returns inactive if the action payload is something else than active',()=>{
        expect(reducer(initialState,{type:REMOVEBUFFER,payload:'random word'})).toEqual({distance:10,bufferRemoveState:'inactive'})
    })
})
