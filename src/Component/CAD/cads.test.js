import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen, getByTestId } from '@testing-library/react'
import CadCard from './cad_card.js'
import CAD from './cadViewer'
import CADS from './cads'


/*
 what are the behaviors to be tested
     1. it renders correctly with passed properties, states and refs.
     2. fetching on itself is not a behaviors, but the it sets the state affects what
        is rendered, cad objects are constructed by what is coming.
     3. when a user clicks on a certain file, it changes the component rendered on scree. 
*/ 

beforeAll(()=>{
    global.fetch = jest.fn(()=>Promise.resolve({
        json:()=>Promise.resolve([{Title:"CAD1",CAD_file:"http://cad.com/1"},{Title:"CAD2",CAD_file:"http://cad.com/2"}])
    }))
})

afterAll(()=>{
    fetch.mockClear()
})

describe('testing rendering behaviors',()=>{
    it('renders correctly, __snapshot_test__',()=>{
        const {asFragment} = render(<CADS/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('fetches data when it mounts',async()=>{
        const clickFunc = await fetch(`http://localhost:8000/CAD/drawings/`)
        const val = await clickFunc.json().then(data=>data)
        const {asFragment} = render(<CADS/>)
        expect(val).toEqual([{Title:"CAD1",CAD_file:"http://cad.com/1"},{Title:"CAD2",CAD_file:"http://cad.com/2"}])
    })

    it('renders with passed properties:CADContainerDisplay, sidebarDisplay, formDisplay',()=>{
        const {container,getByTestId} = render(<CADS CADContainerDisplay='none' sidebarDisplay='none' formDisplay='none'/>)
        const CAD_container = getByTestId('CAD-container')
        expect(CAD_container).not.toBeVisible()
        const sidebar = getByTestId('CAD-side')
        expect(sidebar).not.toBeVisible()
        const form = getByTestId('CAD-form')
        expect(form).not.toBeVisible()
        //expect(<CadCard/>).toBeInTheDocument()

    })
})

// describe('interactivity behaviors = functions',()=>{
//     it('handles form submit',()=>{
//         const preventDefault = jest.fn()
//         const {container,getByTestId} = render(<CADS CADContainerDisplay='none' sidebarDisplay='none'/>)
//         const form = getByTestId('CAD-form')
//         fireEvent.submit(form,{handleSubmit:()=>{preventDefault}})
//         expect(preventDefault).toHaveBeenCalled()
//     })
// })