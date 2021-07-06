import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen, getByTestId } from '@testing-library/react'
import CADCard from './cad_card'

/**
 what are the behaviors to be tested

    1. it renders correctly with passed properties
    2. it switch what is rendered on the screen to detailed view.
 
*/

beforeAll(()=>{
    global.fetch = jest.fn(()=>Promise.resolve({
        json:()=>{return Promise.resolve({Title:"CAD1",CAD_file:"http://cad.com"})}
    }))
})

afterAll(()=>{
    fetch.mockClear()
})

describe('testing rendering behaviors', () => {
    it('renders correctly, __snapshot_test__',()=>{
        const {asFragment} = render(<CADCard/>)
        expect(asFragment()).toMatchSnapshot()
    })
    
    it('renders with passed title property',()=>{
        const {getByTestId} = render(<CADCard title='test-title'/>)
        const title = getByTestId('title')
        expect(title).toHaveTextContent('test-title')
    })

})

describe('interactivity behaviors = functions', () => {
    
    it('calls handles click prop when fireEvent is called',async ()=>{
        /* this is not a good way of testing as it tests the implementation
            rather the CADViewer component should render
        */
        const clickFunc = await fetch(`http://localhost:8000/CAD/cad/${1}/`)
        const val = await clickFunc.json().then(data=>data)
        render(<CADCard handleClick={()=>clickFunc}/>)
        fireEvent.click(screen.getByTestId('cad-img'))
        expect(val).toEqual({Title:"CAD1",CAD_file:"http://cad.com"})

    })
})



