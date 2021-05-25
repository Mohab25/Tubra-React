import {REMOVEBUFFER} from './types'
import removeBuffer from './RemoveBuffer'

describe('test to remove buffer',()=>{
    it('return the remove action payload as the current state of buffer removal tool',()=>{
        expect(removeBuffer('active')).toEqual({type:REMOVEBUFFER,payload:'active'})
        expect(removeBuffer('inactive')).toEqual({type:REMOVEBUFFER,payload:'inactive'})
    })
})