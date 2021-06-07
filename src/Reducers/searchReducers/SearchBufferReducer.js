import {SEARCHBUFFER} from '../../Actions/bufferActions/types'

const initialState = {
    searchHolderDisplay:'none',
    searchBufferItems:[]
}

export default function searchBufferReducer(state=initialState,action){
    switch(action.type){
        case SEARCHBUFFER:{
            let isActive = state.searchHolderDisplay=='none'?'flex':'none'
            let incomingSearchBufferItems = action.payload
            console.log('incomingSearchBufferItems',incomingSearchBufferItems)
            return {...state,searchHolderDisplay:isActive,searchBufferItems:incomingSearchBufferItems}
        }
        default:return state
    }
     
}