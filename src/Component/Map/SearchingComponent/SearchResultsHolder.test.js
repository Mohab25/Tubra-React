import React from 'react'
import {render, screen} from '@testing-library/react'
import CardsHolder from './SearchResultsHolder'


describe('render tests',()=>{
    it('display flex',()=>{
        render(<CardsHolder display='flex'/>)
        expect(screen.getByTestId('searchCardsHolder').style.display).toBe('flex')
    })

    it('display none',()=>{
        render(<CardsHolder display='none'/>)
        expect(screen.getByTestId('searchCardsHolder').style.display).toBe('none')
    })

})