import { SEARCHBARCHANGED } from "../../Actions/FilesActions/types";

const initialState = {
    searchLetters:'',
    temp:[]
}

export default function SearchbarReducer(state=initialState,action){
    switch(action.type){
        case SEARCHBARCHANGED:{
            return {...state,searchLetters:action.payload.letters,temp:action.payload.tempMatches}
        }
        default:return state
    }
}