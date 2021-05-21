import {ACTIVATEBUFFERTOOL} from '../../Actions/bufferActions/types'
import reducer from './bufferToolActivationReducer'
import bufferActivationAction from '../../Actions/bufferActions/activateBufferTool'

const initialState={
    isBufferToolActivated:false
}

describe('testing the buffer activation reducer',()=>{
    it('test the initial buffer activation reducer state',()=>{
        expect(reducer(initialState,'')).toEqual(initialState)
    })
    it('test the buffer activation reducer state after receiving action ',()=>{
        expect(reducer(initialState,bufferActivationAction())).toEqual({isBufferToolActivated:true})
    })
})
