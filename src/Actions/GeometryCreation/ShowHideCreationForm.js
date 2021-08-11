import {SHOWHIDECREATIONFORM} from './types'

const toggleGeometryCreationFormVisibility=(formState)=>{
    return{
        type:SHOWHIDECREATIONFORM,
        payload:formState
    }
}

export default toggleGeometryCreationFormVisibility;