import{CADVIEWACTIVATE} from '../../Actions/CADActions/types'
import {SWITCHTOCADSVIEW} from '../../Actions/CADActions/types'

const initialState={
    isViewPageActive:false,
    switchToCADsView:false
}

export default function AdjustCADNavReducer(state=initialState,action){
    switch(action.type){
        case CADVIEWACTIVATE:{
            let alterActivation = state.isViewPageActive==false?true:false
            return{...state,isViewPageActive:alterActivation}
        }
        case SWITCHTOCADSVIEW:{
            // the value of the state here is not important rather the change of the state itself is sensed via useEffect 
            let switcher = state.switchToCADsView==false?true:false
            return{
                ...state,switchToCADsView:switcher
            }
        }
        default:{return state}
    }
}