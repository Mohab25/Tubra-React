import { SEARCHBARCHANGED } from "./types";

export default function searchbarChange(letters,tempMatches){
    return{
        type:SEARCHBARCHANGED,
        payload:{'letters':letters,'tempMatches':tempMatches}
    }

}