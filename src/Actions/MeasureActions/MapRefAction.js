import { MAPREF } from "./types";

export default function MapRefAction(mapRef){
    return{
        type:MAPREF,
        payload:mapRef
    }

}