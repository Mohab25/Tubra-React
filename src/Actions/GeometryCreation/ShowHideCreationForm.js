import {SHOWHIDECREATIONFORM} from './types'

const toggleGeometryCreationFormVisibility=()=>dispatch=>{
    dispatch({
        type:SHOWHIDECREATIONFORM
    })
}

export default toggleGeometryCreationFormVisibility;