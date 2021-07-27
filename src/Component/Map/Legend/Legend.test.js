import React from 'react'
import { render, screen } from '@testing-library/react'
import Legend from './Legend'
import { expect } from '@jest/globals'

describe('render tests',()=>{
    
    let props = {'a':'test1','b':'test2','c':'test3'}
    
    it('display empty div without props',()=>{
        render(<Legend/>)
        expect(screen.getByTestId('empty-return')).toBeInTheDocument()
    })

    it('display correctly',()=>{
        render(<Legend legendItems={props}/>)
        expect(screen.getByTestId(0)).toHaveTextContent('test1')
        expect(screen.getByTestId(1)).toHaveTextContent('test2')
        expect(screen.getByTestId(2)).toHaveTextContent('test3')
    })
})