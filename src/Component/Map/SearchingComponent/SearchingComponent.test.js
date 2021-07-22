import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../../../Reducers'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import Search from './SearchingComponent'



const renderWithRedux=(component,{initialState,store=createStore(reducer,initialState)}={})=>{
    return{
        ...render(<Provider store={store}>{component}</Provider>)
    }
}

describe('render tests',()=>{
    it('render despite redux !',()=>{
        renderWithRedux(<Search/>)
        expect(screen.getByTestId('Search').style.display).toBe('none')
    })
})

describe('functionality tests',()=>{
    it('render after text changes',()=>{
        renderWithRedux(<Search/>)
        let inp = screen.getByTestId('searchInput')
        waitFor(()=>fireEvent.change(inp,{target: {value: 'ca'}}))
        // this is a child component
        //expect(screen.getByTestId('SearchResults').style.display).toBe('flex')

    })
})