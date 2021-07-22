import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {render, screen,fireEvent} from '@testing-library/react'
import Identify from './identify'
import reducer from '../../../../Reducers/IdentifyReducers/IdentifyActivationReducer'

const renderWithRedux=(component,{initialState,store=createStore(reducer,initialState)}={})=>{
    return{
        ...render(<Provider store={store}>{component}</Provider>)
    }
}

describe('render tests',()=>{
    it('renders correctly',()=>{
        renderWithRedux(<Identify/>)
        expect(screen.getByTestId('identify')).toBeInTheDocument()
        expect(screen.getByTestId('identify').style['_values']['background-color']).toBe('orange')
    })  

    it('change the background color upon click on identify holder',()=>{
        renderWithRedux(<Identify/>)
        fireEvent.click(screen.getByTestId('identify'))
        expect(screen.getByTestId('identify').style['_values']['background-color']).toBe('orangered')
        fireEvent.click(screen.getByTestId('identify'))
        expect(screen.getByTestId('identify').style['_values']['background-color']).toBe('orange')

    })

})