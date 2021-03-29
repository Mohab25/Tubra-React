import {SHOWHIDECREATIONFORM} from '../../Actions/GeometryCreation/types'

const initialState = {
    display:'none'
}

export default function CreationFormReducer(state=initialState,action){
    switch(action.type){
        case SHOWHIDECREATIONFORM:
            let dis = state.display=='none'?'flex':'none'
            return{
                ...state,
                display:dis
            }
        default:return state
    }
}
