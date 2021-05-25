import {GETGEOMTERY} from './types'
import prePopulateGeometry from './GeometryCreation'

describe('pre populate the creation form with a geometry',()=>{
    it('takes a geometry [valid geoJSON geometry] and returns it ',()=>{
        let geoJSON_ob = {"geometry": {"type": "Point","coordinates": [102.0, 0.5]}}
        let geo2 = {"geometry": {"type": "LineString","coordinates": [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]]}}
        expect(prePopulateGeometry(geoJSON_ob)).toEqual({type:GETGEOMTERY,payload:geoJSON_ob})
        expect(prePopulateGeometry(geo2)).toEqual({type:GETGEOMTERY,payload:geo2})
    })
})