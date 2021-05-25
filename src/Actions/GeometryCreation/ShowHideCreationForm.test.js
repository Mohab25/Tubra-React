import {SHOWHIDECREATIONFORM} from './types'
import toggleGeometryCreationFormVisibility from './ShowHideCreationForm'

describe('test to toggle geometry creation form ',()=>{
    it('toggle the condition of geometry creation form',()=>{
        expect(toggleGeometryCreationFormVisibility()).toEqual({type:SHOWHIDECREATIONFORM})
    })
})
