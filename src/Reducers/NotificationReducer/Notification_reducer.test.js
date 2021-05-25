import reducer from './Notification_reducer'
import {SHOW_HIDE_NOTIFICATION} from '../../Actions/Notification/types'

const initialState={
    notification_state:{
        view:"none",
        caller:undefined
    }
} 
describe('testing notification reducer, it handle wither the notification is viewed or not', () => {
    it('return the default values for the notification [view display is none and the called of the notification i not defined]',()=>{
        expect(reducer(undefined,{type:SHOW_HIDE_NOTIFICATION,payload:{view:'none',caller:undefined}})).toEqual({notification_state:{view:'none',caller:undefined}})
    })
    it('changes the default values for the view and the caller according to the payload',()=>{
        expect(reducer(initialState,{type:SHOW_HIDE_NOTIFICATION,payload:{view:'flex',caller:'person'}})).toEqual({notification_state:{view:'flex',caller:'person'}})
    })
    // edge cases 
    // yet to be implemented
})
