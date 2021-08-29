import {CHANGEFILTERTYPE} from '../../Actions/CADActions/types'

let initialState = {
    aerodrome_part:'',
    filterType:''
}

export default function(state = initialState, action){
    switch(action.type){
        case CHANGEFILTERTYPE:

            return {
                ...state,
                filterType:action.payload.filterType,
                aerodrome_part:action.payload.aerodrome_part
            }
        default:
            return state
    }
}