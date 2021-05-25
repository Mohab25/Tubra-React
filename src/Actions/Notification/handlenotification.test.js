import { SHOW_HIDE_NOTIFICATION } from "./types";
import toggle_notification_state from './handlenotification'

describe('test for notification handler',()=>{
    it('change the view and the user',()=>{
        let testCase1 = {view:'view1',caller:'caller1'} 
        let testCase2 = {view:'view2',caller:'caller2'} 
        expect(toggle_notification_state(testCase1['view'],testCase1['caller'])).toEqual({type:SHOW_HIDE_NOTIFICATION,payload:{'view':testCase1['view'],'caller':testCase1['caller']}})
        expect(toggle_notification_state(testCase2['view'],testCase2['caller'])).toEqual({type:SHOW_HIDE_NOTIFICATION,payload:{'view':testCase2['view'],'caller':testCase2['caller']}})
    })
})