import React from 'react'
import Marker from './MarkerIcon'

describe('render tests',()=>{
    it('renders correctly - snapshot test',()=>{
        expect(<Marker/>).toMatchSnapshot()
    })
})