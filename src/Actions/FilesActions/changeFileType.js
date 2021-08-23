import {CHANGEFILETYPE} from './types'
export default function changeFileType(fileTypeOB) {
    return{
        type: CHANGEFILETYPE,
        payload: fileTypeOB
    }
}