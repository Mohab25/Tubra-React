import {ENABLECREATEGOEMETRY} from '../../Actions/GeometryCreation/types' 

let initialState={
    isActionCalled:false,
    geomType:"",
    GeometryCreation:'disabled',
}

export default function EnableGeometryCreationReducer(state=initialState,action){

    switch(action.type){
        case ENABLECREATEGOEMETRY:{
            let GeometryCreationToggler = state.GeometryCreation=='disabled'?"enabled":"disabled"
            if(action.payload=='polygon'){
                return {...state,GeometryCreation:GeometryCreationToggler,geomType:'polygon'}
            }
            else if(action.payload=='line'){
                return {...state,GeometryCreation:GeometryCreationToggler,geomType:'line'}
            }
            else if(action.payload=='point'){
                return {...state,GeometryCreation:GeometryCreationToggler,geomType:'point'}
            }

        }
        
        default:return state
    }

} 