import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen, getByTestId } from '@testing-library/react'
import CADCard from './cad_card'

describe('testing cad card component ', () => {
    it('renders correctly, __snapshot_test__',()=>{
        const {asFragment} = render(<CADCard/>)
        expect(asFragment()).toMatchSnapshot()
    })
    
    it('calls handle click prop when fireEvent is called',()=>{
        const clickFunc = jest.fn()
        render(<CADCard handleClick={()=>clickFunc(1)}/>)
        fireEvent.click(screen.getByTestId('cad-img'))
        expect(clickFunc).toHaveBeenCalled()
    })
})
