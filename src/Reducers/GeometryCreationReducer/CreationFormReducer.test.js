import reducer from './CreationFormReducer'
import {SHOWHIDECREATIONFORM} from '../../Actions/GeometryCreation/types'
import {GETGEOMTERY} from '../../Actions/GeometryCreation/types'

const initialState = {
    display:'none',
    geom:''
}

describe('testing the geometry creation form reducer, it handles the form display and pre populates the form with a geometry ', () => {
    it('returns the default value for the display and geometry if the initial state hasn\'t change ',()=>{
        // as the SHOWHIDECREATIONFORM toggles the state upon called, it won't return the same default value
        expect(reducer(undefined,{type:SHOWHIDECREATIONFORM})).toEqual({display:'flex',geom:''})
        expect(reducer(undefined,{type:GETGEOMTERY,payload:''})).toEqual({display:'none',geom:''})
    })

    it('returns the new geometry upon GETGEOMTERY action is called',()=>{
        let geoJSON_ob = {"geometry": {"type": "Point","coordinates": [102.0, 0.5]}}
        expect(reducer(initialState,{type:GETGEOMTERY,payload:geoJSON_ob})).toEqual({display:'none',geom:geoJSON_ob})
    })
    // edge cases can be checked here in the reducer with geoJSON validation lib, the geometry is always changing.     
})
