import React from 'react'
import {render,screen,fireEvent} from '@testing-library/react'
import MapToolsPane from './MapToolsPane'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import reducer from '../../../Reducers'


const renderWithRedux=(component,{initialState,store=createStore(reducer,initialState)}={})=>{
    return{
        ...render(<Provider store={store}>{component}</Provider>)
    }

}


describe('rendering tests',()=>{

    it('display the icon be default',()=>{
        render(<MapToolsPane/>)
        expect(screen.getByTestId('Gear')).toBeInTheDocument()
    })

    it('display the tools pane when the icon is clicked',()=>{
        renderWithRedux(<MapToolsPane/>)
        let btn = screen.getByTestId('Gear')
        fireEvent.click(btn) 
        expect(screen.getByTestId('MapToolsPane')).toBeInTheDocument()
    })
})