import { SHOWHIDELEAFLETMAP } from "../../Actions/3DActions/types";

let initialState={
    leafletMap:'block'
}

export default function LeafletMapControlReducer(state=initialState,action){
    switch(action.type){
        case SHOWHIDELEAFLETMAP:{
            let newVisibilityState= state.leafletMap=='block'?'none':'block'
            return{...state,leafletMap:newVisibilityState}
        }
        default: return state
    
    }
}