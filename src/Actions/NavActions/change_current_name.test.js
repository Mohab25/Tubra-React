import {CHANGECURRENTNAVNAME} from './types'
import change_current_nav_name from './change_current_name'

describe('changes the name that appear in the top nav bar, leading the user about the current nav page',()=>{
    it('returns the name of the current page navigated ',()=>{
        expect(change_current_nav_name('map')).toEqual({type:CHANGECURRENTNAVNAME,payload:"map"})
    })
})