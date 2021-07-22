import React from 'react'
import {render,screen} from '@testing-library/react'
import MapToolsWindow from './MapToolsWindows'

describe('rendering test',()=>{
    it('renders correctly - snapshot test',()=>{
        expect(render(<MapToolsWindow display='flex'/>)).toMatchSnapshot()
    })
})