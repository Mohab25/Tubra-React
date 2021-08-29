import {CHANGEFILETYPE} from '../../Actions/FilesActions/types'

let initialState = {
    aerodrome_part:'',
    fileType:''
}

export default function(state = initialState, action){
    switch(action.type){
        case CHANGEFILETYPE:
            return {
                ...state,
                fileType:action.payload.fileType,
                aerodrome_part:action.payload.aerodrome_part
            }
        default:
            return state
    }
}