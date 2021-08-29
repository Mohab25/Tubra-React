import {CHANGEFILTERTYPE} from './types'
export default function changeFileType(filterTypeOB) {
    return{
        type: CHANGEFILTERTYPE,
        payload: filterTypeOB
    }
}