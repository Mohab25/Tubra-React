import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen, getByTestId } from '@testing-library/react'
import CADCard from './cad_card'

/**
 what are the behaviors to be tested

    1. it renders correctly with passed properties
    2. it switch what is rendered on the screen to detailed view.
 
*/

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
    
    it('calls handle click prop when fireEvent is called',()=>{
        /* this is not a good way of testing as it tests the implementation
            rather the CADViewer component should render
        */
        const clickFunc = jest.fn()
        render(<CADCard handleClick={()=>clickFunc(1)}/>)
        fireEvent.click(screen.getByTestId('cad-img'))
        expect(clickFunc).toHaveBeenCalled()
        expect(clickFunc).toHaveBeenCalledWith(1)
    })
})



