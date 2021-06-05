import { TOGGLESEARCHCOMPONENTVISIBILITY } from "./types";

export default function toggleSearchComponentVisibility(isVisible){
    return{
        type:TOGGLESEARCHCOMPONENTVISIBILITY,
        payload:isVisible
    }
}