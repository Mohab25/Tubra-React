import React from 'react'
import {render,screen} from '@testing-library/react'
import LinearMeasurePane from './LinearMeasurePane'

describe('rendering tests',()=>{
    it('renders correctly',()=>{
        render(<LinearMeasurePane display='flex' distance={200} />)
        expect(screen.getAllByRole('textbox')[0]).toHaveValue('200.000')
        expect(screen.getAllByRole('textbox')[1]).toHaveValue('Meters')

    })
})