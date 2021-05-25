import reducer from './EnableGeometryCreationReducer'
import {ENABLECREATEGOEMETRY} from '../../Actions/GeometryCreation/types' 

let initialState={
    geomType:"",
    GeometryCreation:'disabled',
}

describe('geometry creation enabler reducer, toggler the creation phase with specific type of geometry ', () => {
    it('returns the default values for the geom type and geometry creation phase (enable/disable) create geometry',()=>{
        expect(reducer(undefined,{type:ENABLECREATEGOEMETRY,payload:{geomType:"",createStatus:'disabled'}})).toEqual({geomType:'',GeometryCreation:'disabled'})
    })
    it('changes the geometry creation phase (enable/disable) according to the payload createStatus, note that there must be geometry type [gard]',()=>{
        expect(reducer(initialState,{type:ENABLECREATEGOEMETRY,payload:{geomType:"point",createStatus:'enabled'}})).toEqual({geomType:'point',GeometryCreation:'enabled'})
    })
    // edge cases
    it('returns the default if the geometry type is not point,line or polygon',()=>{
        expect(reducer(initialState,{type:ENABLECREATEGOEMETRY,payload:{geomType:"",createStatus:'enabled'}})).toEqual({geomType:'',GeometryCreation:'disabled'})
        expect(reducer(initialState,{type:ENABLECREATEGOEMETRY,payload:{geomType:"polyhedra",createStatus:'enabled'}})).toEqual({geomType:'',GeometryCreation:'disabled'})
    })
    it('returns the default if the createStatus is disabled',()=>{
        expect(reducer(initialState,{type:ENABLECREATEGOEMETRY,payload:{geomType:"point",createStatus:'disabled'}})).toEqual({geomType:'',GeometryCreation:'disabled'})
    })
    it('returns the default if the createStatus is a random word',()=>{
        expect(reducer(initialState,{type:ENABLECREATEGOEMETRY,payload:{geomType:"point",createStatus:'random'}})).toEqual({geomType:'',GeometryCreation:'disabled'})
    })  
})
