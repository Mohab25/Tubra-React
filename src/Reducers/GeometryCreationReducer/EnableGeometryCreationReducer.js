import {ENABLECREATEGOEMETRY} from '../../Actions/GeometryCreation/types' 

let initialState={
    geomType:"",
    polygonCreation:'disabled',
    lineCreation:"disabled"
}

export default function EnableGeometryCreationReducer(state=initialState,action){

    switch(action.type){
        case ENABLECREATEGOEMETRY:{
            if(action.payload=='polygon'){
                let polygonCreationToggler = state.polygonCreation=='disabled'?"enabled":"disabled"
                return {...state,polygonCreation:polygonCreationToggler,geomType:'polygon'}
            }
            else if(action.payload=='line'){
                let lineCreationToggler = state.lineCreation=='disabled'?"enabled":"disabled"
                return {...state,lineCreation:lineCreationToggler,geomType:'line'}
            }

        }
        
        default:return state
    }

} 