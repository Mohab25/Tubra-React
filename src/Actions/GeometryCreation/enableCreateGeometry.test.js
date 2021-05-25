import {ENABLECREATEGOEMETRY} from './types'
import enableDisableCreateGeometry from './enableCreateGeometry'

describe('testing for enable geometry creation action',()=>{
   it('returns the geometry type and creation status',()=>{
    expect(enableDisableCreateGeometry('polygon','enabled')).toEqual({type:ENABLECREATEGOEMETRY,payload:{geomType:'polygon',createStatus:'enabled'}})
    expect(enableDisableCreateGeometry('point','disabled')).toEqual({type:ENABLECREATEGOEMETRY,payload:{geomType:'point',createStatus:'disabled'}})
   }) 
})