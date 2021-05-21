import {ACTIVATEBUFFERTOOL} from './types'
import activateBufferTool from './activateBufferTool'

describe('buffer tool activation actions',()=>{
    it('toggle the activation status',()=>{
        let actionReturns = {type:ACTIVATEBUFFERTOOL}
        expect(activateBufferTool()).toEqual(actionReturns)
    })
})
