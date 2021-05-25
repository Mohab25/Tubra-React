import reducer from './Current_nav_reducer'
import { CHANGECURRENTNAVNAME } from "../../Actions/NavActions/types";
import {CHANGECURRENTNAVLOGO } from "../../Actions/NavActions/types";

const initialState={
    current_name:'Main',
    logo:'fa fa-home'
}

describe('testing changes on the current navigation bar icon and name', () => {
    it('returns the default values (the main page name and logo ) by default ',()=>{
        expect(reducer(undefined,{type:CHANGECURRENTNAVNAME,payload:'Main'})).toEqual({current_name:'Main',logo:'fa fa-home'})
        expect(reducer(undefined,{type:CHANGECURRENTNAVLOGO,payload:'fa fa-home'})).toEqual({current_name:'Main',logo:'fa fa-home'})
    
    })
    it('returns the current page name according the payload of CHANGECURRENTNAVNAME',()=>{
        expect(reducer(initialState,{type:CHANGECURRENTNAVNAME,payload:'map'})).toEqual({current_name:'map',logo:'fa fa-home'})
    })
    it('returns the current page logo according the payload of CHANGECURRENTNAVLOGO',()=>{
        expect(reducer(initialState,{type:CHANGECURRENTNAVLOGO,payload:'fa fa-map'})).toEqual({current_name:'Main',logo:'fa fa-map'})
    })
    // edge cases 
    // you need to check if the logo and the name are among a specific set - to be completed after you have the final set of pages.
})
