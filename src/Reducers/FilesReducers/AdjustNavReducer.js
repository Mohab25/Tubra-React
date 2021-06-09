import{FILEVIEWACTIVATE} from '../../Actions/FilesActions/types'
import {SWITCHTOFILESVIEW} from '../../Actions/FilesActions/types'

const initialState={
    isViewPageActive:false,
    switchToFilesView:false
}

export default function AdjustNavReducer(state=initialState,action){
    switch(action.type){
        case FILEVIEWACTIVATE:{
            let alterActivation = state.isViewPageActive==false?true:false
            return{...state,isViewPageActive:alterActivation}
        }
        case SWITCHTOFILESVIEW:{
            // the value of the state here is not important rather the change of the state itself is sensed via useEffect 
            let switcher = state.switchToFilesView==false?true:false
            return{
                ...state,switchToFilesView:switcher
            }
        }
        default:{return state}
    }
}