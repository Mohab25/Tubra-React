import {ENABLECREATEPOLYGON} from '../../Actions/GeometryCreation/types' 

let initialState={
    polygonCreation:'disabled'
}

export default function EnableGeometryCreationReducer(state=initialState,action){

    switch(action.type){
        case ENABLECREATEPOLYGON:{
            let polygonCreationToggler = state.polygonCreation=='disabled'?"enabled":"disabled"
            return {...state,polygonCreation:polygonCreationToggler}
        }
        
        default:return state
    }

} 