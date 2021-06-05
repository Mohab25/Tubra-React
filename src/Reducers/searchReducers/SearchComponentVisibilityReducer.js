import { TOGGLESEARCHCOMPONENTVISIBILITY } from "../../Actions/searchActions/types";

const initialState = {
    isComponentVisible:'none'
}

export default function SearchComponentVisibilityReducer(state=initialState,action){

    switch(action.type){
        case TOGGLESEARCHCOMPONENTVISIBILITY:{
            return{...state,isComponentVisible:action.payload}
        }
        default:return state
    }

}