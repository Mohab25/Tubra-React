import { MAPREF } from "../../Actions/MeasureActions/types";
const initialState={
    MapRef:undefined
}

export default function gettingMapRefReducer(state=initialState,action){
    switch(action.type){
        case MAPREF:{
            return {...state,MapRef:action.payload}
        };
        default: return state
    }
}