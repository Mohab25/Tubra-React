import { CHANGECURRENTNAVNAME } from "../../Actions/NavActions/types";
import {CHANGECURRENTNAVLOGO } from "../../Actions/NavActions/types";

const initialState={
    current_name:'Main',
    logo:'fa fa-home'
}

export default function Current_nav_reducer(state=initialState,action){
    switch(action.type){
        case CHANGECURRENTNAVNAME:{
            return{
                ...state, 
                current_name:action.payload
            }
        }
        case CHANGECURRENTNAVLOGO:{
            return{
                ...state,
                logo:action.payload
            }
        }
        default:{
            return state
        }
    }
}