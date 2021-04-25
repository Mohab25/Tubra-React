import {SHOWHIDECREATIONFORM} from '../../Actions/GeometryCreation/types'
import {GETGEOMTERY} from '../../Actions/GeometryCreation/types'

const initialState = {
    display:'none',
    geom:''
}

export default function CreationFormReducer(state=initialState,action){
    switch(action.type){
        case SHOWHIDECREATIONFORM:{
            let dis = state.display=='none'?'flex':'none'
            return{
                ...state,
                display:dis
            }
        }
        case GETGEOMTERY:{return{
            ...state, 
            geom:action.payload
        }
    }
        default:return state
    }
}
