import {ENABLECREATEGOEMETRY} from '../../Actions/GeometryCreation/types' 

let initialState={
    geomType:"",
    GeometryCreation:'disabled',
}

export default function EnableGeometryCreationReducer(state=initialState,action){

    switch(action.type){
        case ENABLECREATEGOEMETRY:{
            let GeometryCreationToggler = action.payload.createStatus
               if(GeometryCreationToggler=='enabled'){
                
                if(action.payload.geomType=='polygon'){
                    return {...state,GeometryCreation:GeometryCreationToggler,geomType:'polygon'}
                }
                else if(action.payload.geomType=='line'){
                    return {...state,GeometryCreation:GeometryCreationToggler,geomType:'line'}
                }
                else if(action.payload.geomType=='point'){
                    return {...state,GeometryCreation:GeometryCreationToggler,geomType:'point'}
                }
            }
            else{return state}

        }
        
        default:return state
    }

} 