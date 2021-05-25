import {CHANGECURRENTNAVLOGO} from './types'
import change_current_nav_logo from './change_current_logo'

describe('changes the logo that appear in the top nav bar, leading the user about the current nav page',()=>{
    it('returns the logo of the current page navigated ',()=>{
        expect(change_current_nav_logo('map logo')).toEqual({type:CHANGECURRENTNAVLOGO,payload:'map logo'})
    })
})