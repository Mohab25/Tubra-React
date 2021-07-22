import React from 'react'
import {createStore} from 'redux'
import { Provider } from "react-redux";
import reducer from '../../../../Reducers'
import {render, screen, fireEvent} from '@testing-library/react'
import Measure from './measure'


// There is an important trick here, i used the root reducer as this component calls 
// a lot of reducers.

const renderWithRedux=(component,{initialState,store=createStore(reducer,initialState)}={})=>{
    return{
        ...render(<Provider store={store}>{component}</Provider>)
    }
}

beforeAll(()=>{

})

describe('rendering tests',()=>{
    let toggleLinearMeasurement = jest.fn()
    
    it('renders correctly',()=>{
        renderWithRedux(<Measure/>)
        expect(screen.getByTestId('measure')).toBeInTheDocument()
        expect(screen.getByTestId('measure').style.backgroundColor).toBe('orange') //linearMeasurePane
    })

    it('change the default style via click',()=>{
        renderWithRedux(<Measure toggleLinearMeasurement={toggleLinearMeasurement}/>)
        //fireEvent.click(screen.getByTestId('measure'))
        //expect(screen.getByTestId('measure').style.backgroundColor).toBe('orangered')

    })
})