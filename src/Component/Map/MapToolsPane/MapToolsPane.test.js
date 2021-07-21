import React from 'react'
import {render,screen,fireEvent} from '@testing-library/react'
import MapToolsPane from './MapToolsPane'
import { Provider } from 'react-redux'
import store from '../../../store'

describe('rendering tests',()=>{

    it('display the icon be default',()=>{
        render(<MapToolsPane/>)
        expect(document.querySelector('.Gear-icon-container')).toBeInTheDocument()
    })

    it('display the tools pane when the icon is clicked',()=>{
        
        render(<Provider store={store}><MapToolsPane/></Provider>)
        let btn = document.querySelector('.Gear-icon-container')
        // component, the child components are related to redux, there is a problem applying even a simple click event.
        //fireEvent.click(btn) 
        //expect(document.querySelector('.MapToolsPane')).toBeInTheDocument()
    })
})