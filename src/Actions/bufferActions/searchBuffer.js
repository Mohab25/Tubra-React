import { SEARCHBUFFER } from "./types";

const searchBuffer=(searchBufferItems)=>{
    return{
        type:SEARCHBUFFER,
        payload:searchBufferItems
    }
}

export default searchBuffer